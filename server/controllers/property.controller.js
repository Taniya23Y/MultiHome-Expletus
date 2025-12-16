const Property = require("../models/property.model");
const Category = require("../models/category.model");
const Subcategory = require("../models/subcategory.model");
const errorHandler = require("../utils/ErrorHandler");
const slugify = require("slugify");

exports.createProperty = async (req, res, next) => {
  try {
    const seller = req.seller;
    if (!seller)
      return next(new errorHandler("Seller authentication required", 401));

    const {
      title,
      description,
      price,
      discountPrice,
      maintenanceFee,
      securityDeposit,
      location,
      bedrooms,
      bathrooms,
      balconies,
      areaSqFt,
      carpetArea,
      propertyType,
      furnished,
      facing,
      floorNumber,
      totalFloors,
      builtYear,
      societyName,
      parking,
      liftAvailable,
      securityAvailable,
      electricityBackup,
      waterSupply,
      flooringType,
      images,
      videos,
      floorPlan,
      ownershipType,
      category,
      subcategory,
      tags,
      availableFrom,
      preferredTenants,
      brokerAllowed,
      monthlyMaintenanceIncluded,
      facingRoadWidth,
      landAreaSqFt,
      utilityConnections,
    } = req.body;

    // Validate category
    const categoryData = await Category.findById(category);
    if (!categoryData)
      return next(new errorHandler("Invalid category selected", 400));

    // Validate subcategory (if sent)
    if (subcategory) {
      const sub = await Subcategory.findById(subcategory);
      if (!sub)
        return next(new errorHandler("Invalid subcategory selected", 400));

      if (sub.category.toString() !== category.toString()) {
        return next(
          new errorHandler("Subcategory doesn't belong to category", 400)
        );
      }
    }

    // Slug
    const slug = slugify(`${title}-${Date.now()}`, { lower: true });

    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      uploadedImages = req.files.map((file) => ({
        url: file.path,
        caption: "",
      }));
    }

    let floorPlanUrl = "";
    if (req.files?.floorPlan) {
      floorPlanUrl = req.files.floorPlan[0].path;
    }

    // --- FINAL PROPERTY CREATE ---
    const property = await Property.create({
      // Seller info
      sellerId: seller._id,
      sellerCode: seller.sellerCode,
      owner: seller._id,

      // Basic property fields
      title,
      description,
      price,
      discountPrice,
      maintenanceFee,
      securityDeposit,

      // Location (property's own)
      location,

      // Property details
      bedrooms,
      bathrooms,
      balconies,
      areaSqFt,
      carpetArea,
      propertyType,
      furnished,
      facing,
      floorNumber,
      totalFloors,
      builtYear,
      societyName,
      parking,
      liftAvailable,
      securityAvailable,
      electricityBackup,
      waterSupply,
      flooringType,

      // Media
      images: uploadedImages,
      videos,
      floorPlan: floorPlanUrl,

      // Ownership
      ownershipType,

      // Categories
      category,
      subcategory,

      // Slug
      slug,
      tags,
      availableFrom,
      preferredTenants,
      brokerAllowed,
      monthlyMaintenanceIncluded,

      facingRoadWidth,
      landAreaSqFt,
      utilityConnections,
    });

    seller.properties.push(property._id);
    seller.totalListings = seller.properties.length;
    await seller.save();

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property,
    });
  } catch (err) {
    console.log("Error creating property:", err);
    next(new errorHandler(err.message, 500));
  }
};

// exports.updateProperty = async (req, res, next) => {
//   try {
//     const seller = req.seller;
//     const data = req.body;

//     const prop = await Property.findOne({
//       _id: req.params.id,
//       sellerId: seller._id,
//     });

//     if (!prop)
//       return next(new errorHandler("Property not found or unauthorized", 404));

//     // Ensure discountPrice < price when updating
//     if (data.discountPrice && data.price) {
//       if (data.discountPrice >= data.price) {
//         return next(
//           new errorHandler(
//             "Discount price must be less than the actual price",
//             400
//           )
//         );
//       }
//     }

//     // If discountPrice is sent but price is not sent
//     if (data.discountPrice && !data.price) {
//       const existing = await Property.findById(req.params.id);
//       if (data.discountPrice >= existing.price) {
//         return next(
//           new errorHandler(
//             "Discount price must be less than the actual price",
//             400
//           )
//         );
//       }
//     }

//     // If category/subcategory is being updated — validate
//     if (req.body.category) {
//       const cat = await Category.findById(req.body.category);
//       if (!cat) return next(new errorHandler("Invalid category", 400));
//     }

//     if (req.body.subcategory) {
//       const sub = await Subcategory.findById(req.body.subcategory);
//       if (!sub) return next(new errorHandler("Invalid subcategory", 400));

//       if (req.body.category && sub.category.toString() !== req.body.category) {
//         return next(new errorHandler("Invalid subcategory for category", 400));
//       }
//     }

//     const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Property updated",
//       property: updated,
//     });
//   } catch (err) {
//     next(new errorHandler(err.message, 500));
//   }
// };

