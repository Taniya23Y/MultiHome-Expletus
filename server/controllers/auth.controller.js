// controllers/auth.controller.js
require("dotenv").config();
const crypto = require("crypto");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const otpService = require("../services/otpService");
const emailService = require("../services/welcomeService");
const tokenService = require("../services/tokenService");
const bcrypt = require("bcryptjs");
const redis = require("../config/redis");
const { validateRegistration, validateForgot } = require("../utils/validators");

const ACCESS_TTL = 15 * 60;
const REFRESH_TTL = 7 * 24 * 60 * 60;
const SESSION_TTL = REFRESH_TTL;
const PWRESET_TTL = 15 * 60;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

const makeSid = () => crypto.randomBytes(16).toString("hex");

const setSessionInRedis = async (user, sid) => {
  const sessionKey = `session:${user._id}`;
  const sessionValue = JSON.stringify({
    userId: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    sid,
  });
  await redis.set(sessionKey, sessionValue, "EX", SESSION_TTL);
};

const setTokensInRedis = async (userId, accessToken, refreshToken) => {
  await redis.set(`access:${userId}`, accessToken, "EX", ACCESS_TTL);
  await redis.set(`refresh:${userId}`, refreshToken, "EX", REFRESH_TTL);
};

exports.registerUser = async (req, res, next) => {
  try {
    const error = validateRegistration(req.body);
    if (error) return next(new ErrorHandler(error, 400));

    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return next(new ErrorHandler("Email already exists", 400));

    const user = await User.create({ name, email, password });

    const ok = await otpService.checkOtpRequests(email);
    if (!ok)
      return next(new ErrorHandler("Too many OTP requests. Try later.", 429));

    await otpService.sendOTP(email, name, "register");

    return res.status(201).json({
      success: true,
      message: "User registered. OTP sent to email.",
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

    return res.status(200).json({
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

    const sid = makeSid();

    const accessToken = tokenService.generateAccessToken(user, sid);
    const refreshToken = tokenService.generateRefreshToken(user, sid);

    await setTokensInRedis(user._id.toString(), accessToken, refreshToken);
    await setSessionInRedis(user, sid);

    res.cookie("access_token", accessToken, {
      ...cookieOptions,
      maxAge: ACCESS_TTL * 1000,
    });
    res.cookie("refresh_token", refreshToken, {
      ...cookieOptions,
      maxAge: REFRESH_TTL * 1000,
    });

    emailService.sendWelcomeEmail(email, user.name).catch(() => {});

    const safeUser = user.toObject ? user.toObject() : user;
    delete safeUser.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: safeUser,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const refresh = req.cookies?.refresh_token;
    if (!refresh) return next(new ErrorHandler("Refresh token required", 400));

    let decoded;
    try {
      decoded = tokenService.verifyRefresh(refresh);
    } catch (e) {
      return next(new ErrorHandler("Invalid or expired refresh token", 401));
    }

    const userId = decoded.id?.toString();
    if (!userId)
      return next(new ErrorHandler("Invalid refresh token payload", 401));

    const storedRefresh = await redis.get(`refresh:${userId}`);
    if (!storedRefresh || storedRefresh !== refresh) {
      return next(new ErrorHandler("Invalid or expired refresh token", 401));
    }

    const sessionRaw = await redis.get(`session:${userId}`);
    if (!sessionRaw) return next(new ErrorHandler("Session expired", 401));
    const session = JSON.parse(sessionRaw);

    const user = await User.findById(userId);
    if (!user) return next(new ErrorHandler("User no longer exists", 404));

    const newAccess = tokenService.generateAccessToken(user, session.sid);

    await redis.set(`access:${userId}`, newAccess, "EX", ACCESS_TTL);

    res.cookie("access_token", newAccess, {
      ...cookieOptions,
      maxAge: ACCESS_TTL * 1000,
    });

    return res.status(200).json({
      success: true,
      access: newAccess,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(new ErrorHandler(err.message || "Invalid refresh token", 401));
  }
};

exports.updateAccessToken = async (req, res, next) => {
  return exports.refreshToken(req, res, next);
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const error = validateForgot(req.body);
    if (error) return next(new ErrorHandler(error, 400));

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("User not found", 404));

    const ok = await otpService.checkOtpRequests(email);
    if (!ok)
      return next(new ErrorHandler("Too many OTP requests. Try later.", 429));

    await otpService.sendOTP(email, user.name, "forgot");

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.verifyForgotPassword = async (req, res, next) => {
  try {
    let { email, otp } = req.body;

    if (!email || !otp)
      return next(new ErrorHandler("Missing email or OTP", 400));

    // Normalize email
    email = email.trim().toLowerCase();

    const valid = await otpService.verifyOTP(email, otp);
    if (!valid) return next(new ErrorHandler("Invalid or expired OTP", 400));

    await redis.set(`pwreset:${email}`, "allowed", "EX", PWRESET_TTL);

    return res.status(200).json({
      success: true,
      message: "OTP verified. You may reset your password now.",
      allowResetForSeconds: PWRESET_TTL,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    let { email, newPassword } = req.body;
    if (!email || !newPassword)
      return next(new ErrorHandler("Missing email or newPassword", 400));

    email = email.trim().toLowerCase();

    const allowed = await redis.get(`pwreset:${email}`);
    if (!allowed)
      return next(
        new ErrorHandler("OTP not verified or expired. Request OTP again.", 401)
      );

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("User not found", 404));

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return next(
        new ErrorHandler(
          "New password cannot be the same as the previous password",
          400
        )
      );
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashed }, { new: true });

    const keysToDelete = [
      `pwreset:${email}`,
      `session:${user._id}`,
      `access:${user._id}`,
      `refresh:${user._id}`,
    ];

    for (const key of keysToDelete) {
      const exists = await redis.exists(key);
      if (exists) {
        await redis.del(key);
        console.log("Deleted Redis key:", key);
      }
    }

    return res.status(200).json({
      success: true,
      message:
        "Password reset successfully. Please login with your new password.",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    let userId = req.user?.id || req.user?._id;

    if (!userId) {
      const access = req.cookies?.access_token;
      if (access) {
        try {
          const decoded = tokenService.verifyAccess(access);
          userId = decoded.id;
        } catch (e) {}
      }
    }

    if (userId) {
      await redis.del(`session:${userId}`);
      await redis.del(`access:${userId}`);
      await redis.del(`refresh:${userId}`);
    }

    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("refresh_token", cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

// Get current logged-in user's profile
exports.getMeProfile = async (req, res, next) => {
  try {
    if (!req.user) return next(new ErrorHandler("User not authenticated", 401));

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return next(new ErrorHandler("User not found", 404));

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};
