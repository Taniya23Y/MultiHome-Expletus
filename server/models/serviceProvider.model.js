const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema(
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

    categories: [
      {
        type: String,
        enum: [
          "electrician",
          "plumber",
          "carpenter",
          "painter",
          "cleaning",
          "pest-control",
          "ac-repair",
          "home-appliance",
          "moving-shifting",
          "construction",
          "interior-designer",
          "other",
        ],
      },
    ],

    experienceYears: { type: Number, default: 0 },

    skills: [String],

    hourlyRate: Number,
    dailyRate: Number,

    bio: { type: String, trim: true },

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

    kyc: {
      aadhaar: String,
      pan: String,
      documents: [String],
      verified: { type: Boolean, default: false },
    },

    servicesOffered: [
      {
        title: String,
        description: String,
        pricing: Number,
        durationInMinutes: Number,
        images: [String],
        createdAt: { type: Date, default: Date.now },
      },
    ],

    availability: {
      mon: [{ start: String, end: String }],
      tue: [{ start: String, end: String }],
      wed: [{ start: String, end: String }],
      thu: [{ start: String, end: String }],
      fri: [{ start: String, end: String }],
      sat: [{ start: String, end: String }],
      sun: [{ start: String, end: String }],
    },

    serviceHistory: [
      {
        bookingId: { type: Schema.Types.ObjectId, ref: "ServiceBooking" },
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        serviceId: Schema.Types.ObjectId,
        date: Date,
        status: {
          type: String,
          enum: ["completed", "cancelled", "pending"],
          default: "completed",
        },
        amount: Number,
      },
    ],

    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    averageRating: { type: Number, default: 0 },

    notifications: {
      newBookings: { type: Boolean, default: true },
      paymentUpdates: { type: Boolean, default: true },
      systemAlerts: { type: Boolean, default: true },
    },

    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ServiceProvider = mongoose.model(
  "ServiceProvider",
  serviceProviderSchema
);
module.exports = ServiceProvider;
