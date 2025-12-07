const Seller = require("../models/seller.model");
const RealEstateShop = require("../models/realEstateShop.model");
const Property = require("../models/property.model");
const redis = require("../config/redis");
const crypto = require("crypto");
const errorHandler = require("../utils/ErrorHandler");
const tokenService = require("../services/tokenService");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const generateSellerCode = () =>
  "SELL-" + crypto.randomBytes(3).toString("hex").toUpperCase();

const generateReferralCode = () =>
  "REF-" + crypto.randomBytes(3).toString("hex").toUpperCase();

const ACCESS_TTL = 15 * 60;
const REFRESH_TTL = 7 * 24 * 60 * 60;
const SESSION_TTL = REFRESH_TTL;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

const makeSid = () => crypto.randomBytes(16).toString("hex");

const setSellerSession = async (seller, sid) => {
  const key = `seller_session:${seller._id}`;
  const value = JSON.stringify({
    sellerId: seller._id.toString(),
    name: seller.name,
    email: seller.email,
    sid,
  });
  await redis.set(key, value, "EX", SESSION_TTL);
};

const setSellerTokens = async (sellerId, access, refresh) => {
  await redis.set(`seller_access:${sellerId}`, access, "EX", ACCESS_TTL);
  await redis.set(`seller_refresh:${sellerId}`, refresh, "EX", REFRESH_TTL);
};

exports.createSeller = async (req, res, next) => {
  try {
    const { name, email, phone, password, area, address, pincode } = req.body;

    let user;

    // CASE 1: LOGGED-IN USER → BECOME SELLER
    if (req.user) {
      user = await User.findById(req.user._id).select("+password");
      if (!user) throw new Error("Logged-in user not found");

      if (!password) throw new Error("Password is required to create seller");

      // Check if seller already exists
      const existingSeller = await Seller.findOne({ userId: user._id });
      if (existingSeller) throw new Error("You already have a seller account");

      // Unique seller email/phone
      if (email && (await Seller.findOne({ email })))
        throw new Error("Email already used by another seller");

      if (phone && (await Seller.findOne({ phone })))
        throw new Error("Phone already used by another seller");

      // Auto verify user (since phone/email verified already)
      user.isVerified = true;
      await user.save();

      // Create seller using SAME hashed password
      const seller = await Seller.create({
        userId: user._id,
        name: user.name,
        email: email || user.email,
        phone: phone || user.phone,
        password: user.password,
        area,
        address,
        pincode,
        sellerCode: generateSellerCode(),
        referralCode: generateReferralCode(),
        onboardingStep: 1,
        isVerified: true,
      });

      return res.status(201).json({
        success: true,
        message: "Seller created for logged-in user",
        sellerId: seller._id,
        userId: user._id,
      });
    }

    // GUEST USER → CREATE USER + SELLER
    if (!req.user) {
      if (!name || !email || !phone || !password) {
        throw new Error("Name, email, phone, and password are required");
      }

      // Search for existing user
      user = await User.findOne({ $or: [{ email }, { phone }] }).select(
        "+password"
      );

      if (!user) {
        // Create NEW user → password is hashed by pre-save hook
        user = await User.create({
          name,
          email,
          phone,
          password,
          isVerified: true,
        });
      } else {
        // EXISTING user → update password ONLY if changed
        const isSamePassword = await bcrypt.compare(password, user.password);
        if (!isSamePassword) user.password = password;

        user.isVerified = true;
        await user.save();
      }

      // Prevent duplicate seller
      if (await Seller.findOne({ userId: user._id }))
        throw new Error("You already have a seller account");

      // Unique seller email/phone
      if (await Seller.findOne({ email }))
        throw new Error("Email already used by another seller");

      if (await Seller.findOne({ phone }))
        throw new Error("Phone already used by another seller");

      // Create seller using the SAME hashed password
      const seller = await Seller.create({
        userId: user._id,
        name,
        email,
        phone,
        password: user.password,
        area,
        address,
        pincode,
        sellerCode: generateSellerCode(),
        referralCode: generateReferralCode(),
        onboardingStep: 1,
        isVerified: true,
      });

      return res.status(201).json({
        success: true,
        message: "Seller created from guest user",
        sellerId: seller._id,
        userId: user._id,
      });
    }
  } catch (err) {
    if (err.code === 11000) {
      const key = Object.keys(err.keyPattern)[0];
      return next(new errorHandler(`${key} already exists`, 400));
    }
    next(new errorHandler(err.message, 500));
  }
};

