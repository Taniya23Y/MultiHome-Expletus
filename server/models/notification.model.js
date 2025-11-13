const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Notification receiver (user/admin) is required"],
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    targetRole: {
      type: String,
      enum: [
        "user",
        "admin",
        "superadmin",
        "helperService",
        "multiowner",
        "all",
      ],
      default: "user",
    },
    type: {
      type: String,
      enum: [
        "System",
        "Booking",
        "Inquiry",
        "Property",
        "Payment",
        "Admin",
        "General",
        "Review",
        "DocumentVerification",
        "Payment",
        "Wishlist",
        "System",
        "Message",
      ],
      default: "General",
    },
    title: {
      type: String,
      required: [true, "Notification title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
      trim: true,
      maxlength: [500, "Message cannot exceed 500 characters"],
    },
    link: {
      type: String,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "normal", "high"],
      default: "normal",
    },
    relatedProperty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
    relatedBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    relatedInquiry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inquiry",
    },
    relatedPayment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    systemGenerated: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-mark readAt date when isRead changes to true
notificationSchema.pre("save", function (next) {
  if (this.isModified("isRead") && this.isRead && !this.readAt) {
    this.readAt = new Date();
  }
  next();
});

// Auto-clean notifications if linked property/booking/inquiry is deleted
notificationSchema.pre(
  ["findOneAndDelete", "deleteMany"],
  async function (next) {
    const query = this.getQuery();
    await mongoose.model("Notification").deleteMany({
      $or: [
        { relatedProperty: query._id },
        { relatedBooking: query._id },
        { relatedInquiry: query._id },
        { relatedPayment: query._id },
      ],
    });
    next();
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
