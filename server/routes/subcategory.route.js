const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategory.controller");
const {
  protect,
  adminOnly,
  superAdminOnly,
} = require("../middleware/auth.middleware");

router.post(
  "/create-subcategory",
  protect,
  adminOnly,
  subcategoryController.createSubcategory
);
router.get("/subcategories", subcategoryController.getSubcategories);
router.get(
  "/subcategory/:id",
  protect,
  adminOnly,
  subcategoryController.getSubcategoryById
);
router.put(
  "/subcategory/:id",
  protect,
  adminOnly,
  subcategoryController.updateSubcategory
);
router.get(
  "/category/:categoryId",
  subcategoryController.getSubcategoriesByCategory
);

router.delete(
  "/subcategory/:id",
  protect,
  adminOnly,
  subcategoryController.deleteSubcategory
);

module.exports = router;
