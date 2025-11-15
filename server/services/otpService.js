const redis = require("../config/redis");
const crypto = require("crypto");

module.exports = {
  async sendOTP(email) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await redis.set(`otp:${email}`, otp, "EX", 300); // 5 minutes

    return otp;
  },

  async verifyOTP(email, otp) {
    const storedOtp = await redis.get(`otp:${email}`);
    if (!storedOtp) return false;

    if (storedOtp !== otp) return false;

    await redis.del(`otp:${email}`);
    return true;
  },

  async checkOtpRequests(email) {
    const key = `otp-req:${email}`;
    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, 60); // 1 min
    }

    if (count > 5) {
      return false;
    }

    return true;
  },
};
