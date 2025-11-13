const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter Your Name!"],
    trim: true,
    minLength: [2, "name must be "],
  },
  email: {
    type: String,
    require: [true, "Please Enter Your Email!"],
    trim: true,
  },
  password: {
    type: String,
    require: [true, "Please Enter Your Password!"],
    trim: true,
  },
  role: {
    type: String,
    // enum: ["admin", "user", "seller", "renter", "helper", "multiOwner"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
