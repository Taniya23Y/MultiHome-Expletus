const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");

router.post("/register-user", auth.registerUser);
router.post("/verify-user", auth.verifyUser);

router.post("/login", auth.loginUser);
router.post("/refresh", auth.refreshToken);

router.post("/forgot-password", auth.forgotPassword);
router.post("/verify-forgot-password", auth.verifyForgotPassword);
router.post("/reset-forgot-password", auth.resetPassword);

module.exports = router;
