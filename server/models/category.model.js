const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required!"],
      unique: true,
      trim: true,
      minLength: [3, "Category name must be atleast 3 characters"],
      maxLength: [50, "Category name cannot exceed 50 characters"],
    },
    type: {
      type: String,
      enum: [
        "Residential",
        "Commercial",
        "Industrial",
        "PG/Hostel",
        "Office Space",
        "Other",
      ],
      required: [true, "Category type is required"],
      default: "Residential",
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    icon: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
