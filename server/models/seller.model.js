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
    profilePic: String,

    address: { type: String, required: true },
    city: String,
    state: String,
    country: String,
    pincode: String,

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    isVerified: { type: Boolean, default: false },
    documents: [String],
    gstNumber: String,

    totalListings: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    ratings: { type: Number, default: 0 },
    reviews: [
      {
        userId: Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        date: Date,
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
