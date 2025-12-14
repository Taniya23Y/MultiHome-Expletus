const mongoose = require("mongoose");
const slugify = require("slugify");

const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subcategory name is required"],
      trim: true,
      minlength: [2, "Subcategory name must be at least 2 characters long"],
    },

    slug: {
      type: String,
      index: true,
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
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

subcategorySchema.pre("save", async function (next) {
  if (this.isModified("category") || this.isNew) {
    const Category = mongoose.model("Category");
    const parentCategory = await Category.findById(this.category);

    if (parentCategory) {
      this.type = parentCategory.type;
    }
  }

  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }

  next();
});

subcategorySchema.index({ name: 1, category: 1 }, { unique: true });

module.exports = mongoose.model("Subcategory", subcategorySchema);
