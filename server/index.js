const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const errorHandler = require("./middleware/errorHandler");

// configure dotenv
dotenv.config();

const app = express();

// configure cors
app.use(
  cors({
    origin: "http://localhost:5173", // client origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing user route
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
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
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

startServer();
