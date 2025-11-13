import React from "react";

const GlassButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
      w-24 h-10 rounded-md cursor-pointer font-semibold bg-[#7FC68A] hover:bg-black text-black hover:text-white transition-colors duration-300 shadow-sm
        relative
        px-6 py-3 sm:px-8 sm:py-4
        text-lg sm:text-xl
        bg-gradient-to-r from-purple-500 to-blue-500
        bg-opacity-30
        backdrop-blur-md
        border border-white/20
        hover:scale-105
        hover:bg-opacity-50
        focus:outline-none
      "
    >
      {text}
    </button>
  );
};

export default GlassButton;
