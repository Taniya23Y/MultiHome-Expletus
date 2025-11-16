require("dotenv").config();
const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const otpService = require("../services/otpService");
const tokenService = require("../services/tokenService");
const bcrypt = require("bcryptjs");
const redis = require("../config/redis");
const { validateRegistration, validateForgot } = require("../utils/validators");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 15 * 60 * 1000,
};

exports.registerUser = async (req, res, next) => {
  try {
    const error = validateRegistration(req.body);
    if (error) return next(new ErrorHandler(error, 400));

    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return next(new ErrorHandler("Email already exists", 400));

    const user = await User.create({ name, email, password });

    const otp = await otpService.sendOTP(email);

    res.status(201).json({
      success: true,
      message: "User registered. OTP sent to email.",
      otp,
      userId: user._id,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const valid = await otpService.verifyOTP(email, otp);
    if (!valid) return next(new ErrorHandler("Invalid or expired OTP", 400));

    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Account verified!",
      user,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorHandler("Please enter email & password", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid email or password", 400));

    const match = await user.comparePassword(password);
    if (!match) return next(new ErrorHandler("Invalid email or password", 400));

    if (!user.isVerified)
      return next(new ErrorHandler("User not verified", 403));

    const accessToken = tokenService.generateAccessToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);

    // Save session in Redis
    await redis.set(user._id.toString(), JSON.stringify(user), "EX", 604800);

    // Set cookies
    res.cookie("access_token", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refresh_token", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      access: accessToken,
      refresh: refreshToken,
      user,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    // const { refresh } = req.body;
    const refresh = req.cookies.refresh_token;
    if (!refresh) return next(new ErrorHandler("Refresh token required", 400));

    const decoded = tokenService.verifyRefresh(refresh);
    if (!decoded) return next(new ErrorHandler("Invalid refresh token", 401));

    const session = await redis.get(decoded.id);
    if (!session) return next(new ErrorHandler("Session expired", 401));

    const user = JSON.parse(session);
    const newAccess = tokenService.generateAccessToken(user);

    res.cookie("access_token", newAccess, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      access: newAccess,
    });
  } catch (err) {
    next(new ErrorHandler("Invalid refresh token", 401));
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const error = validateForgot(req.body);
    if (error) return next(new ErrorHandler(error, 400));

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("User not found", 404));

    const otp = await otpService.sendOTP(email);

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
      otp,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.verifyForgotPassword = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const valid = await otpService.verifyOTP(email, otp);
    if (!valid) return next(new ErrorHandler("Invalid OTP", 400));

    res.status(200).json({
      success: true,
      message: "OTP verified. You may reset your password now.",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("User not found", 404));

    // Check: new password should NOT be same as old password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      return next(
        new ErrorHandler(
          "New password cannot be the same as the previous password",
          400
        )
      );
    }

    // Hash and save new password
    const hashed = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate({ email }, { password: hashed }, { new: true });

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Remove session from Redis
    await redis.del(req.user._id.toString());

    // Clear cookies
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};
