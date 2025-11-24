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

    name: { type: String, required: true, trim: true },
    businessName: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, match: /^[0-9]{10}$/ },
    role: { type: String, default: "seller" },
    profilePic: String,

    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, default: "India", trim: true },
    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, "Pincode must be 6 digits"],
      required: true,
    },

    gstNumber: {
      type: String,
      trim: true,
      sparse: true,
      match: [/^[0-9A-Z]{15}$/, "Invalid GST number"],
    },

    isVerified: { type: Boolean, default: false },
    documents: [String],

    totalListings: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },

    ratings: { type: Number, default: 0 },
    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now },
      },
    ],

    isActive: { type: Boolean, default: true },

    paymentMethods: [{ type: String }],
    notificationPreferences: { type: Map, of: Boolean },
  },
  { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
