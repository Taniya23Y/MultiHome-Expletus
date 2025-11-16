const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buyerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    name: { type: String, required: true, trim: true },

    email: { type: String, trim: true, lowercase: true },

    phone: {
      type: String,
      match: /^[0-9]{10}$/,
      trim: true,
    },

    profilePic: String,

    // --- Buyer Specific Fields ---
    savedProperties: [
      {
        listingId: { type: Schema.Types.ObjectId, ref: "Listing" },
        savedAt: { type: Date, default: Date.now },
      },
    ],

    recentlyViewed: [
      {
        listingId: { type: Schema.Types.ObjectId, ref: "Listing" },
        viewedAt: { type: Date, default: Date.now },
      },
    ],

    preferences: {
      budgetMin: Number,
      budgetMax: Number,
      propertyType: { type: [String] },
      city: String,
      bedrooms: Number,
      bathrooms: Number,
      amenities: [String],
    },

    address: {
      houseNo: String,
      street: String,
      area: String,
      city: String,
      state: String,
      pincode: String,
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], default: [0, 0] },
      },
    },

    isVerified: { type: Boolean, default: false },

    kyc: {
      aadhaar: String,
      pan: String,
      documents: [String],
      verified: { type: Boolean, default: false },
    },

    preferredContact: {
      type: String,
      enum: ["email", "phone", "both"],
      default: "phone",
    },

    notifications: {
      propertyAlerts: { type: Boolean, default: true },
      priceDropAlerts: { type: Boolean, default: true },
      sellerMessages: { type: Boolean, default: true },
    },

    visitRequests: [
      {
        listingId: { type: Schema.Types.ObjectId, ref: "Listing" },
        scheduledDate: Date,
        status: {
          type: String,
          enum: ["pending", "confirmed", "rejected", "completed"],
          default: "pending",
        },
      },
    ],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Buyer = mongoose.model("Buyer", buyerSchema);
module.exports = Buyer;
