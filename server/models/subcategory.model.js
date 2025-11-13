const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subcategory name is required"],
      trim: true,
      minlength: [2, "Subcategory name must be at least 2 characters long"],
    },
    type: {
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
      required: [true, "Subcategory type is required"],
      default: "Residential",
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, "Description cannot exceed 300 characters"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Parent category is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// subcategory.type with parent category.type
subcategorySchema.pre("save", async function (next) {
  if (this.isModified("category") || this.isNew) {
    const Category = mongoose.model("Category");
    const parentCategory = await Category.findById(this.category);
    if (parentCategory) {
      this.type = parentCategory.type;
    }
  }
  next();
});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);
module.exports = Subcategory;
