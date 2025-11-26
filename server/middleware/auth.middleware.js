require("dotenv").config();
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const tokenService = require("../services/tokenService");

const ACCESS_TTL = 15 * 60;
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

// Protect routes: check access_token cookie & Redis session
const protect = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;

    if (!accessToken && !refreshToken) {
      return next(new ErrorHandler("Not authenticated", 401));
    }

    let decoded;
    let user;

    // Try verifying access token
    if (accessToken) {
      try {
        decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
      } catch (err) {
        // Access token expired, we'll try refresh
        decoded = null;
      }
    }

    // If access token invalid/expired, try refresh token
    if (!decoded) {
      if (!refreshToken) return next(new ErrorHandler("Session expired", 401));

      let refreshDecoded;
      try {
        refreshDecoded = tokenService.verifyRefresh(refreshToken);
      } catch (e) {
        return next(new ErrorHandler("Refresh token invalid or expired", 401));
      }

      // Check refresh token in Redis
      const storedRefresh = await redis.get(`refresh:${refreshDecoded.id}`);
      if (!storedRefresh || storedRefresh !== refreshToken) {
        return next(new ErrorHandler("Refresh token invalid or expired", 401));
      }

      // Load session from Redis
      const sessionRaw = await redis.get(`session:${refreshDecoded.id}`);
      if (!sessionRaw) return next(new ErrorHandler("Session expired", 401));
      const session = JSON.parse(sessionRaw);

      // Fetch user
      user = await User.findById(refreshDecoded.id);
      if (!user) return next(new ErrorHandler("User not found", 404));

      // Generate new access token
      const newAccessToken = tokenService.generateAccessToken(
        user,
        session.sid
      );
      await redis.set(`access:${user._id}`, newAccessToken, "EX", ACCESS_TTL);

      // Set cookie
      res.cookie("access_token", newAccessToken, {
        ...cookieOptions,
        maxAge: ACCESS_TTL * 1000,
      });

      decoded = jwt.verify(newAccessToken, process.env.JWT_ACCESS_TOKEN);
    }

    // Fetch user from DB if not already fetched
    if (!user) {
      user = await User.findById(decoded.id);
      if (!user) return next(new ErrorHandler("User not found", 404));
    }

    // Check session in Redis
    const sessionRaw = await redis.get(`session:${user._id}`);
    if (!sessionRaw) return next(new ErrorHandler("Session expired", 401));

    const session = JSON.parse(sessionRaw);
    if (decoded.sid !== session.sid) {
      return next(new ErrorHandler("Invalid session ID", 401));
    }

    // Ensure role exists
    if (!Array.isArray(user.role) || user.role.length === 0) {
      user.role = "user";
      await user.save();
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error("Protect middleware error:", err.message);
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};

// Role-based access: pass roles like "Admin", "SuperAdmin"
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return next(new ErrorHandler("Not authenticated", 401));

    // user.roles is an array now
    const userRoles = req.user.role || [];

    // user must have at least one matching role
    const permitted = roles.some((role) => userRoles.includes(role));

    if (!permitted) {
      return next(
        new ErrorHandler("Access denied: insufficient permission", 403)
      );
    }

    next();
  };
};

// shortcuts for admin / superadmin routes
const adminOnly = authorize("Admin");
const superAdminOnly = authorize("SuperAdmin");

module.exports = {
  protect,
  authorize,
  adminOnly,
  superAdminOnly,
};
