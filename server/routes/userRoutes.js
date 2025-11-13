const express = require("express");
const {
  registrationUser,
  activateUser,
  loginUser,
  logoutUser,
  updateAccessToken,
  getUserInfo,
  socialAuth,
  updateUserInfo,
  updatePassword,
  updateProfilePicture,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registrationUser);
router.post("/activate", activateUser);
router.post("/login", loginUser);
router.post("/social-auth", socialAuth);

// Protected user routes
router.get("/me", protect, getUserInfo);
router.post("/logout", protect, logoutUser);
router.put("/update-info", protect, updateUserInfo);
router.put("/update-password", protect, updatePassword);
router.put("/update-profile-picture", protect, updateProfilePicture);
router.get("/refresh-token", protect, updateAccessToken);

// Admin routes
router.get("/", protect, admin, getAllUsers);
router.put("/role/:id", protect, admin, updateUserRole);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
