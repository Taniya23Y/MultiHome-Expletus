import mongoose from "mongoose";

const documentVerificationSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property reference is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner reference is required"],
    },
    documents: [
      {
        docType: {
          type: String,
          required: [true, "Document type is required"],
          enum: [
            "Property Deed",
            "Sale Agreement",
            "Tax Receipt",
            "ID Proof",
            "Utility Bill",
            "Encumbrance Certificate",
            "Occupancy Certificate",
            "Other",
          ],
        },
        url: {
          type: String,
          required: [true, "Document URL is required"],
          trim: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
        isVerified: {
          type: Boolean,
          default: false,
        },
        verifiedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comments: {
          type: String,
          trim: true,
          maxlength: [300, "Comment cannot exceed 300 characters"],
        },
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Under Review", "Approved", "Rejected"],
      default: "Pending",
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verifiedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
      trim: true,
      maxlength: [300, "Rejection reason cannot exceed 300 characters"],
    },
    remarks: {
      type: String,
      trim: true,
      maxlength: [500, "Remarks cannot exceed 500 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Automatically deactivate verification if property is deleted
documentVerificationSchema.pre("remove", async function (next) {
  console.log(
    `Document verification record for property ${this.property} removed.`
  );
  next();
});

const DocumentVerification = mongoose.model(
  "DocumentVerification",
  documentVerificationSchema
);
export default DocumentVerification;
