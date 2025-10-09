import React from "react";

const Homes = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-blue-600">MultiHome</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Your one-stop platform for all home solutions — from buying plots to
          finding trusted professionals for construction, interiors, and
          maintenance.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Homes;
