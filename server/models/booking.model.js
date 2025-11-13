const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property reference is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner reference is required"],
    },
    bookingType: {
      type: String,
      enum: ["Rent", "Buy", "Visit"],
      required: [true, "Booking type is required"],
      default: "Rent",
    },
    checkInDate: { type: Date },
    checkOutDate: { type: Date },
    bookingDate: { type: Date, default: Date.now },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    securityDeposit: { type: Number, default: 0 },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Online", "Cash", "UPI", "Card", "BankTransfer"],
      default: "Online",
    },
    transactionId: { type: String, trim: true },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Canceled", "Completed"],
      default: "Pending",
    },
    notes: { type: String, trim: true, maxlength: 300 },
    cancelReason: { type: String, trim: true, maxlength: 300 },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Index for faster queries (user-wise or property-wise)
bookingSchema.index({ user: 1, property: 1, status: 1 });

// Auto deactivate if end date passed (for rentals)
bookingSchema.pre("save", function (next) {
  if (this.checkOutDate && new Date(this.checkOutDate) < new Date()) {
    this.isActive = false;
    this.status = "Completed";
  }
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
