const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth.middleware");
const adminPropertyController = require("../controllers/admin.property.controller");
const ErrorHandler = require("../utils/ErrorHandler");

router.use((req, res, next) => {
  if (req.seller) {
    return next(new ErrorHandler("Sellers cannot access admin routes", 403));
  }
  next();
});

router.get(
  "/properties/pending",
  protect,
  adminOnly,
  adminPropertyController.getPendingProperties
);

router.patch(
  "/properties/approve/:id",
  protect,
  adminOnly,
  adminPropertyController.approveProperty
);

router.get("/users", protect, adminOnly, adminPropertyController.getUsersList);

router.get(
  "/sellers",
  protect,
  adminOnly,
  adminPropertyController.getSellersList
);

module.exports = router;
