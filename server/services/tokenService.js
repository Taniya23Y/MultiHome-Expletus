const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken(user, sid) {
    return jwt.sign(
      { id: user._id, role: user.role, sid },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
  },

  generateRefreshToken(user, sid) {
    return jwt.sign({ id: user._id, sid }, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "7d",
    });
  },

  verifyRefresh(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
  },

  verifyAccess(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  },
};
