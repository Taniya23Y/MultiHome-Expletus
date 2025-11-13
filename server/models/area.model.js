import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Area name is required"],
      trim: true,
      minlength: [2, "Area name must be at least 2 characters long"],
      maxlength: [100, "Area name cannot exceed 100 characters"],
      unique: true,
    },
    city: {
      type: String,
      required: true,
      default: "Indore",
    },
    state: {
      type: String,
      default: "Madhya Pradesh",
    },
    country: {
      type: String,
      default: "India",
    },
    pincode: {
      type: String,
      match: [/^\d{6}$/, "Invalid Pincode"],
    },
    coordinates: {
      lat: {
        type: Number,
        required: [true, "Latitude is required"],
        min: -90,
        max: 90,
      },
      lng: {
        type: Number,
        required: [true, "Longitude is required"],
        min: -180,
        max: 180,
      },
    },
    mapBoundary: [
      {
        lat: { type: Number },
        lng: { type: Number },
      },
    ],
    averagePricePerSqFt: {
      type: Number,
      min: 0,
      default: 0,
    },
    nearbyLandmarks: [String],
    areaType: {
      type: String,
      enum: [
        "Residential",
        "Commercial",
        "Mixed-Use",
        "Industrial",
        "Institutional",
      ],
      default: "Residential",
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Indexing for location-based searches
areaSchema.index({ "coordinates.lat": 1, "coordinates.lng": 1 });
areaSchema.index({ name: "text", city: "text", state: "text" });

const Area = mongoose.model("Area", areaSchema);
export default Area;