exports.updateProperty = async (req, res, next) => {
  try {
    const seller = req.seller;
    const propertyId = req.params.id;

    let updateData = { ...req.body };

    // -----------------------------
    // 1️⃣ Seller authentication check
    // -----------------------------
    const property = await Property.findOne({
      _id: propertyId,
      sellerId: seller._id,
    });

    if (!property) {
      return next(new errorHandler("Property not found or unauthorized", 404));
    }

    // -----------------------------
    // 2️⃣ Price + Discount Validation
    // -----------------------------
    if (updateData.price && updateData.discountPrice) {
      if (updateData.discountPrice >= updateData.price) {
        return next(
          new errorHandler(
            "Discount price must be less than the actual price",
            400
          )
        );
      }
    }

    if (updateData.discountPrice && !updateData.price) {
      if (updateData.discountPrice >= property.price) {
        return next(
          new errorHandler(
            "Discount price must be less than the existing price",
            400
          )
        );
      }
    }

    // -----------------------------
    // 3️⃣ Validate category & subcategory
    // -----------------------------
    if (updateData.category) {
      const category = await Category.findById(updateData.category);
      if (!category)
        return next(new errorHandler("Invalid category selected", 400));
    }

    if (updateData.subcategory) {
      const sub = await Subcategory.findById(updateData.subcategory);
      if (!sub)
        return next(new errorHandler("Invalid subcategory selected", 400));

      if (
        updateData.category &&
        sub.category.toString() !== updateData.category
      ) {
        return next(
          new errorHandler("Subcategory does not belong to the category", 400)
        );
      }
    }

    // -----------------------------
    // 4️⃣ Update slug when title changes
    // -----------------------------
    if (updateData.title) {
      updateData.slug = slugify(`${updateData.title}-${Date.now()}`, {
        lower: true,
      });
    }

    // ----------------------------------------
    // 5️⃣ Handle image uploads (multer + cloud)
    // ----------------------------------------
    if (req.files?.images) {
      const images = req.files.images.map((file) => ({
        url: file.path,
        caption: "",
      }));
      property.images.push(...images);
    }

    // ----------------------------------------
    // 6️⃣ Handle floor plan upload
    // ----------------------------------------
    if (req.files?.floorPlan) {
      updateData.floorPlan = req.files.floorPlan[0].path;
    }

    // ----------------------------------------
    // 7️⃣ Final Property Update
    // ----------------------------------------
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (err) {
    console.log("Update Property Error:", err);
    return next(new errorHandler(err.message, 500));
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    // const seller = req.seller;
    const seller = await Seller.findById(req.seller._id);

    const prop = await Property.findOne({
      _id: req.params.id,
      sellerId: seller._id,
    });

    if (!prop) return next(new errorHandler("Unauthorized or not found", 404));

    await prop.deleteOne();

    // seller.properties.pull(prop._id);
    seller.properties = seller.properties.filter(
      (p) => p.toString() !== prop._id.toString()
    );
    seller.totalListings = seller.properties.length;

    await seller.save();

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.getMyProperties = async (req, res, next) => {
  try {
    const seller = req.seller;

    const properties = await Property.find({ sellerId: seller._id })
      .populate("category subcategory")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.getPropertyById = async (req, res, next) => {
  try {
    const prop = await Property.findById(req.params.id).populate(
      "category subcategory sellerId owner"
    );

    if (!prop) return next(new errorHandler("Property not found", 404));

    // Count view
    prop.views += 1;
    await prop.save();

    res.status(200).json({ success: true, property: prop });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.uploadPropertyImages = async (req, res, next) => {
  try {
    const seller = req.seller;

    const property = await Property.findOne({
      _id: req.params.id,
      sellerId: seller._id,
    });

    if (!property)
      return next(new errorHandler("Unauthorized or property not found", 404));

    if (!req.files || req.files.length === 0)
      return next(new errorHandler("No images uploaded", 400));

    const uploadedImages = req.files.map((file) => ({
      url: file.path, // Cloudinary or local url
      caption: req.body.caption || "",
    }));

    property.images.push(...uploadedImages);

    await property.save();

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      images: property.images,
    });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.setAvailability = async (req, res, next) => {
  try {
    const seller = req.seller;
    const { status } = req.body;

    if (!["Available", "Booked", "Sold", "Rented"].includes(status)) {
      return next(new errorHandler("Invalid property status", 400));
    }

    const prop = await Property.findOne({
      _id: req.params.id,
      sellerId: seller._id,
    });

    if (!prop) return next(new errorHandler("Property not found", 404));

    prop.status = status;
    await prop.save();

    res.status(200).json({
      success: true,
      message: "Property status updated",
      property: prop,
    });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};

exports.getAllPublicProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({
      status: "Available",
      isActive: true,
      approvedByAdmin: true, // optional but recommended
    })
      .populate("category subcategory")
      .select(
        "title description price discountPrice location areaSqFt bedrooms bathrooms propertyType furnished images societyName parking"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (err) {
    next(new errorHandler(err.message, 500));
  }
};
