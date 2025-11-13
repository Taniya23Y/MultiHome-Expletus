import mongoose from "mongoose";

const rentalAgreementSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agreementNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    rentAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    securityDeposit: {
      type: Number,
      default: 0,
      min: 0,
    },
    paymentCycle: {
      type: String,
      enum: ["monthly", "quarterly", "yearly"],
      default: "monthly",
    },
    terms: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    agreementDocUrl: {
      type: String,
      trim: true,
    },
    digitalSignature: {
      owner: { type: String, trim: true },
      tenant: { type: String, trim: true },
    },
    status: {
      type: String,
      enum: ["pending", "active", "terminated", "expired"],
      default: "pending",
    },
    renewalDate: Date,
    verifiedByAdmin: {
      type: Boolean,
      default: false,
    },
    notes: String,
  },
  { timestamps: true }
);

// Auto-expire or flag agreements
rentalAgreementSchema.pre("save", function (next) {
  if (this.endDate && new Date(this.endDate) < new Date()) {
    this.status = "expired";
  }
  next();
});

const RentalAgreement = mongoose.model(
  "RentalAgreement",
  rentalAgreementSchema
);
export default RentalAgreement;
