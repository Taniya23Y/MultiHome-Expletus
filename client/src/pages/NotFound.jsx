import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const NotFound = () => {
  return (
    <div className="max-container mx-auto min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0A1931] via-[#152860] to-[#1B2F70] text-white px-6 py-12">
      <h1 className="text-[7rem] md:text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 animate-pulse">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-bold mt-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-300 mt-3 text-center max-w-md">
        The page you’re looking for doesn’t exist or may have been moved. Let’s
        get you back home safely 🏡
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#2B5FEA] hover:bg-[#244DCB] transition-all duration-300 px-5 py-2 rounded-full text-white font-medium shadow-md hover:shadow-[0_0_12px_rgba(43,95,234,0.7)]"
        >
          <FaHome className="text-lg" />
          Back to Home
        </Link>

        <Link
          to="/properties"
          className="inline-flex items-center gap-2 border border-emerald-400 text-emerald-300 hover:bg-emerald-500 hover:text-white transition-all duration-300 px-5 py-2 rounded-full font-medium shadow-sm"
        >
          <FaArrowLeftLong className="text-base" />
          Explore Properties
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
