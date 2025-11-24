const redis = require("../config/redis");
const sendEmail = require("../utils/sendMail");

module.exports = {
  async sendOTP(email, name, type = "register") {
    let subject, template, data;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Only set OTP for register or forgot
    if (type === "register" || type === "forgot") {
      await redis.set(`otp:${email}`, otp, "EX", 300);
    }

    if (type === "register") {
      subject = "Verify Your MultiHome Account";
      template = "activate-mail.ejs";
      data = {
        user: { name },
        activationCode: otp,
        logoUrl:
          "https://res.cloudinary.com/dpywefxsq/image/upload/v1740090498/multihome-logo_eswwo0.png",
        heroImageUrl:
          "https://github.com/Taniya23Y/MultiHome-Expletus/blob/main/client/src/assets/images/bg.png",
      };
    } else if (type === "forgot") {
      subject = "Reset Your MultiHome Password";
      template = "forgot-password.ejs";
      data = {
        user: { name },
        otp,
        resetUrl: `${process.env.FRONTEND_URL}/reset-password/${otp}`,
        email,
        logoUrl:
          "https://res.cloudinary.com/dpywefxsq/image/upload/v1740090498/multihome-logo_eswwo0.png",
        heroImageUrl:
          "https://github.com/Taniya23Y/MultiHome-Expletus/blob/main/client/src/assets/images/bg.png",
      };
    } else if (type === "welcome") {
      // Welcome email AFTER login
      subject = "Welcome Back to MultiHome!";
      template = "welcome-mail.ejs";
      data = {
        user: { name },
        dashboardUrl: `${process.env.FRONTEND_URL}/dashboard`,
        logoUrl:
          "https://res.cloudinary.com/dpywefxsq/image/upload/v1740090498/multihome-logo_eswwo0.png",
        heroImageUrl:
          "https://github.com/Taniya23Y/MultiHome-Expletus/blob/main/client/src/assets/images/bg.png",
      };
    } else {
      throw new Error("Invalid email type");
    }

    await sendEmail({
      email,
      subject,
      template,
      data,
    });

    return otp;
  },

  // New function: send welcome email directly
  async sendWelcomeEmail(email, name) {
    return this.sendOTP(email, name, "welcome");
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
      await redis.expire(key, 60);
    }

    if (count > 5) {
      return false;
    }

    return true;
  },
};
