const Property = require("../models/property.model");
const Seller = require("../models/seller.model");

exports.createProperty = async (req, res) => {
  try {
    // 1️ Check if user is seller
    if (!req.user.linkedProfiles || !req.user.linkedProfiles.sellerId) {
      return res.status(403).json({
        message:
          "Only sellers can create properties. Create seller profile first.",
      });
    }

    const sellerId = req.user.linkedProfiles.sellerId;

    // 2️ Ensure Seller Exists
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }

    // 3️ Extract data from req.body
    const propertyData = req.body;

    // 4️ Add owner + seller relation
    propertyData.owner = req.user._id; // property owned by user
    propertyData.sellerId = sellerId; // seller reference for stats

    // 5️ Images upload support (if using multer)
    if (req.files && req.files.images) {
      propertyData.images = req.files.images.map((file) => ({
        url: file.path,
        caption: file.originalname,
      }));
    }

    // 6️ Save property
    const property = new Property(propertyData);
    await property.save();

    // 7️ Update seller total listings
    seller.totalListings += 1;
    await seller.save();

    res.status(201).json({
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getMyProperties = async (req, res) => {
  try {
    if (!req.user.linkedProfiles?.sellerId) {
      return res.status(403).json({ message: "You are not a seller" });
    }

    const properties = await Property.find({
      sellerId: req.user.linkedProfiles.sellerId,
    }).sort({ createdAt: -1 });

    res.status(200).json({ properties });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner", "name email")
      .populate("category")
      .populate("subcategory");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ property });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const sellerId = req.user.linkedProfiles?.sellerId;

    if (!sellerId) {
      return res
        .status(403)
        .json({ message: "Only sellers can update properties" });
    }

    // Check ownership
    const property = await Property.findOne({
      _id: req.params.id,
      sellerId: sellerId,
    });

    if (!property) {
      return res
        .status(404)
        .json({ message: "Property not found or unauthorized" });
    }

    const updates = req.body;

    // Images update if needed
    if (req.files && req.files.images) {
      updates.images = req.files.images.map((file) => ({
        url: file.path,
        caption: file.originalname,
      }));
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Property updated successfully",
      updatedProperty,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const sellerId = req.user.linkedProfiles?.sellerId;

    const property = await Property.findOne({
      _id: req.params.id,
      sellerId: sellerId,
    });

    if (!property) {
      return res
        .status(404)
        .json({ message: "Property not found or unauthorized" });
    }

    await property.deleteOne();

    // Reduce seller listings
    await Seller.findByIdAndUpdate(sellerId, {
      $inc: { totalListings: -1 },
    });

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
