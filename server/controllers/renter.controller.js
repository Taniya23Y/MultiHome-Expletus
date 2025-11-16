const Renter = require("../models/renter.model");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");

// Utility → Merge unique roles
const addRoleIfNotExists = (user, roleName) => {
  if (!Array.isArray(user.role)) user.role = ["user"];

  if (!user.role.includes(roleName)) {
    user.role.push(roleName);
  }
};

/**
 * ------------------------------------------------------
 * CREATE RENTER PROFILE
 * ------------------------------------------------------
 */
exports.createRenter = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const { name, email, phone } = req.body;

    // check duplicate
    const existing = await Renter.findOne({ userId });
    if (existing) {
      return next(new ErrorHandler("Renter profile already exists", 400));
    }

    const renter = await Renter.create({
      userId,
      name,
      email,
      phone,
    });

    // update roles
    const user = await User.findById(userId);
    addRoleIfNotExists(user, "renter");
    await user.save();

    res.status(201).json({
      success: true,
      message: "Renter profile created",
      renter,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * ------------------------------------------------------
 * GET RENTER
 * ------------------------------------------------------
 */
exports.getRenter = async (req, res, next) => {
  try {
    const renter = await Renter.findOne({ userId: req.params.id });

    if (!renter) return next(new ErrorHandler("Renter not found", 404));

    res.json({ success: true, renter });
  } catch (err) {
    next(err);
  }
};

/**
 * ------------------------------------------------------
 * UPDATE RENTER
 * ------------------------------------------------------
 */
exports.updateRenter = async (req, res, next) => {
  try {
    const renter = await Renter.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true }
    );

    if (!renter) return next(new ErrorHandler("Renter not found", 404));

    res.json({ success: true, renter });
  } catch (err) {
    next(err);
  }
};

/**
 * ------------------------------------------------------
 * DELETE RENTER
 * ------------------------------------------------------
 */
exports.deleteRenter = async (req, res, next) => {
  try {
    const renter = await Renter.findOneAndDelete({ userId: req.params.id });

    if (!renter) return next(new ErrorHandler("Renter not found", 404));

    res.json({ success: true, message: "Renter deleted" });
  } catch (err) {
    next(err);
  }
};

/**
 * ------------------------------------------------------
 * SAVE RENTAL PROPERTY
 * ------------------------------------------------------
 */
exports.saveRental = async (req, res, next) => {
  try {
    const { listingId } = req.body;

    const renter = await Renter.findOne({ userId: req.params.id });
    if (!renter) return next(new ErrorHandler("Renter not found", 404));

    const alreadySaved = renter.savedRentals.some(
      (item) => item.listingId.toString() === listingId
    );

    if (!alreadySaved) {
      renter.savedRentals.push({ listingId });
      await renter.save();
    }

    res.json({ success: true, savedRentals: renter.savedRentals });
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
