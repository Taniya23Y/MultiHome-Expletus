const Property = require("../models/property.model");
const Seller = require("../models/seller.model");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");

exports.getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find()
      .populate("sellerId", "name email phone")
      .populate("category subcategory")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.getPendingProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({
      approvedByAdmin: false,
      isActive: true,
    })
      .populate("sellerId", "name email phone")
      .populate("category subcategory")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.approveProperty = async (req, res, next) => {
  try {
    if (typeof req.body?.approved !== "boolean") {
      return next(
        new ErrorHandler("approved field must be true or false", 400)
      );
    }

    const { approved } = req.body;

    const property = await Property.findById(req.params.id);
    if (!property) {
      return next(new ErrorHandler("Property not found", 404));
    }

    property.approvedByAdmin = approved;
    property.approvedAt = approved ? new Date() : null;
    property.approvedBy = approved ? req.user._id : null;

    await property.save();

    res.status(200).json({
      success: true,
      message: approved
        ? "Property approved successfully"
        : "Property rejected successfully",
      property,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

//---------------------------------------------
exports.getFlaggedProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ isFlagged: true })
      .populate("sellerId", "name email")
      .populate("category subcategory")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ success: true, count: properties.length, properties });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};
exports.getBoostedListings = async (req, res, next) => {
  try {
    const properties = await Property.find({ isBoosted: true })
      .populate("sellerId", "name email")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ success: true, count: properties.length, properties });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};
exports.getOwnerVerificationStatus = async (req, res, next) => {
  try {
    const users = await User.find({ role: "seller" }).select(
      "name email verified"
    );
    res.status(200).json({ success: true, users });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.getUsersList = async (req, res, next) => {
  try {
    const users = await User.find().select(
      "name email phone role isVerified isActive createdAt"
    );

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    console.error("Get Users Error:", err);
    next(new ErrorHandler(err.message, 500));
  }
};

exports.getSellersList = async (req, res, next) => {
  try {
    const sellers = await Seller.find().select(
      "name email phone city state isVerified isActive totalListings totalSales sellerCode"
    );

    res.status(200).json({
      success: true,
      count: sellers.length,
      sellers,
    });
  } catch (err) {
    console.error("Get Sellers Error:", err);
    next(new ErrorHandler(err.message, 500));
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler("User not found", 404));

    user.verified = true;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User verified successfully", user });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

//--------------------------------------
exports.adminLogout = async (req, res, next) => {
  try {
    // Example: if using JWT token, just clear cookie
    res.clearCookie("token");
    res
      .status(200)
      .json({ success: true, message: "Admin logged out successfully" });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};
