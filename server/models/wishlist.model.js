import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    note: {
      type: String,
      trim: true,
      maxlength: [200, "Note cannot exceed 200 characters"],
    },
    category: {
      type: String,
      enum: [
        "Residential",
        "Commercial",
        "Industrial",
        "Land",
        "PG/Hostel",
        "Office Space",
        "Other",
      ],
    },
    tags: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "addedAt", updatedAt: true } }
);

// Prevent duplicate wishlist entry for same user & property
wishlistSchema.index({ userId: 1, propertyId: 1 }, { unique: true });

// Cascade cleanup when property gets deleted
wishlistSchema.pre("save", async function (next) {
  const Property = mongoose.model("Property");
  const propertyExists = await Property.exists({ _id: this.propertyId });
  if (!propertyExists) throw new Error("Referenced property does not exist");
  next();
});

// Auto-remove wishlist items when property is deleted
wishlistSchema.pre("remove", async function (next) {
  const Property = mongoose.model("Property");
  await Property.updateOne(
    { _id: this.propertyId },
    { $pull: { wishlistedBy: this.userId } }
  );
  next();
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
