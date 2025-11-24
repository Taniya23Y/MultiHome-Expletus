const mongoose = require("mongoose");
const Renter = require("../models/renter.model");
const User = require("../models/user.model");
const Property = require("../models/property.model");
const ErrorHandler = require("../utils/ErrorHandler");

// Check if any ID is valid
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Only allow selected fields
const pickAllowedFields = (data, allowedFields) => {
  const cleanData = {};
  allowedFields.forEach((field) => {
    if (data[field] !== undefined) cleanData[field] = data[field];
  });
  return cleanData;
};

exports.createRenterProfile = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();

    const { name, email, phone } = req.body;

    // check duplicate
    const existing = await Renter.findOne({ userId });
    if (existing) {
      return next(new ErrorHandler("Renter profile already exists", 400));
    }

    // Only allow basic fields
    const allowedData = pickAllowedFields(req.body, [
      "name",
      "phone",
      "address",
      "preferences",
    ]);

    const renter = await Renter.create({
      userId,
      ...allowedData,
    });

    // update roles
    const user = await User.findByIdAndUpdate(userId, {
      $addToSet: { role: "Renter" },
      $set: { "linkedProfiles.renterId": renter._id },
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Renter profile created",
      renter,
    });
  } catch (err) {
    next(err);
  }
};

exports.getRenter = async (req, res, next) => {
  try {
    // const renter = await Renter.findOne({ userId: req.params.id });
    const renter = await Renter.findOne({ userId: req.user._id });

    if (!renter)
      return next(new ErrorHandler("Renter profile  not found", 404));

    return res.json({ success: true, renter });
  } catch (err) {
    next(err);
  }
};

exports.updateRenter = async (req, res, next) => {
  try {
    const allowedData = pickAllowedFields(req.body, [
      "name",
      "phone",
      "address",
      "preferences",
    ]);

    const renter = await Renter.findOneAndUpdate(
      // { userId: req.params.id },
      // req.body,
      { userId: req.user._id },
      { $set: allowedData },
      { new: true }
    );

    if (!renter)
      return next(new ErrorHandler("Renter profile  not found", 404));

    return res.json({ success: true, renter });
  } catch (err) {
    next(err);
  }
};

exports.deleteRenter = async (req, res, next) => {
  try {
    // const renter = await Renter.findOneAndDelete({ userId: req.params.id });
    const renter = await Renter.findOneAndDelete({ userId: req.user._id });

    if (!renter) return next(new ErrorHandler("Renter profile not found", 404));

    // Remove renter link + role from user
    await User.findByIdAndUpdate(req.user._id, {
      $unset: { "linkedProfiles.renterId": "" },
      $pull: { role: "Renter" },
    });

    return res.json({ success: true, message: "Renter deleted" });
  } catch (err) {
    next(err);
  }
};

exports.saveRentalProperty = async (req, res, next) => {
  try {
    const { listingId } = req.body;
    const userId = req.user._id;

    if (!isValidId(listingId))
      return next(new ErrorHandler("Invalid property ID.", 400));

    const property = await Property.findById(listingId);
    if (!property) return next(new ErrorHandler("Property not found.", 404));

    const renter = await Renter.findOneAndUpdate(
      { userId },
      { $addToSet: { savedRentals: listingId } },
      { new: true }
    );

    const alreadySaved = renter.savedRentals.some(
      (item) => item.listingId.toString() === listingId
    );

    if (!alreadySaved) {
      renter.savedRentals.push({ listingId });
      await renter.save();
    }

    return res.json({ success: true, savedRentals: renter.savedRentals });
  } catch (err) {
    next(err);
  }
};

/**
 * ------------------------------------------------------
 * REMOVE SAVED RENTAL
 * ------------------------------------------------------
 */
exports.removeSavedRental = async (req, res, next) => {
  try {
    const { id, listingId } = req.params;

    const renter = await Renter.findOne({ userId: id });
    if (!renter) return next(new ErrorHandler("Renter not found", 404));

    renter.savedRentals = renter.savedRentals.filter(
      (item) => item.listingId.toString() !== listingId
    );

    await renter.save();

    res.json({ success: true, savedRentals: renter.savedRentals });
  } catch (err) {
    next(err);
  }
};

/**
 * ------------------------------------------------------
 * RECENTLY VIEWED
 * ------------------------------------------------------
 */
exports.addRecentlyViewed = async (req, res, next) => {
  try {
    const { listingId } = req.body;

    const renter = await Renter.findOne({ userId: req.params.id });
    if (!renter) return next(new ErrorHandler("Renter not found", 404));

    renter.recentlyViewed = renter.recentlyViewed.filter(
      (v) => v.listingId.toString() !== listingId
    );

    renter.recentlyViewed.unshift({ listingId });

    renter.recentlyViewed = renter.recentlyViewed.slice(0, 20);

    await renter.save();

    res.json({ success: true, recentlyViewed: renter.recentlyViewed });
  } catch (err) {
    next(err);
  }
};

/**
 * ------------------------------------------------------
 * GET PREFERENCES
 * ------------------------------------------------------
 */
exports.getPreferences = async (req, res, next) => {
  try {
    const renter = await Renter.findOne({ userId: req.params.id });

    if (!renter) return next(new ErrorHandler("Renter not found", 404));

    res.json({ success: true, preferences: renter.preferences });
  } catch (err) {
    next(err);
  }
};

/**
 * ------------------------------------------------------
 * UPDATE PREFERENCES
 * ------------------------------------------------------
 */
exports.updatePreferences = async (req, res, next) => {
  try {
    const renter = await Renter.findOneAndUpdate(
      { userId: req.params.id },
      { preferences: req.body },
      { new: true }
    );

    if (!renter) return next(new ErrorHandler("Renter not found", 404));

    res.json({ success: true, preferences: renter.preferences });
  } catch (err) {
    next(err);
  }
};

/**
 * ------------------------------------------------------
 * ADD VISIT REQUEST
 * ------------------------------------------------------
 */
exports.addVisitRequest = async (req, res, next) => {
  try {
    const { propertyId, scheduledDate, ownerId } = req.body;

    const renter = await Renter.findOne({ userId: req.params.id });
    if (!renter) return next(new ErrorHandler("Renter not found", 404));

    renter.visitRequests.push({
      propertyId,
      scheduledDate,
      ownerId,
    });

    await renter.save();

    res.json({ success: true, visitRequests: renter.visitRequests });
  } catch (err) {
    next(err);
  }
};

/**
 * ------------------------------------------------------
 * UPDATE VISIT REQUEST
 * ------------------------------------------------------
 */
exports.updateVisitRequest = async (req, res, next) => {
  try {
    const { requestId } = req.params;

    const renter = await Renter.findOne({ userId: req.params.id });
    if (!renter) return next(new ErrorHandler("Renter not found", 404));

    const request = renter.visitRequests.id(requestId);

    if (!request) return next(new ErrorHandler("Request not found", 404));

    Object.assign(request, req.body);

    await renter.save();

    res.json({ success: true, visitRequests: renter.visitRequests });
  } catch (err) {
    next(err);
  }
};
