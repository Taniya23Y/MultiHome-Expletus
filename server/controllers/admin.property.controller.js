const Property = require("../models/property.model");
const ErrorHandler = require("../utils/ErrorHandler");

/**
 * GET: Pending Properties
 * /api/admin/properties/pending
 */
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

/**
 * PATCH: Approve / Reject Property
 * /api/admin/properties/:id/approve
 */
exports.approveProperty = async (req, res, next) => {
  try {
    const { approved } = req.body; // true / false

    const property = await Property.findById(req.params.id);
    if (!property) return next(new ErrorHandler("Property not found", 404));

    property.approvedByAdmin = approved;
    property.approvedAt = approved ? new Date() : null;
    property.approvedBy = approved ? req.user._id : null;

    await property.save();

    res.status(200).json({
      success: true,
      message: approved
        ? "Property approved successfully"
        : "Property rejected",
      property,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};
