const redis = require("../config/redis");
const twilio = require("twilio");

// Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

module.exports = {
  async sendPhoneOTP(phone) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save to Redis for 5 mins
    await redis.set(`phoneOtp:${phone}`, otp, "EX", 300);

    // Send SMS
    await client.messages.create({
      body: `Your MultiHome verification code is ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: phone,
    });

    return otp;
  },

  async verifyPhoneOTP(phone, otp) {
    const stored = await redis.get(`phoneOtp:${phone}`);
    if (!stored) return false;

    if (stored !== otp.toString()) return false;

    await redis.del(`phoneOtp:${phone}`);
    return true;
  },

  async checkOtpRequests(phone) {
    const key = `phone-otp-req:${phone}`;
    const count = await redis.incr(key);

    if (count === 1) await redis.expire(key, 60);
    if (count > 5) return false;

    return true;
  },
};
