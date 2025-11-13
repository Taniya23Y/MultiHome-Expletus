import mongoose from "mongoose";

const helperServiceBookingSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HelperService",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    problemDescription: {
      type: String,
      trim: true,
    },
    address: {
      city: { type: String, required: true },
      area: { type: String, required: true },
      landmark: { type: String },
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    adminNotes: {
      type: String,
      trim: true,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
    isReviewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Cascade delete when service is deleted
helperServiceBookingSchema.pre("remove", async function (next) {
  console.log(`Booking for service ${this.serviceId} deleted.`);
  next();
});

export default mongoose.model(
  "HelperServiceBooking",
  helperServiceBookingSchema
);
