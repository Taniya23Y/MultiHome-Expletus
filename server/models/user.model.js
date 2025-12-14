const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
      minLength: [2, "name must be "],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email!"],
      validate: {
        validator: function (value) {
          return emailRegexPattern.test(value);
        },
        message: "please enter a valid email",
      },
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password!"],
      minlength: [6, "Password must be at least 6 characters"],
      trim: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Phone must be 10 digits"],
      unique: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["admin", "super-admin", "user"],
      default: "user",
      index: true,
    },

    isBuyer: { type: Boolean, default: true },
    isRenter: { type: Boolean, default: false },

    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    profilePic: String,

    lastLogin: Date,
  },
  { timestamps: true }
);

// Hash Password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// compare password
userSchema.methods.comparePassword = function (enteredPass) {
  return bcrypt.compare(enteredPass, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
