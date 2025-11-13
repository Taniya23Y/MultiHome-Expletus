const Property = require("../models/property.model");

let properties = [
  {
    id: 1,
    title: "3BHK Luxury Apartment",
    price: 7500000,
    type: "Apartment",
    purpose: "Buy",
    location: "Indore, MP",
    owner: "Taniya Yadav",
    image: "https://example.com/apartment.jpg",
    status: "available",
  },
  {
    id: 2,
    title: "2BHK Family Flat for Rent",
    price: 15000,
    type: "Flat",
    purpose: "Rent",
    location: "Vijay Nagar, Indore",
    owner: "Lale Vor",
    image: "https://example.com/flat.jpg",
    status: "available",
  },
];

// GET all properties
const getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

// GET property by ID
const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

// POST - Add new property
const addProperty = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
      areaSqFt,
      propertyType,
      amenities,
      images,
      owner,
      status,
    } = req.body;

    // basic validation
    if (!title || !price || !location || !bedrooms || !bathrooms) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProperty = new Property({
      title,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
      areaSqFt,
      propertyType,
      amenities,
      images,
      owner,
      status,
    });

    // save the new property
    const savedProperty = await newProperty.save();

    res.status(201).json({
      message: "Property added successfully",
      property: savedProperty,
    });
  } catch (error) {
    next(error);
  }
};

// PUT - Update property details
const updateProperty = async (req, res, next) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE - Remove property
const deleteProperty = async (req, res, next) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  addProperty,
  updateProperty,
  deleteProperty,
};
