/* eslint-disable no-unused-vars */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800",
  outline: "border border-blue-600 text-blue-700 bg-white hover:bg-blue-50",
  subtle: "bg-blue-50 text-blue-700 hover:bg-blue-100",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs md:text-sm",
  md: "px-4 py-2 text-sm md:text-base",
  lg: "px-5 py-3 text-base md:text-lg",
};

const roundness = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export default function Button({
  label = "Become a Seller",
  href = null,
  icon = <UserPlus size={18} className="w-4 h-4 md:w-5 md:h-5" />,
  iconPosition = "left",
  variant = "primary",
  size = "md",
  rounded = "lg",
  fullWidth = false,

  // ✔ your requested props:
  hideIconOnMobile = false,
  hideTextOnMobile = false,

  className = "",
  onClick = () => {},
}) {
  const mobileIconHidden = hideIconOnMobile ? "hidden md:block" : "";
  const mobileTextHidden = hideTextOnMobile ? "hidden md:inline-block" : "";

  // keep icon visible on mobile unless hidden explicitly
  const processedIcon = icon
    ? React.cloneElement(icon, {
        className: `${icon.props.className || ""} ${mobileIconHidden}`,
      })
    : null;

  const buttonClasses = `
    flex items-center justify-center gap-2 cursor-pointer font-medium
    shadow-sm hover:shadow-md
    active:scale-[0.98]
    transition-all duration-200
    ${variants[variant]}
    ${sizes[size]}
    ${roundness[rounded]}
    ${fullWidth ? "w-full" : ""}
    ${className}
    select-none touch-manipulation
  `;

  const content = (
    <>
      {iconPosition === "left" && processedIcon}

      {/* Tooltip + hide text on mobile */}
      <span
        className={`whitespace-nowrap ${mobileTextHidden}`}
        title={hideTextOnMobile ? label : ""}
      >
        {label}
      </span>

      {iconPosition === "right" && processedIcon}
    </>
  );

  if (href) {
    return (
      <Link to={href}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={buttonClasses}
          title={hideTextOnMobile ? label : ""}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={buttonClasses}
      title={hideTextOnMobile ? label : ""}
    >
      {content}
    </motion.button>
  );
}
