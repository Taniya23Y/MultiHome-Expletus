require("dotenv").config();
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");

// Protect routes: check access_token cookie & Redis session
const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      return next(
        new ErrorHandler("Not authenticated. No token provided.", 401)
      );
    }

    // Verify JWT access token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

    // Check session in Redis
    const session = await redis.get(decoded.id);
    if (!session) {
      return next(
        new ErrorHandler("Session expired. Please login again.", 401)
      );
    }

    const sessionUser = JSON.parse(session);

    // fetch actual user from mongoDB
    const user = await User.findById(sessionUser._id);
    if (!user) return next(new ErrorHandler("User not found.", 404));

    // ensure roles exists
    if (!Array.isArray(user.role) || user.role.length === 0) {
      user.role = ["user"];
      await user.save();
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Protect middleware error:", err.message);
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
const adminOnly = (req, res, next) => authorize("Admin")(req, res, next);
const superAdminOnly = (req, res, next) =>
  authorize("SuperAdmin")(req, res, next);

module.exports = {
  protect,
  authorize,
  adminOnly,
  superAdminOnly,
};
