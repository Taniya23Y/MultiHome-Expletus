const express = require("express");
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route:
// app.get("/", (req, res) => {
//   res.send("hello from server");
// });

// Route: /home
// app.get("/home", (req, res) => {
//   res.status(200).json({
//     status: 200, //ok
//     message: "Welcome to Home Page",
//   });
// });.+-*+

// Route: /about
// app.get("/about", (req, res) => {
//   res.status(200).json({
//     status: 200,
//     message: "About Page - This is a basic backend route example",
//   });
// });

// Route: /contact
// app.get("/contact", (req, res) => {
//   res.status(200).json({
//     status: 200,
//     message: "Contact Page - Reach us at formymultihome@example.com",
//   });
// });

// importing user route
const userRoutes = require("./routes/userRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

// error handler  middleware
const errorHandler = require("./middleware/errorHandler");

// Use routes
app.use("/api", userRoutes);
app.use("/api", propertyRoutes);
app.use(errorHandler);

// 404 - not-found routing ---. like if user write something like this[/homeoooooo]
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: "Route Not Found",
    message: `The requested URL '${req.originalUrl}' was not found on this server.`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
