const jwt = require("jsonwebtoken");

module.exports = {
  // -------- USER TOKENS -------- //
  generateUserAccessToken(user, sid) {
    return jwt.sign(
      { id: user._id, role: "user", sid },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
  },

  generateUserRefreshToken(user, sid) {
    return jwt.sign(
      { id: user._id, role: "user", sid },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );
  },

  // -------- SELLER TOKENS -------- //
  generateSellerAccessToken(seller, sid) {
    return jwt.sign(
      { id: seller._id, role: "seller", sid },
      process.env.JWT_SELLER_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
  },

  generateSellerRefreshToken(seller, sid) {
    return jwt.sign(
      { id: seller._id, role: "seller", sid },
      process.env.JWT_SELLER_REFRESH_TOKEN,
      { expiresIn: "7d" }
    );
  },

  // -------- VERIFY TOKENS -------- //
  verifyUserAccess(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  },

  verifySellerAccess(token) {
    return jwt.verify(token, process.env.JWT_SELLER_ACCESS_TOKEN);
  },

  verifyUserRefresh(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
  },

  verifySellerRefresh(token) {
    return jwt.verify(token, process.env.JWT_SELLER_REFRESH_TOKEN);
  },
};
