const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

router.post(
  "/create-category",
  protect,
  adminOnly,
  categoryController.createCategory
);

router.get("/categories", categoryController.getCategories);

router.get("/category/:id", categoryController.getCategoryById);

router.put(
  "/category/:id",
  protect,
  adminOnly,
  categoryController.updateCategory
);

router.delete(
  "/category/:id",
  protect,
  adminOnly,
  categoryController.deleteCategory
);

module.exports = router;
