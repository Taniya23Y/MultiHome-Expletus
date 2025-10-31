const express = require("express");
const router = express.Router();

// dummy data for properties
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
router.get("/properties", (req, res) => {
  res.json(properties);
});

// GET property by ID
router.get("/properties/:id", (req, res, next) => {
  try {
    const property = properties.find((p) => p.id === parseInt(req.params.id));
    if (!property) throw new Error("Property not found");
    res.json(property);
  } catch (err) {
    next(err);
  }
});

// POST - Add new property
router.post("/properties", (req, res, next) => {
  try {
    const { title, price, type, purpose, location, owner, image } = req.body;

    if (!title || !price || !type || !purpose || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProperty = {
      id: properties.length + 1,
      title,
      price,
      type,
      purpose,
      location,
      owner: owner || "Unknown",
      image: image || "https://via.placeholder.com/300",
      status: "available",
    };

    properties.push(newProperty);
    res.status(201).json(newProperty);
  } catch (err) {
    next(err);
  }
});

// PUT - Update property details
router.put("/properties/:id", (req, res, next) => {
  try {
    const property = properties.find((p) => p.id === parseInt(req.params.id));
    if (!property) throw new Error("Property not found");

    const { title, price, type, purpose, location, owner, status, image } =
      req.body;

    property.title = title || property.title;
    property.price = price || property.price;
    property.type = type || property.type;
    property.purpose = purpose || property.purpose;
    property.location = location || property.location;
    property.owner = owner || property.owner;
    property.image = image || property.image;
    property.status = status || property.status;

    res.json(property);
  } catch (err) {
    next(err);
  }
});

// DELETE - Remove a property
router.delete("/properties/:id", (req, res, next) => {
  try {
    const index = properties.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) throw new Error("Property not found");

    properties.splice(index, 1);
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
