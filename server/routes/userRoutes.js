const express = require("express");
const router = express.Router();

// get route (data inside function + try...catch)
router.get("/aboutdata", (req, res) => {
  try {
    // user data
    const aboutData = {
      companyName: "MultiHome",
      foundedYear: 2024,
      headquarters: "Indore, Madhya Pradesh, India",
      founder: "Taniya Yadav",
      tagline: "Simplifying Every Home Need — One Click at a Time 🏠",

      vision:
        "To revolutionize the home improvement and real estate industry in India by connecting homeowners with trusted professionals effortlessly.",

      mission: [
        "To provide a one-stop platform for all home services — from construction to maintenance.",
        "To empower local service providers by giving them online visibility and work opportunities.",
        "To ensure customers get transparent pricing, verified experts, and top-quality services.",
      ],

      coreValues: [
        "Customer First",
        "Transparency",
        "Trust & Quality",
        "Innovation",
        "Community Empowerment",
      ],

      // 📖 Our Story
      story:
        "MultiHome began with a simple idea — to make home management easier. Many people struggle to find reliable plumbers, painters, or builders. Our founder, Taniya Yadav, decided to bridge this gap through technology. Today, MultiHome is helping hundreds of users find trusted professionals in their city.",

      contact: {
        email: "support@multihome.in",
        phone: "+91-9000000000",
        website: "https://www.multihome.in",
      },
    };

    // Sending data to postman
    res.status(200).json({
      status: 200,
      message: "Data sent successfully!",
      data: aboutData,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

module.exports = router;
