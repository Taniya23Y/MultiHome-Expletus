import mongoose from "mongoose";

const helperServiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
      enum: [
        "Electrician",
        "Plumber",
        "Carpenter",
        "Painter",
        "Cleaner",
        "Pest Control",
        "Packers & Movers",
        "Gardener",
        "AC Mechanic",
        "Other",
      ],
    },
    description: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    availability: {
      days: [{ type: String }],
      time: { type: String },
    },
    location: {
      city: { type: String, required: true },
      area: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    pricePerVisit: {
      type: Number,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    documents: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Cascade delete if helper user is deleted
helperServiceSchema.pre("remove", async function (next) {
  console.log(`Helper service of user ${this.userId} removed.`);
  next();
});

export default mongoose.model("HelperService", helperServiceSchema);
