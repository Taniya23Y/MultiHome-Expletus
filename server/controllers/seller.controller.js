const Seller = require("../models/seller.model");
const User = require("../models/user.model");
const Property = require("../models/property.model");

// Create/Upgrade to Seller
exports.createSellerProfile = async (req, res) => {
  try {
    const {
      businessName,
      phone,
      address,
      city,
      state,
      country,
      pincode,
      gstNumber,
    } = req.body;

    // Check if user is already a seller
    const existingSeller = await Seller.findOne({ userId: req.user._id });
    if (existingSeller) {
      return res.status(400).json({ message: "User is already a seller" });
    }

    const seller = new Seller({
      userId: req.user._id,
      name: req.user.name,
      businessName,
      email: req.user.email,
      phone,
      address,
      city,
      state,
      country,
      pincode,
      gstNumber,
    });

    await seller.save();

    // Update user role and linkedProfiles
    req.user.role = "seller";
    req.user.linkedProfiles.sellerId = seller._id;
    await req.user.save();

    res.status(201).json({ message: "Seller profile created", seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Seller Profile
exports.getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.user._id });
    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }
    res.status(200).json({ seller });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Seller Profile
exports.updateSellerProfile = async (req, res) => {
  try {
    const updates = req.body;
    const seller = await Seller.findOneAndUpdate(
      { userId: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!seller) {
      return res.status(404).json({ message: "Seller profile not found" });
    }

    res.status(200).json({ message: "Profile updated", seller });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Properties of Seller
exports.getSellerProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      sellerId: req.user.linkedProfiles.sellerId,
    });
    res.status(200).json({ properties });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Seller Stats
exports.getSellerStats = async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.user._id });
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const propertiesCount = await Property.countDocuments({
      sellerId: seller._id,
    });
    const totalSales = seller.totalSales; // you can calculate dynamically if needed

    res.status(200).json({ propertiesCount, totalSales });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Upload Verification Documents
exports.uploadDocuments = async (req, res) => {
  try {
    // Assume req.files is an array of uploaded file URLs
    const docs = req.files.map((file) => file.path);

    const seller = await Seller.findOneAndUpdate(
      { userId: req.user._id },
      { $push: { documents: { $each: docs } } },
      { new: true }
    );

    res.status(200).json({ message: "Documents uploaded", seller });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
