require("dotenv").config();
const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
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

    // Check Redis session
    const session = await redis.get(decoded.id);
    if (!session) {
      return next(
        new ErrorHandler("Session expired. Please login again.", 401)
      );
    }

    const user = JSON.parse(session);
    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};

// Role-based access: pass roles like "Admin", "SuperAdmin"
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return next(new ErrorHandler("Not authenticated", 401));

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler("Access denied: insufficient permission", 403)
      );
    }

    next();
  };
};

// Prebuilt shortcuts for admin / superadmin routes
const adminOnly = (req, res, next) => authorize("Admin")(req, res, next);
const superAdminOnly = (req, res, next) =>
  authorize("SuperAdmin")(req, res, next);

module.exports = {
  protect,
  authorize,
  adminOnly,
  superAdminOnly,
};
