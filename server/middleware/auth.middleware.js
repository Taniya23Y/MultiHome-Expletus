require("dotenv").config();
const redis = require("../config/redis");
const User = require("../models/user.model");
const Seller = require("../models/seller.model");
const ErrorHandler = require("../utils/ErrorHandler");
const tokenService = require("../services/tokenService");

const ACCESS_TTL = 15 * 60;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

const protect = async (req, res, next) => {
  try {
    // ================================
    // Read tokens
    // ================================
    const userAccess = req.cookies?.access_token;
    const userRefresh = req.cookies?.refresh_token;

    const sellerAccess = req.cookies?.seller_access_token;
    const sellerRefresh = req.cookies?.seller_refresh_token;

    let decoded = null;
    let isSeller = false;

    // ================================================
    // 1️⃣ ACCESS TOKEN CHECK — TRY SELLER FIRST
    // ================================================
    if (sellerAccess) {
      try {
        decoded = tokenService.verifySellerAccess(sellerAccess);
        isSeller = true;
      } catch (_) {}
    }

    if (!decoded && userAccess) {
      try {
        decoded = tokenService.verifyUserAccess(userAccess);
        isSeller = false;
      } catch (_) {}
    }

    // ==================================================================
    // 2️⃣ IF ACCESS TOKEN INVALID — TRY REFRESH TOKEN (SELLER FIRST)
    // ==================================================================
    if (!decoded) {
      // No valid refresh token
      if (!sellerRefresh && !userRefresh) {
        return next(new ErrorHandler("Session expired", 401));
      }

      // -----------------------------
      // TRY SELLER REFRESH
      // -----------------------------
      if (sellerRefresh) {
        try {
          const refDecoded = tokenService.verifySellerRefresh(sellerRefresh);
          const sellerId = refDecoded.id;

          const stored = await redis.get(`seller_refresh:${sellerId}`);
          const sessionRaw = await redis.get(`seller_session:${sellerId}`);

          if (stored && stored === sellerRefresh && sessionRaw) {
            const session = JSON.parse(sessionRaw);
            const seller = await Seller.findById(sellerId);

            const newAccess = tokenService.generateSellerAccessToken(
              seller,
              session.sid
            );

            res.cookie("seller_access_token", newAccess, {
              ...cookieOptions,
              maxAge: ACCESS_TTL * 1000,
            });

            decoded = tokenService.verifySellerAccess(newAccess);
            isSeller = true;
          }
        } catch (_) {}
      }

      // -----------------------------
      // TRY USER REFRESH
      // -----------------------------
      if (!decoded && userRefresh) {
        try {
          const refDecoded = tokenService.verifyUserRefresh(userRefresh);
          const userId = refDecoded.id;

          const stored = await redis.get(`refresh:${userId}`);
          const sessionRaw = await redis.get(`session:${userId}`);

          if (stored && stored === userRefresh && sessionRaw) {
            const session = JSON.parse(sessionRaw);
            const user = await User.findById(userId);

            const newAccess = tokenService.generateUserAccessToken(
              user,
              session.sid
            );

            res.cookie("access_token", newAccess, {
              ...cookieOptions,
              maxAge: ACCESS_TTL * 1000,
            });

            decoded = tokenService.verifyUserAccess(newAccess);
            isSeller = false;
          }
        } catch (_) {}
      }

      if (!decoded)
        return next(new ErrorHandler("Invalid or expired token", 401));
    }

    // ============================================================
    // 3️⃣ Load model (SELLER or USER depending on token)
    // ============================================================
    if (isSeller) {
      const seller = await Seller.findById(decoded.id);
      if (!seller) return next(new ErrorHandler("Seller not found", 404));

      const sessionRaw = await redis.get(`seller_session:${seller._id}`);
      if (!sessionRaw)
        return next(new ErrorHandler("Seller session expired", 401));

      const session = JSON.parse(sessionRaw);
      if (session.sid !== decoded.sid)
        return next(new ErrorHandler("Invalid seller session", 401));

      req.seller = seller;
      return next();
    }

    // Load USER
    const user = await User.findById(decoded.id);
    if (!user) return next(new ErrorHandler("User not found", 404));

    const sessionRaw = await redis.get(`session:${user._id}`);
    if (!sessionRaw) return next(new ErrorHandler("Session expired", 401));

    const session = JSON.parse(sessionRaw);
    if (session.sid !== decoded.sid)
      return next(new ErrorHandler("Invalid session", 401));

    req.user = user;
    next();
  } catch (err) {
    console.error("Protect middleware error:", err);
    return next(new ErrorHandler("Authentication failed", 401));
  }
};

// =================================
// ROLE GUARDS
// =================================
const sellerAuthorize = () => {
  return (req, res, next) => {
    if (!req.seller)
      return next(new ErrorHandler("Not authenticated as seller", 401));

    next();
  };
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return next(new ErrorHandler("Not authenticated", 401));

    const userRoles = req.user.role || [];
    const allowed = roles.some((role) => userRoles.includes(role));

    if (!allowed)
      return next(
        new ErrorHandler("Access denied: insufficient permission", 403)
      );

    next();
  };
};

module.exports = {
  protect,
  authorize,
  sellerAuthorize,
  adminOnly: authorize("Admin"),
  superAdminOnly: authorize("SuperAdmin"),
};
