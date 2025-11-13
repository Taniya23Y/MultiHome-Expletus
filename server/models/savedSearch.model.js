import mongoose from "mongoose";

const savedSearchSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    searchName: {
      type: String,
      required: [true, "Search name is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    filters: {
      type: Object,
      default: {},
    },
    propertyType: [
      {
        type: String,
        enum: ["Flat", "House", "Villa", "Apartment", "Plot", "Office", "PG"],
      },
    ],
    minPrice: { type: Number, min: 0 },
    maxPrice: { type: Number, min: 0 },
    locality: [String],
    furnished: [
      {
        type: String,
        enum: ["Unfurnished", "Semi-Furnished", "Fully-Furnished"],
      },
    ],
    preferredTenants: {
      type: String,
      enum: ["Family", "Bachelor", "Both"],
    },
    alertsEnabled: {
      type: Boolean,
      default: true,
    },
    lastNotificationAt: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Optional: Disable alerts if user deactivates saved search
savedSearchSchema.pre("save", function (next) {
  if (!this.isActive) this.alertsEnabled = false;
  next();
});

const SavedSearch = mongoose.model("SavedSearch", savedSearchSchema);
export default SavedSearch;
