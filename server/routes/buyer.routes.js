const express = require("express");
const router = express.Router();
const buyerController = require("../controllers/buyer.controller");
const { protect, authorize } = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middleware/auth.middleware");
const buyerOnly = authorize("Buyer");

router.post("/create", protect, buyerController.createBuyer);
router.get("/profile", protect, buyerOnly, buyerController.getBuyerProfile);
router.put("/profile", protect, buyerOnly, buyerController.updateBuyerProfile);
router.delete(
  "/profile",
  protect,
  adminOnly,
  buyerController.deleteBuyerProfile
);

router.post(
  "/save-property/:id",
  protect,
  buyerOnly,
  buyerController.saveProperty
);

router.delete(
  "/remove-saved-property/:id/:listingId",
  protect,
  buyerOnly,
  buyerController.removeSavedProperty
);

router.post(
  "/recently-viewed/:id",
  protect,
  buyerOnly,
  buyerController.addRecentlyViewed
);

router.get(
  "/preferences/:id",
  protect,
  buyerOnly,
  buyerController.getPreferences
);

router.put(
  "/preferences/:id",
  protect,
  buyerOnly,
  buyerController.updatePreferences
);

router.post(
  "/visit-request/:id",
  protect,
  buyerOnly,
  buyerController.addVisitRequest
);

router.put(
  "/visit-request/:id/:requestId",
  protect,
  buyerOnly,
  buyerController.updateVisitRequest
);

router.put("/kyc", protect, buyerOnly, buyerController.updateKYC);

router.put("/deactivate", protect, buyerOnly, buyerController.deactivateBuyer);

module.exports = router;
