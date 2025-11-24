const express = require("express");
const router = express.Router();

const {
  createProperty,
  getMyProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/property.controller");

// Multer for images (optional)
const upload = require("../utils/uploads");
const { protect } = require("../middleware/auth.middleware");

router.post("/create", protect, upload.array("images"), createProperty);

// Get all properties of seller
router.get("/my-properties", protect, getMyProperties);

// Get property by ID
router.get("/:id", getPropertyById);

// Update property
router.put("/update/:id", protect, upload.array("images"), updateProperty);

// Delete property
router.delete("/delete/:id", protect, deleteProperty);

module.exports = router;
