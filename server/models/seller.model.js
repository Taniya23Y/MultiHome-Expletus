const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Unique seller public ID (like shopId)
    sellerCode: { type: String, unique: true },

    // Referral System
    referralCode: { type: String, unique: true },
    referredBy: { type: Schema.Types.ObjectId, ref: "User" },

    totalCommissionEarned: { type: Number, default: 0 },
    commissionHistory: [
      {
        propertyId: { type: Schema.Types.ObjectId, ref: "Property" },
        amount: Number,
        date: { type: Date, default: Date.now },
      },
    ],

    name: { type: String, required: true, trim: true },
    businessName: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Phone must be 10 digits"],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password!"],
      minlength: [6, "Password must be at least 6 characters"],
      trim: true,
      select: false,
    },
    role: { type: String, default: "seller" },
    profilePic: String,

    country: { type: String, default: "India" },
    state: { type: String, default: "Madhya Pradesh" },
    city: { type: String, default: "Indore" },
    area: { type: String, required: true },
    address: { type: String },
    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, "Pincode must be 6 digits"],
      required: true,
    },

    isVerified: { type: Boolean, default: false },
    documents: [String],

    shop: {
      type: Schema.Types.ObjectId,
      ref: "RealEstateShop",
      default: null,
    },
    onboardingStep: {
      type: Number,
      default: 1,
    },
    ratings: { type: Number, default: 0 },
    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],

    totalListings: { type: Number, default: 0 },
    properties: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    totalConfirmedDeals: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },

    notifications: [
      {
        title: String,
        message: String,
        seen: { type: Boolean, default: false },
        date: { type: Date, default: Date.now },
      },
    ],

    isActive: { type: Boolean, default: true },

    razorpayCustomerId: { type: String },
    razorpayAccountId: { type: String },
    isRazorpayVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
