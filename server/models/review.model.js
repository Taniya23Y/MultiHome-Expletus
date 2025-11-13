const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property reference is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Reviewer (user) reference is required"],
    },
    reviewedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Minimum rating is 1"],
      max: [5, "Maximum rating is 5"],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [1000, "Review cannot exceed 1000 characters"],
    },
    images: [
      {
        type: String, // Image URLs
        trim: true,
      },
    ],
    verifiedStay: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
