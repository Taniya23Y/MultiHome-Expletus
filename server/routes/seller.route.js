const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/seller.controller");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

// Setup multer for document uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/documents/"); // folder to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ================= Seller Routes ================= //

// Create / Upgrade to seller
router.post("/create", protect, sellerController.createSellerProfile);

// Get seller profile
router.get("/me", protect, sellerController.getSellerProfile);

// Update seller profile
router.put("/update", protect, sellerController.updateSellerProfile);

// Get all properties of the seller
router.get("/properties", protect, sellerController.getSellerProperties);

// Get seller stats
router.get("/stats", protect, sellerController.getSellerStats);

// Upload verification documents
router.post(
  "/upload-documents",
  protect,
  upload.array("documents", 5),
  sellerController.uploadDocuments
);

module.exports = router;
