const sendEmail = require("../utils/sendMail");

module.exports = {
  async sendWelcomeEmail(email, name) {
    const subject = "Welcome Back to MultiHome!";
    const template = "welcome-mail.ejs";

    const data = {
      user: { name },
      dashboardUrl: `${process.env.FRONTEND_URL}/dashboard`,
      logoUrl:
        "https://res.cloudinary.com/dpywefxsq/image/upload/v1740090498/multihome-logo_eswwo0.png",
      heroImageUrl:
        "https://github.com/Taniya23Y/MultiHome-Expletus/blob/main/client/src/assets/images/bg.png",
    };

    await sendEmail({ email, subject, template, data });
  },
};
