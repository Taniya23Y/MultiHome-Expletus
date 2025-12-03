const Seller = require("../models/seller.model");
const Property = require("../models/property.model");
const redis = require("../config/redis");
const crypto = require("crypto");
const errorHandler = require("../utils/ErrorHandler");
const tokenService = require("../services/tokenService");
const bcrypt = require("bcryptjs");

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

exports.createSellerProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      name,
      email,
      phone,
      password,
      businessName,
      area,
      address,
      pincode,
      referralCodeInput,
    } = req.body;

    // Check if seller already exists
    const existingSeller = await Seller.findOne({ userId });
    if (existingSeller) throw new Error("Seller already created");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new seller (phone verification pending)
    const newSeller = new Seller({
      userId,
      sellerCode: generateSellerCode(),
      referralCode: generateReferralCode(),
      name,
      email,
      phone,
      password: hashedPassword,
      businessName,
      area,
      address,
      pincode,
      isVerified: false,
    });

    // Handle referral
    if (referralCodeInput) {
      const referredSeller = await Seller.findOne({
        referralCode: referralCodeInput,
      });
      if (referredSeller) newSeller.referredBy = referredSeller._id;
    }

    await newSeller.save();

    res.status(201).json({
      message:
        "Seller profile created successfully. Please verify your phone to activate.",
      sellerId: newSeller._id,
    });
  } catch (err) {
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
    if (!phone || !otp) throw new Error("Phone & OTP required");

    const storedOtp = await redis.get(`phoneOtp:${phone}`);
    if (!storedOtp) throw new Error("OTP expired or invalid");
    if (storedOtp !== otp.toString()) throw new Error("Invalid OTP");

    await redis.del(`phoneOtp:${phone}`);

    // Mark seller as verified
    const seller = await Seller.findOneAndUpdate(
      { phone },
      { isVerified: true },
      { new: true }
    );

    if (!seller) throw new Error("Seller not found");

    const sellerId = seller._id.toString();
    const sid = makeSid();

    const sellerAccess = tokenService.generateSellerAccessToken(seller, sid);
    const sellerRefresh = tokenService.generateSellerRefreshToken(seller, sid);

    await setSellerSession(seller, sid);
    await setSellerTokens(sellerId, sellerAccess, sellerRefresh);

    // Send cookies
    res.cookie("seller_access_token", sellerAccess, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("seller_refresh_token", sellerRefresh, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Phone verified successfully. Seller is now active.",
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

    const sellerAccess = tokenService.generateSellerAccessToken(seller, sid);
    const sellerRefresh = tokenService.generateSellerRefreshToken(seller, sid);

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

    res.status(200).json({ message: "Login successful", seller });
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
    if (!storedRefresh || storedRefresh !== refresh) {
      return next(new errorHandler("Invalid or expired refresh token", 401));
    }

    const sessionRaw = await redis.get(`seller_session:${sellerId}`);
    if (!sessionRaw) return next(new errorHandler("Session expired", 401));
    const session = JSON.parse(sessionRaw);

    const seller = await Seller.findById(sellerId);
    if (!seller) return next(new errorHandler("Seller no longer exists", 404));

    const newAccess = tokenService.generateSellerAccessToken(
      seller,
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
  return exports.refreshToken(req, res, next);
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
    const { sellerId } = req.params;

    const seller = await Seller.findById(sellerId)
      .select(
        "name businessName area address pincode sellerCode referralCode isVerified createdAt"
      )
      .lean();

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Optional: Fetch their public properties
    const properties = await Property.find({ sellerId })
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

exports.updateSellerProfile = async (req, res, next) => {
  try {
    const sellerId = req.seller._id;

    const seller = await Seller.findOneAndUpdate(
      sellerId,
      { $set: req.body },
      { new: true }
    );

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    return res.status(200).json({
      message: "Seller updated successfully",
      seller,
    });
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

    const seller = await Seller.findOne(sellerId);
    if (!seller) return res.status(404).json({ message: "Seller not found" });

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

    // Assume req.files is an array of uploaded file URLs
    const docs = req.files.map((file) => file.path);

    const seller = await Seller.findOneAndUpdate(
      sellerId,
      { $push: { documents: { $each: docs } } },
      { new: true }
    );

    res.status(200).json({ message: "Documents uploaded", seller });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};
