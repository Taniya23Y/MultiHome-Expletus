const express = require("express");
const {
  getAllProperties,
  getPropertyById,
  addProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const router = express.Router();

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.post("/", addProperty);
router.put("/:id", updateProperty);
router.delete("/:id", deleteProperty);

module.exports = router;
