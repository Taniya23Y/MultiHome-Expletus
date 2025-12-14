const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/user.route");
const sellerRoutes = require("./routes/seller.route");
const adminRoutes = require("./routes/admin.route");
const propertyRoutes = require("./routes/property.route");
const categoryRoutes = require("./routes/category.route");
const subcategoryRoutes = require("./routes/subcategory.route");
const redis = require("./config/redis");
const cookieParser = require("cookie-parser");

// configure dotenv
dotenv.config();

const app = express();

// configure cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use routes
app.use("/api/auth", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use(errorHandler);

// 404 - not-found routing ---. like if user write something like this[/homeoooooo]
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: "Route Not Found",
    message: `The requested URL '${req.originalUrl}' was not found on this server.`,
  });
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 7777;

const startServer = async () => {
  try {
    await dbConnect();

    redis.on("connect", () => console.log("Redis server connected"));
    redis.on("error", (err) => console.error("Redis error:", err));

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

startServer();
