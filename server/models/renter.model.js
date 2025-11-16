const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const renterSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    name: { type: String, required: true, trim: true },

    email: { type: String, lowercase: true, trim: true },

    phone: {
      type: String,
      match: /^[0-9]{10}$/,
      trim: true,
    },

    profilePic: String,

    savedRentals: [
      {
        listingId: { type: Schema.Types.ObjectId, ref: "RentalProperty" },
        savedAt: { type: Date, default: Date.now },
      },
    ],

    recentlyViewed: [
      {
        listingId: { type: Schema.Types.ObjectId, ref: "RentalProperty" },
        viewedAt: { type: Date, default: Date.now },
      },
    ],

    preferences: {
      rentMin: Number,
      rentMax: Number,
      furnishing: {
        type: String,
        enum: ["furnished", "semi-furnished", "unfurnished"],
      },
      propertyType: { type: [String] },
      city: String,
      bedrooms: Number,
      bathrooms: Number,
      amenities: [String],
      allowPets: { type: Boolean, default: false },
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
        coordinates: { type: [Number], default: [0, 0] }, // lng, lat
      },
    },

    // Rental History
    rentalHistory: [
      {
        propertyId: { type: Schema.Types.ObjectId, ref: "RentalProperty" },
        startDate: Date,
        endDate: Date,
        ownerId: { type: Schema.Types.ObjectId, ref: "User" },
        rentPaid: Number,
        status: { type: String, enum: ["completed", "ongoing", "terminated"] },
      },
    ],

    visitRequests: [
      {
        propertyId: { type: Schema.Types.ObjectId, ref: "RentalProperty" },
        scheduledDate: Date,
        status: {
          type: String,
          enum: ["pending", "confirmed", "rejected", "completed"],
          default: "pending",
        },
        ownerId: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],

    kyc: {
      aadhaar: String,
      pan: String,
      documents: [String],
      verified: { type: Boolean, default: false },
    },

    isVerified: { type: Boolean, default: false },

    notifications: {
      rentalAlerts: { type: Boolean, default: true },
      priceDropAlerts: { type: Boolean, default: true },
      ownerMessages: { type: Boolean, default: true },
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Renter = mongoose.model("Renter", renterSchema);
module.exports = Renter;
