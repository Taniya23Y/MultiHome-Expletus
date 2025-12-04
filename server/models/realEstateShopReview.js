const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const realEstateShopReviewSchema = new Schema(
  {
    shop: {
      type: Schema.Types.ObjectId,
      ref: "RealEstateShop",
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    images: [
      {
        type: String,
      },
    ],

    likes: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "approved",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "RealEstateShopReview",
  realEstateShopReviewSchema
);
