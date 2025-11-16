const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/seller.controller");
const { protect, authorize } = require("../middleware/auth.middleware");
const multer = require("multer");

// multer for document uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/documents/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Create / Upgrade to seller
// Only logged-in users can create a seller profile
router.post(
  "/create",
  protect,
  authorize("user", "buyer", "tenant", "service-provider"),
  sellerController.createSellerProfile
);

// Get seller profile
router.get(
  "/me",
  protect,
  authorize("seller"),
  sellerController.getSellerProfile
);

// Update seller profile
router.put(
  "/update",
  protect,
  authorize("seller"),
  sellerController.updateSellerProfile
);

// Get all properties of the seller
router.get(
  "/properties",
  protect,
  authorize("seller"),
  sellerController.getSellerProperties
);

// Get seller stats
router.get(
  "/stats",
  protect,
  authorize("seller"),
  sellerController.getSellerStats
);

// Upload verification documents
router.post(
  "/upload-documents",
  protect,
  authorize("seller"),
  upload.array("documents", 5),
  sellerController.uploadDocuments
);

module.exports = router;
