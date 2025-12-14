const express = require("express");
const router = express.Router();
const { protect, sellerAuthorize } = require("../middleware/auth.middleware");
const propertyController = require("../controllers/property.controller");
const uploadMiddleware = require("../middleware/upload.middleware");
const Property = require("../models/property.model");

router.post(
  "/create-property",
  protect,
  sellerAuthorize(),
  uploadMiddleware.fields([
    { name: "images", maxCount: 10 },
    { name: "floorPlan", maxCount: 1 },
  ]),
  propertyController.createProperty
);

router.get("/all-properties", propertyController.getAllPublicProperties);

router.put(
  "/:id",
  protect,
  sellerAuthorize(),
  propertyController.updateProperty
);
router.delete(
  "/:id",
  protect,
  sellerAuthorize(),
  propertyController.deleteProperty
);
router.get(
  "/my-properties",
  protect,
  sellerAuthorize(),
  propertyController.getMyProperties
);
router.post(
  "/:id/upload-images",
  protect,
  sellerAuthorize(),
  uploadMiddleware.array("images", 10),
  propertyController.uploadPropertyImages
);
router.post(
  "/:id/floorplan-images",
  protect,
  sellerAuthorize(),
  uploadMiddleware.array("images", 10),
  propertyController.uploadPropertyImages
);
router.patch(
  "/:id/status",
  protect,
  sellerAuthorize(),
  propertyController.setAvailability
);

router.get("/enums", (req, res) => {
  const enums = {
    locality: Property.schema.path("location.locality").enumValues,
    propertyType: Property.schema.path("propertyType").enumValues,
    furnished: Property.schema.path("furnished").enumValues,
    facing: Property.schema.path("facing").enumValues,
    parking: Property.schema.path("parking").enumValues,
    waterSupply: Property.schema.path("waterSupply").enumValues,
    flooringType: Property.schema.path("flooringType").enumValues,
    ownershipType: Property.schema.path("ownershipType").enumValues,
    preferredTenants: Property.schema.path("preferredTenants").enumValues,
    status: Property.schema.path("status").enumValues,
  };
  res.json(enums);
});
router.get("/:id", propertyController.getPropertyById);

module.exports = router;
