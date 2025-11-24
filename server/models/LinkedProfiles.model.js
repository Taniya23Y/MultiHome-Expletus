const mongoose = require("mongoose");

const linkedProfilesSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      default: null,
    },

    serviceProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LinkedProfiles", linkedProfilesSchema);
