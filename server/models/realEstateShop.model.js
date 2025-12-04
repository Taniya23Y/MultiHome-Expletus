const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const realEstateShopSchema = new Schema(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      unique: true,
    },

    name: { type: String, required: true },
    bio: { type: String },
    category: { type: [String] },

    avatar: { type: String },
    coverBanner: { type: String },

    address: { type: String },
    opening_hours: {
      open: String,
      close: String,
      days: [String],
    },

    website: { type: String },
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
    },

    ratings: { type: Number, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: "RealEstateReview" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("RealEstateShop", realEstateShopSchema);
