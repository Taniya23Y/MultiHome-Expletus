const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property reference is required"],
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Sender (User) reference is required"],
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Receiver (Owner/Agent) reference is required"],
    },
    message: {
      type: String,
      required: [true, "Message content is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters long"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    contactNumber: {
      type: String,
      trim: true,
      match: [/^\+?\d{10,15}$/, "Please provide a valid contact number"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    status: {
      type: String,
      enum: ["pending", "responded", "closed"],
      default: "pending",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    response: {
      type: String,
      trim: true,
      maxlength: [1000, "Response cannot exceed 1000 characters"],
    },
    priority: {
      type: String,
      enum: ["Normal", "Urgent", "Follow-up"],
      default: "Normal",
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);
module.exports = Inquiry;
