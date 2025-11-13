import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    totalUsers: { type: Number, default: 0 },
    newUsers: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
    totalProperties: { type: Number, default: 0 },
    newProperties: { type: Number, default: 0 },
    soldProperties: { type: Number, default: 0 },
    totalBookings: { type: Number, default: 0 },
    newBookings: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    serviceRevenue: { type: Number, default: 0 },
    propertyRevenue: { type: Number, default: 0 },
    topLocation: { type: String, trim: true },
    topCategory: { type: String, trim: true },
    avgSessionTime: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 },
    trafficSource: [
      {
        source: { type: String },
        users: { type: Number },
      },
    ],
    systemHealth: {
      uptime: { type: String, default: "100%" },
      apiResponseTime: { type: String, default: "0ms" },
    },
    remarks: {
      type: String,
      trim: true,
      maxlength: [300, "Remarks cannot exceed 300 characters"],
    },
  },
  { timestamps: true }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);
export default Analytics;
