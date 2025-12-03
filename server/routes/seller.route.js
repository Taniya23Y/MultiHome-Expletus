const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/seller.controller");
const {
  protect,
  authorize,
  sellerAuthorize,
} = require("../middleware/auth.middleware");

router.post(
  "/seller-create",
  protect,
  authorize("user", "buyer", "tenant", "service-provider"),
  sellerController.createSellerProfile
);
router.post("/send-phone-otp", sellerController.sendPhoneOTP);
router.post("/verify-phone-otp", sellerController.verifyPhoneOTP);
router.post("/login", sellerController.sellerLogin);
router.post("/seller-refresh", sellerController.sellerRefreshToken);

// Get Seller Profile
router.get(
  "/profile",
  protect,
  sellerAuthorize(),
  sellerController.getSellerProfile
);
router.get("/public/:sellerId", sellerController.getSellerPublicProfile);

// Update Seller Profile
router.put(
  "/update",
  protect,
  sellerAuthorize(),
  sellerController.updateSellerProfile
);

// Get Seller Properties
router.get(
  "/properties",
  protect,
  sellerAuthorize(),
  sellerController.getSellerProperties
);

// Seller Dashboard Stats (sales, properties, etc.)
router.get(
  "/stats",
  protect,
  sellerAuthorize(),
  sellerController.getSellerStats
);

// Upload KYC / Verification Documents
router.post(
  "/upload-documents",
  protect,
  sellerAuthorize(),
  sellerController.uploadDocuments
);

module.exports = router;