exports.sendPhoneOTP = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone) throw new Error("Phone number is required");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(`phoneOtp:${phone}`, otp, "EX", 300);

    console.log("PHONE OTP:", otp);

    res.status(200).json({ message: "OTP sent to phone" });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.verifyPhoneOTP = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp)
      return next(new errorHandler("Phone & OTP required", 400));

    // Optionally: require user id as well if you want OTP scoped to user: const userId = req.user?.id
    const storedOtp = await redis.get(`phoneOtp:${phone}`);
    if (!storedOtp)
      return next(new errorHandler("OTP expired or invalid", 400));
    if (storedOtp !== otp.toString())
      return next(new errorHandler("Invalid OTP", 400));

    await redis.del(`phoneOtp:${phone}`);

    // Mark seller as verified (prefer matching phone + user or return first match)
    const seller = await Seller.findOneAndUpdate(
      { phone }, // if you'd like to scope by user: { phone, userId: req.user.id }
      { isVerified: true },
      { new: true }
    ).select("-password"); // ensure password is not selected

    if (!seller) return next(new errorHandler("Seller not found", 404));

    const sid = makeSid();

    // Generate tokens from a safe seller object (no password)
    const safeSellerPayload = {
      id: seller._id.toString(),
      name: seller.name,
      email: seller.email,
      role: seller.role,
    };

    const sellerAccess = tokenService.generateSellerAccessToken(
      safeSellerPayload,
      sid
    );
    const sellerRefresh = tokenService.generateSellerRefreshToken(
      safeSellerPayload,
      sid
    );

    await setSellerSession(seller, sid);
    await setSellerTokens(seller._id.toString(), sellerAccess, sellerRefresh);

    res.cookie("seller_access_token", sellerAccess, {
      ...cookieOptions,
      maxAge: ACCESS_TTL * 1000,
    });
    res.cookie("seller_refresh_token", sellerRefresh, {
      ...cookieOptions,
      maxAge: REFRESH_TTL * 1000,
    });

    res.status(200).json({
      message: "Phone verified successfully. Seller is now active.",
      seller,
      accessToken: sellerAccess,
      refreshToken: sellerRefresh,
    });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.createShop = async (req, res, next) => {
  try {
    const sellerId = req.seller._id;
    const seller = await Seller.findById(sellerId);

    if (!seller) return next(new errorHandler("Seller not found", 404));
    if (!seller.isVerified)
      return next(new errorHandler("Phone not verified", 403));
    if (seller.shop) return next(new errorHandler("Shop already created", 400));
    // ensure Step 1 completed (isVerified is already checked)
    if (seller.onboardingStep < 1)
      return next(new errorHandler("Complete Step 1 first", 400));

    const {
      name,
      bio,
      category,
      avatar,
      coverBanner,
      address,
      opening_hours,
      website,
      socialLinks,
    } = req.body;
    if (!name) return next(new errorHandler("Shop name is required", 400));

    const shop = await RealEstateShop.create({
      sellerId,
      name,
      bio,
      category,
      avatar,
      coverBanner,
      address,
      opening_hours,
      website,
      socialLinks,
    });

    seller.shop = shop._id;
    seller.onboardingStep = 2;
    await seller.save();

    res.status(201).json({
      message: "Shop created successfully",
      shop,
      step: seller.onboardingStep,
    });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.createBankAccount = async (req, res, next) => {
  try {
    const sellerId = req.seller._id;

    const seller = await Seller.findById(sellerId);
    if (!seller) throw new Error("Seller not found");
    if (!seller.shop) throw new Error("Create shop first");
    if (seller.onboardingStep < 2)
      throw new Error("Complete Step 2 first (Create Shop)");

    // ---------- DUMMY PAYMENT SETUP ----------
    const razorpayCustomerId = "dummy_customer_" + Date.now();
    const razorpayAccountId = "dummy_account_" + Date.now();

    seller.razorpayCustomerId = razorpayCustomerId;
    seller.razorpayAccountId = razorpayAccountId;
    seller.onboardingStep = 3; // Completed Step 3 (Pending KYC verify)

    await seller.save();

    res.status(200).json({
      success: true,
      message: "Dummy bank account created",
      razorpayCustomerId,
      razorpayAccountId,
      step: seller.onboardingStep,
    });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.submitBankDocuments = async (req, res, next) => {
  try {
    const sellerId = req.seller._id;
    const seller = await Seller.findById(sellerId);

    if (!seller) throw new Error("Seller not found");
    if (!seller.razorpayAccountId) throw new Error("Create bank account first");

    // req.files from multer (AWS/Cloudinary/FileSystem)
    if (!req.files || req.files.length === 0)
      throw new Error("No documents uploaded");

    const docs = req.files.map((file) => file.path);

    seller.documents.push(...docs);
    await seller.save();

    res.status(200).json({
      success: true,
      message: "Dummy KYC documents received",
      documentsStored: docs.length,
    });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.verifyBankAccount = async (req, res, next) => {
  try {
    const sellerId = req.seller._id;

    const seller = await Seller.findById(sellerId);
    if (!seller) throw new Error("Seller not found");
    if (!seller.razorpayAccountId) throw new Error("Create bank account first");
    if (seller.isRazorpayVerified) throw new Error("Bank is already verified");

    seller.isRazorpayVerified = true;
    seller.onboardingStep = 4; // Optional: Final completion step
    await seller.save();

    res.status(200).json({
      success: true,
      message: "Dummy bank verification successful",
      seller,
    });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.sellerLogin = async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;

    if (!password) throw new Error("Password is required");

    const seller = await Seller.findOne({
      $or: [{ email }, { phone }],
    }).select("+password");

    if (!seller) throw new Error("Seller not found");
    if (!seller.isVerified) throw new Error("Seller phone not verified");
    if (!seller.password) throw new Error("Seller password not set");

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const sid = makeSid();

    const payload = {
      id: seller._id.toString(),
      name: seller.name,
      email: seller.email,
      role: seller.role,
    };

    const sellerAccess = tokenService.generateSellerAccessToken(payload, sid);
    const sellerRefresh = tokenService.generateSellerRefreshToken(payload, sid);

    await setSellerSession(seller, sid);
    await setSellerTokens(seller._id.toString(), sellerAccess, sellerRefresh);

    res.cookie("seller_access_token", sellerAccess, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("seller_refresh_token", sellerRefresh, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // After successful login:
    res.status(200).json({
      message: "Seller Login successful",
      seller: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
        role: seller.role,
        isVerified: seller.isVerified,
        onboardingStep: seller.onboardingStep,
      },
    });
  } catch (err) {
    next(new errorHandler(err.message, 401));
  }
};

exports.sellerRefreshToken = async (req, res, next) => {
  try {
    const refresh = req.cookies?.seller_refresh_token;
    if (!refresh) return next(new errorHandler("Refresh token required", 400));

    let decoded;
    try {
      decoded = tokenService.verifySellerRefresh(refresh);
    } catch (e) {
      return next(new errorHandler("Invalid or expired refresh token", 401));
    }

    const sellerId = decoded.id?.toString();
    if (!sellerId)
      return next(new errorHandler("Invalid refresh token payload", 401));

    const storedRefresh = await redis.get(`seller_refresh:${sellerId}`);
    if (!storedRefresh || storedRefresh !== refresh)
      return next(new errorHandler("Invalid or expired refresh token", 401));

    const sessionRaw = await redis.get(`seller_session:${sellerId}`);
    if (!sessionRaw) return next(new errorHandler("Session expired", 401));
    const session = JSON.parse(sessionRaw);

    const seller = await Seller.findById(sellerId).select("-password");
    if (!seller) return next(new errorHandler("Seller no longer exists", 404));

    const newAccess = tokenService.generateSellerAccessToken(
      {
        id: seller._id,
        name: seller.name,
        email: seller.email,
        role: seller.role,
      },
      session.sid
    );

    await redis.set(`seller_access:${sellerId}`, newAccess, "EX", ACCESS_TTL);

    res.cookie("seller_access_token", newAccess, {
      ...cookieOptions,
      maxAge: ACCESS_TTL * 1000,
    });

    return res.status(200).json({
      success: true,
      accessToken: newAccess,
      seller: {
        id: seller._id,
        name: seller.name,
        email: seller.email,
        role: seller.role,
      },
    });
  } catch (err) {
    next(new errorHandler(err.message || "Invalid refresh token", 401));
  }
};

exports.updateSellerAccessToken = async (req, res, next) => {
  return exports.sellerRefreshToken(req, res, next);
};

exports.sellerLogout = async (req, res, next) => {
  try {
    const sellerId = req.seller?._id;
    if (!sellerId) {
      return res.status(400).json({ message: "Seller not logged in" });
    }

    // Delete session & tokens from Redis
    await redis.del(`seller_session:${sellerId}`);
    await redis.del(`seller_access:${sellerId}`);
    await redis.del(`seller_refresh:${sellerId}`);

    // Clear cookies
    res.clearCookie("seller_access_token", { path: "/" });
    res.clearCookie("seller_refresh_token", { path: "/" });

    res.status(200).json({ message: "Seller logged out successfully" });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.getSellerProfile = async (req, res, next) => {
  try {
    const sellerId = req.seller._id;

    const seller = await Seller.findById(sellerId)
      .populate("referredBy", "name email phone")
      .populate("commissionHistory.propertyId", "title price");

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    return res.status(200).json({ seller });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.getSellerPublicProfile = async (req, res, next) => {
  try {
    const { id } = req.params; // sellerId is the route param

    // Fetch seller
    const seller = await Seller.findById(id)
      .select(
        "name businessName area address pincode sellerCode referralCode isVerified createdAt"
      )
      .lean();

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Fetch properties owned by this seller
    const properties = await Property.find({ sellerId: id }) // FIXED
      .select("title price location images status")
      .lean();

    return res.status(200).json({
      message: "Seller public profile fetched",
      seller,
      properties,
    });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.getShopPublicProfile = async (req, res, next) => {
  try {
    const { shopId } = req.params;

    // 1️⃣ Fetch the shop
    const shop = await RealEstateShop.findById(shopId)
      .select(
        "name bio category avatar coverBanner address opening_hours website socialLinks ratings reviews sellerId createdAt"
      )
      .lean();

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // 2️⃣ Fetch the seller who owns this shop
    const seller = await Seller.findById(shop.sellerId)
      .select(
        "name businessName area address pincode sellerCode referralCode isVerified createdAt"
      )
      .lean();

    if (!seller) {
      return res
        .status(404)
        .json({ message: "Seller not found for this shop" });
    }

    // 3️⃣ Fetch all properties associated with this shop
    const properties = await Property.find({ shopId: shop._id })
      .select("title price location images status")
      .lean();

    // 4️⃣ Respond with combined data
    return res.status(200).json({
      message: "Shop public profile fetched successfully",
      shop,
      seller,
      properties,
    });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.updateSellerProfile = async (req, res, next) => {
  try {
    const sellerId = req.seller._id;

    const seller = await Seller.findByIdAndUpdate(
      sellerId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!seller) return next(new errorHandler("Seller not found", 404));

    return res
      .status(200)
      .json({ message: "Seller updated successfully", seller });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.getSellerProperties = async (req, res, next) => {
  try {
    const sellerId = req.seller._id;

    const properties = await Property.find({ sellerId });
    res.status(200).json({ properties });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.getSellerStats = async (req, res, next) => {
  try {
    const sellerId = req.seller._id;

    const seller = await Seller.findById(sellerId);
    if (!seller) return next(new errorHandler("Seller not found", 404));

    const propertiesCount = await Property.countDocuments({ sellerId });
    const totalSales = seller.totalSales || 0;

    res.status(200).json({ propertiesCount, totalSales });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.uploadDocuments = async (req, res, next) => {
  try {
    const sellerId = req.seller._id;
    if (!req.files || !req.files.length)
      return next(new errorHandler("No files uploaded", 400));

    const docs = req.files.map((file) => file.path);

    const seller = await Seller.findByIdAndUpdate(
      sellerId,
      { $push: { documents: { $each: docs } } },
      { new: true }
    );

    if (!seller) return next(new errorHandler("Seller not found", 404));

    res.status(200).json({ message: "Documents uploaded", seller });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};
