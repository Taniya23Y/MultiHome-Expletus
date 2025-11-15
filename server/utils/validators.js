module.exports = {
  validateRegistration(data) {
    if (!data.name || data.name.length < 2) return "Name is too short";
    if (!data.email) return "Email is required";
    if (!data.password || data.password.length < 6)
      return "Password min length 6";
    return null;
  },

  validateForgot(data) {
    if (!data.email) return "Email required";
    return null;
  },
};
