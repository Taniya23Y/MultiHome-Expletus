import React from "react";

const Button = ({
  text = "Click Me",
  onClick,
  bgColor = "#7FC68A",
  hoverBg = "black",
  textColor = "black",
  hoverText = "white",
  width = "w-38",
  height = "h-10",
  rounded = "rounded-md",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${width} ${height} ${rounded} cursor-pointer font-semibold bg-[${bgColor}] hover:bg-[${hoverBg}] text-[${textColor}] hover:text-[${hoverText}] transition-colors duration-300 shadow-sm ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
