const Subcategory = require("../models/subcategory.model");
const Category = require("../models/category.model");
const ErrorHandler = require("../utils/ErrorHandler");

// Create a new subcategory
exports.createSubcategory = async (req, res, next) => {
  try {
    const { name, category, description } = req.body;

    const parentCategory = await Category.findById(category);
    if (!parentCategory)
      return next(new ErrorHandler("Invalid parent category", 400));

    const existing = await Subcategory.findOne({ name, category });
    if (existing)
      return next(new ErrorHandler("Subcategory already exists", 400));

    const subcategory = await Subcategory.create({
      name,
      category,
      type: parentCategory.type,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Subcategory created successfully",
      subcategory,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

// Get all subcategories
exports.getSubcategories = async (req, res, next) => {
  try {
    const subcategories = await Subcategory.find({ isActive: true }).populate(
      "category"
    );
    res
      .status(200)
      .json({ success: true, count: subcategories.length, subcategories });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

// Get subcategory by ID
exports.getSubcategoryById = async (req, res, next) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate(
      "category"
    );
    if (!subcategory)
      return next(new ErrorHandler("Subcategory not found", 404));
    res.status(200).json({ success: true, subcategory });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

// Update subcategory
exports.updateSubcategory = async (req, res, next) => {
  try {
    if (req.body.category) {
      const parentCategory = await Category.findById(req.body.category);
      if (!parentCategory)
        return next(new ErrorHandler("Invalid parent category", 400));
      req.body.type = parentCategory.type;
    }

    const updated = await Subcategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated) return next(new ErrorHandler("Subcategory not found", 404));

    res.status(200).json({
      success: true,
      message: "Subcategory updated",
      subcategory: updated,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

// Get subcategories by category
exports.getSubcategoriesByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params; // categoryId passed as URL param

    const category = await Category.findById(categoryId);
    if (!category) return next(new ErrorHandler("Category not found", 404));

    const subcategories = await Subcategory.find({
      category: categoryId,
      isActive: true,
    });

    res.status(200).json({
      success: true,
      count: subcategories.length,
      subcategories,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

// Delete subcategory
exports.deleteSubcategory = async (req, res, next) => {
  try {
    const deleted = await Subcategory.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new ErrorHandler("Subcategory not found", 404));

    res
      .status(200)
      .json({ success: true, message: "Subcategory deleted successfully" });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};
