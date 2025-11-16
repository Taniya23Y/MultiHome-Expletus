const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");
const {
  superAdminOnly,
  adminOnly,
  protect,
} = require("../middleware/auth.middleware");

router.post("/register-user", auth.registerUser);
router.post("/verify-user", auth.verifyUser);

router.post("/login", auth.loginUser);
router.post("/refresh", auth.refreshToken);

router.post("/forgot-password", auth.forgotPassword);
router.post("/verify-forgot-password", auth.verifyForgotPassword);
router.post("/reset-forgot-password", auth.resetPassword);
router.post("/logout", protect, auth.logoutUser);

// Protected routes example
router.get("/profile", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

// Admin-only route example
router.get("/admin/dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: "Admin access granted" });
});

// SuperAdmin-only route example
router.get("/superadmin/panel", protect, superAdminOnly, (req, res) => {
  res.json({ message: "SuperAdmin access granted" });
});

module.exports = router;
