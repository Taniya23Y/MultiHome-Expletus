const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/seller.controller");
const {
  protect,
  sellerAuthorize,
  protectOptional,
} = require("../middleware/auth.middleware");

router.post("/register", protectOptional, sellerController.createSeller);

router.post("/send-otp", sellerController.sendPhoneOTP);
router.post("/verify-otp", sellerController.verifyPhoneOTP);
router.post("/seller-login", sellerController.sellerLogin);

router.get("/seller-refresh", sellerController.sellerRefreshToken);

router.post(
  "/logout",
  protect,
  sellerAuthorize(),
  sellerController.sellerLogout
);

router.get(
  "/seller-profile",
  protect,
  sellerAuthorize(),
  sellerController.getSellerProfile
);
router.put(
  "/update-profile",
  protect,
  sellerAuthorize(),
  sellerController.updateSellerProfile
);

router.post(
  "/create-shop",
  protect,
  sellerAuthorize(),
  sellerController.createShop
);

router.get("/shop/:id", sellerController.getSellerPublicProfile);
router.get("/shop/:shopId", sellerController.getShopPublicProfile);

router.get(
  "/stats",
  protect,
  sellerAuthorize(),
  sellerController.getSellerStats
);

router.get(
  "/properties",
  protect,
  sellerAuthorize(),
  sellerController.getSellerProperties
);

router.post(
  "/bank/create",
  protect,
  sellerAuthorize(),
  sellerController.createBankAccount
);

router.post(
  "/bank/upload-docs",
  protect,
  sellerAuthorize(),
  sellerController.submitBankDocuments
);

router.post(
  "/bank/verify",
  protect,
  sellerAuthorize(),
  sellerController.verifyBankAccount
);

module.exports = router;
