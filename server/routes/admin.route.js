const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/auth.middleware");

const adminPropertyController = require("../controllers/admin.property.controller");

router.get(
  "/properties/pending",
  protect,
  adminOnly,
  adminPropertyController.getPendingProperties
);

router.patch(
  "/properties/:id/approve",
  protect,
  adminOnly,
  adminPropertyController.approveProperty
);

module.exports = router;
