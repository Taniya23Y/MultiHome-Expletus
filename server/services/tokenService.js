const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken(user) {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "15m" }
    );
  },

  generateRefreshToken(user) {
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "7d",
    });
  },








  

  verifyRefresh(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
  },
};
