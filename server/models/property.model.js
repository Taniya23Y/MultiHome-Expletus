const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
      minLength: [50, "Title must be at least 50 characters long."],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1000, "Price must be greater than ₹1000"],
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: async function (v) {
          // Case 1: During UPDATE operations
          if (this instanceof mongoose.Query) {
            const update = this.getUpdate();

            // If price and discountPrice both are provided in update
            if (update.price && v !== undefined) {
              return v < update.price;
            }

            // If only discountPrice is being updated → fetch existing price
            const docToUpdate = await this.model
              .findOne(this.getQuery())
              .lean();
            if (!docToUpdate) return true;

            return v < docToUpdate.price;
          }

          // Case 2: During CREATE or SAVE
          return v < this.price;
        },
        message: "Discount price must be less than the actual price",
      },
    },

    maintenanceFee: { type: Number, min: 0, default: 0 },
    securityDeposit: { type: Number, min: 0, default: 0 },

    location: {
      address: { type: String, required: true, trim: true },
      locality: {
        type: String,
        required: true,
        enum: [
          "Vijay Nagar",
          "Vijay Nagar Extension",
          "Bhawarkua",
          "Palasia",
          "New Palasia",
          "LIG Square",
          "Rau",
          "MR-10",
          "MR-9",
          "Tilak Nagar",
          "Rajendra Nagar",
          "Silicon City",
          "Scheme 54",
          "Scheme 40",
          "Scheme 41",
          "Scheme 56",
          "Scheme 71",
          "Scheme 74",
          "Scheme 78",
          "Scheme 89",
          "Geeta Bhawan",
          "Navlakha",
          "Indrapuri",
          "Bhanwarkua Extension",
          "AB Road",
          "Nipania",
          "Mhow Road",
          "Dewas Naka",
          "Palasia Square",
          "Nauganj",
          "Vishnu Nagar",
          "Kesarbagh",
          "Rajiv Gandhi Nagar",
          "Chandan Nagar",
          "Kanadiya Road",
          "Shivaji Nagar",
          "Kalani Nagar",
          "Mangaliya",
          "Sukhliya",
          "Saket Nagar",
          "Scheme 25",
          "Scheme 33",
          "Scheme 45",
          "Scheme 46",
          "Scheme 54A",
          "Scheme 54B",
          "Scheme 62",
          "Scheme 64",
          "Other",
        ],
      },
      city: { type: String, default: "Indore" },
      state: { type: String, default: "Madhya Pradesh" },
      country: { type: String, default: "India" },
      pincode: { type: String, match: [/^\d{6}$/, "Invalid Pincode"] },
      coordinates: {
        lat: { type: Number, min: -90, max: 90 },
        lng: { type: Number, min: -180, max: 180 },
      },
    },

    bedrooms: { type: Number, required: true, min: 0, max: 20 },
    bathrooms: { type: Number, required: true, min: 1, max: 20 },
    balconies: { type: Number, default: 0 },
    areaSqFt: { type: Number, required: true, min: 100, max: 100000 },
    carpetArea: { type: Number, min: 0 },

    propertyType: {
      type: String,
      enum: ["Flat", "House", "Villa", "Apartment", "Plot", "Office", "PG"],
      required: true,
      default: "House",
    },
    furnished: {
      type: String,
      enum: ["Unfurnished", "Semi-Furnished", "Fully-Furnished"],
      default: "Unfurnished",
    },
    facing: {
      type: String,
      enum: ["East", "West", "North", "South", "North-East", "South-West"],
    },
    floorNumber: { type: Number, default: 0 },
    totalFloors: { type: Number, min: 1 },
    builtYear: {
      type: Number,
      validate: {
        validator: (v) => v >= 1950 && v <= new Date().getFullYear(),
        message: "Invalid construction year",
      },
    },
    societyName: String,

    parking: {
      type: String,
      enum: ["None", "Bike", "Car", "Both"],
      default: "None",
    },
    liftAvailable: { type: Boolean, default: false },
    securityAvailable: { type: Boolean, default: false },
    electricityBackup: { type: Boolean, default: false },
    waterSupply: {
      type: String,
      enum: ["24x7", "Alternate Days", "Limited"],
      default: "24x7",
    },
    flooringType: {
      type: String,
      enum: ["Tiles", "Marble", "Granite", "Wooden", "Other"],
    },

    images: [
      {
        url: { type: String, required: true },
        caption: String,
      },
    ],
    videos: [{ url: String, caption: String }],
    floorPlan: String,

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    sellerCode: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    ownershipType: {
      type: String,
      enum: [
        "Freehold",
        "Leasehold",
        "Co-operative Society",
        "Power of Attorney",
      ],
      default: "Freehold",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: false,
    },

    slug: String,
    tags: [String],
    availableFrom: Date,
    preferredTenants: {
      type: String,
      enum: ["Family", "Bachelor", "Both"],
      default: "Both",
    },
    brokerAllowed: { type: Boolean, default: true },
    monthlyMaintenanceIncluded: { type: Boolean, default: false },

    facingRoadWidth: { type: Number, min: 0 },
    landAreaSqFt: { type: Number, min: 0 },
    utilityConnections: {
      electricity: { type: Boolean, default: true },
      water: { type: Boolean, default: true },
      gas: { type: Boolean, default: false },
    },
    documentsVerified: { type: Boolean, default: false },

    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String, maxlength: 1000 },
      },
    ],
    averageRating: { type: Number, default: 0, min: 0, max: 5 },

    views: { type: Number, default: 0 },
    inquiriesCount: { type: Number, default: 0 },
    wishlistedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    status: {
      type: String,
      enum: ["Available", "Booked", "Sold", "Rented"],
      default: "Available",
    },
    verified: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    approvedByAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

propertySchema.pre("save", async function (next) {
  // Only validate if category or subcategory changed
  if (this.isModified("category") || this.isModified("subcategory")) {
    if (this.subcategory) {
      const Subcategory = mongoose.model("Subcategory");
      const subcat = await Subcategory.findById(this.subcategory).populate(
        "category"
      );
      if (!subcat) {
        return next(new Error("Invalid subcategory selected"));
      }

      if (this.category.toString() !== subcat.category._id.toString()) {
        return next(
          new Error("Subcategory does not belong to the selected category")
        );
      }
    }
  }
  next();
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
