import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      {/* Horizontal container for logo + loading text */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="relative w-10 h-10 md:w-12 md:h-12 animate-bounce">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg rotate-45 transform origin-center"></div>
          <div className="absolute inset-[3px] rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 sm:w-7 sm:h-7 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 12l9-9 9 9v9a3 3 0 0 1-3 3h-3v-6h-6v6H6a3 3 0 0 1-3-3v-9z" />
            </svg>
          </div>
        </div>

        {/* Loading text with animated dots */}
        <h1 className="text-gray-800 text-lg sm:text-xl font-semibold flex items-center">
          Loading
          <span className="ml-2 flex space-x-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></span>
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></span>
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-450"></span>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Loader;
