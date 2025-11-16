const Buyer = require("../models/buyer.model");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/ErrorHandler");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.createBuyerProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const isExist = await Buyer.findOne({ userId });
    if (isExist) {
      return next(new ErrorHandler("Buyer profile already exists", 400));
    }

    const buyer = await Buyer.create({
      userId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    });

    // Link buyer to user profile
    await User.findByIdAndUpdate(
      userId,
      {
        "linkedProfiles.buyerId": buyer._id,
        $addToSet: { role: "buyer" },
      },
      { new: true }
    );

    return res.status(201).json({
      message: "Buyer profile created successfully",
      buyer,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.getBuyerProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const buyer = await Buyer.findOne({ userId })
      .populate("savedProperties.listingId")
      .populate("recentlyViewed.listingId")
      .populate("visitRequests.listingId");

    if (!buyer) {
      return res.status(404).json({ message: "Buyer profile not found" });
    }

    return res.status(200).json({ success: true, buyer });
  } catch (err) {
    // next(new ErrorHandler(err.message, 500));
    res
      .status(500)
      .json({ message: "Error fetching buyer profile", error: err.message });
  }
};

exports.updateBuyerProfile = async (req, res, next) => {
  try {
    const allowed = ["name", "email", "phone", "address"];
    const updates = {};

    Object.keys(req.body).forEach((key) => {
      if (allowed.includes(key)) updates[key] = req.body[key];
    });

    const userId = req.user._id;

    const updated = await Buyer.findOneAndUpdate(
      { userId },
      // { $set: req.body },
      { $set: updates },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Buyer profile updated successfully",
      updated,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.saveProperty = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const listingId = req.body.listingId;

    if (!isValidId(listingId))
      return next(new ErrorHandler("Invalid listing ID", 400));

    await Buyer.updateOne(
      { userId },
      {
        $addToSet: {
          savedProperties: { listingId },
        },
      }
    );

    return res
      .status(200)
      .json({ success: true, message: "Property saved successfully" });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.unsaveProperty = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const listingId = req.body.listingId;

    if (!isValidId(listingId))
      return next(new ErrorHandler("Invalid listing ID", 400));

    await Buyer.updateOne(
      { userId },
      {
        $pull: {
          savedProperties: { listingId },
        },
      }
    );

    return res
      .status(200)
      .json({ success: true, message: "Property removed from saved list" });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.getSavedProperties = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const buyer = await Buyer.findOne({ userId }).populate(
      "savedProperties.listingId"
    );

    return res.status(200).json({
      success: true,
      saved: buyer.savedProperties,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.addRecentlyViewed = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const listingId = req.body.listingId;

    if (!isValidId(listingId))
      return next(new ErrorHandler("Invalid listing ID", 400));

    await Buyer.updateOne(
      { userId },
      {
        $push: {
          recentlyViewed: {
            listingId,
            viewedAt: new Date(),
          },
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Added to recently viewed",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.getPreferences = async (req, res, next) => {
  try {
    const buyer = await Buyer.findOne({ userId: req.user._id });

    return res.status(200).json(buyer.preferences);
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.updatePreferences = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const updated = await Buyer.findOneAndUpdate(
      { userId },
      { $set: { preferences: req.body } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Preferences updated",
      updated,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.addVisitRequest = async (req, res, next) => {
  try {
    const { listingId, scheduledDate } = req.body;

    if (!isValidId(listingId))
      return next(new ErrorHandler("Invalid listing ID", 400));

    const userId = req.user._id;

    const request = {
      listingId,
      scheduledDate,
      status: "pending",
    };

    await Buyer.updateOne({ userId }, { $push: { visitRequests: request } });
    return res.status(200).json({
      success: true,
      message: "Visit request added",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.updateVisitRequest = async (req, res, next) => {
  try {
    const { requestId, status } = req.body;

    await Buyer.updateOne(
      { "visitRequests._id": requestId },
      {
        $set: {
          "visitRequests.$.status": status,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Visit request updated",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.updateKYC = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const updated = await Buyer.findOneAndUpdate(
      { userId },
      {
        $set: {
          "kyc.aadhaar": req.body.aadhaar,
          "kyc.pan": req.body.pan,
          "kyc.documents": req.body.documents,
          "kyc.verified": false,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "KYC updated",
      updated,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.deactivateBuyer = async (req, res, next) => {
  try {
    const userId = req.user._id;

    await Buyer.findOneAndUpdate({ userId }, { $set: { isActive: false } });

    return res.status(200).json({
      success: true,
      message: "Buyer deactivated",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.activateBuyer = async (req, res, next) => {
  try {
    const buyer = await Buyer.findOneAndUpdate(
      { userId: req.user._id },
      { $set: { isActive: true } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Buyer activated",
      buyer,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};
