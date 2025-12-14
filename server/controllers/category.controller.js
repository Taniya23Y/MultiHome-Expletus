const Category = require("../models/category.model");
const ErrorHandler = require("../utils/ErrorHandler");
const slugify = require("slugify");

exports.createCategory = async (req, res, next) => {
  try {
    const { name, type, description, icon } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) return next(new ErrorHandler("Category already exists", 400));

    const category = await Category.create({
      name,
      type,
      description,
      icon,
      slug: slugify(name, { lower: true }),
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true });
    res
      .status(200)
      .json({ success: true, count: categories.length, categories });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(new ErrorHandler("Category not found", 404));
    res.status(200).json({ success: true, category });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return next(new ErrorHandler("Category not found", 404));

    res
      .status(200)
      .json({ success: true, message: "Category updated", category: updated });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new ErrorHandler("Category not found", 404));

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    next(new ErrorHandler(err.message, 500));
  }
};
