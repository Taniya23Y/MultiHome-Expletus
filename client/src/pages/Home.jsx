import React from "react";
import Hero from "../components/Screens/HomePage/Hero";
import Features from "../components/Screens/HomePage/Features";
import AvailableProperties from "../components/Screens/HomePage/AvailableProperties";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <Hero />
      <Features />
      <AvailableProperties />
    </div>
  );
};

export default Home;
