import React from "react";
import Homes from "../components/Screens/HomePage/Home";
import Hero from "../components/Screens/HomePage/Hero";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      {/* hero  */}
      <Hero />
      <Homes />
    </div>
  );
};

export default Home;
