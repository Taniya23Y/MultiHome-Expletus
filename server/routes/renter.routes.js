const express = require("express");
const router = express.Router();

const {
  createRenter,
  getMyRenterProfile,
  updateMyRenterProfile,
  deleteMyRenterProfile,
  saveRental,
  removeSavedRental,
  addRecentlyViewed,
  getPreferences,
  updatePreferences,
  addVisitRequest,
  updateVisitRequest,
} = require("../controllers/renter.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

// All renter routes require Login + Renter Role
router.use(protect);
router.use(authorize("renter"));

/**
 * -------------------------------------------------------
 * RENTER PROFILE
 * -------------------------------------------------------
 */
router.post("/create", createRenter); // Create renter profile
router.get("/me", getMyRenterProfile); // Get own renter profile
router.put("/me", updateMyRenterProfile); // Update own profile
router.delete("/me", deleteMyRenterProfile); // Delete renter profile

/**
 * -------------------------------------------------------
 * SAVED RENTALS (Wishlist)
 * -------------------------------------------------------
 */
router.post("/saved", saveRental); // Save rental property
router.delete("/saved/:listingId", removeSavedRental); // Remove saved property

/**
 * -------------------------------------------------------
 * RECENTLY VIEWED
 * -------------------------------------------------------
 */
router.post("/recent", addRecentlyViewed); // Add to recently viewed

/**
 * -------------------------------------------------------
 * PREFERENCES
 * -------------------------------------------------------
 */
router.get("/preferences", getPreferences);
router.put("/preferences", updatePreferences);

/**
 * -------------------------------------------------------
 * VISIT REQUESTS
 * -------------------------------------------------------
 */
router.post("/visit", addVisitRequest); // Create visit request
router.put("/visit/:requestId", updateVisitRequest); // Update visit request

module.exports = router;
