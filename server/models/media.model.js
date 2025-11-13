const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property reference is required"],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Uploader reference is required"],
    },
    type: {
      type: String,
      enum: ["image", "video", "floorplan", "document"],
      required: [true, "Media type is required"],
    },
    url: {
      type: String,
      required: [true, "Media URL is required"],
      trim: true,
    },
    caption: {
      type: String,
      trim: true,
      maxlength: [200, "Caption cannot exceed 200 characters"],
    },
    publicId: {
      type: String,
      trim: true,
      default: null, // Useful for Cloudinary or S3
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },
    metadata: {
      resolution: { type: String, trim: true },
      duration: { type: Number, default: 0 },
      size: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// Auto delete all related media when a property is removed
// cascading concept
propertySchema.pre("remove", async function (next) {
  try {
    const Media = mongoose.model("Media");
    const deletedMedia = await Media.deleteMany({ property: this._id });

    console.log(
      `🧹 Cascade delete: ${deletedMedia.deletedCount} media removed for property ${this._id}`
    );

    next();
  } catch (error) {
    console.error("Error in cascade media delete:", error);
    next(error);
  }
});

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;
