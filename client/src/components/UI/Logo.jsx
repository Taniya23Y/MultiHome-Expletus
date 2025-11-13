import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 sm:gap-3 relative z-10 group"
    >
      <div className="relative w-7 h-7 md:w-9 md:h-9">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg rotate-45 transform origin-center group-hover:scale-105 transition-transform"></div>

        <div className="absolute inset-[3px] rounded-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 sm:w-6 sm:h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 12l9-9 9 9v9a3 3 0 0 1-3 3h-3v-6h-6v6H6a3 3 0 0 1-3-3v-9z" />
          </svg>
        </div>
      </div>

      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        MultiHome
      </span>
    </Link>
  );
};

export default Logo;
