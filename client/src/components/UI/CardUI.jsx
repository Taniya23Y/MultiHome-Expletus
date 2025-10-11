import { motion } from "framer-motion";
import React from "react";

const CardUI = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center md:items-start justify-center bg-gradient-to-b from-[#342A29] to-[#5A5956] rounded-2xl p-6 md:p-8 shadow-lg hover:scale-[1.02] transition-transform duration-300 w-full max-w-md md:max-w-xl mx-auto">
      {/* Icon Section */}
      <div className="flex flex-col items-center justify-center md:justify-start md:mr-6 mb-4 md:mb-0">
        <div className="text-[#7FC68A] text-4xl">{icon}</div>

        {/* Line (Horizontal on mobile, Vertical on desktop) */}
        {/* <div className="md:hidden w-16 h-[2px] bg-[#7FC68A] mt-3 rounded-full"></div> */}
        {/* <div className="hidden md:block w-[2px] h-16 bg-[#7FC68A] mt-3 rounded-full"></div> */}
      </div>

      <motion.div
        className="w-20 h-[2px] bg-[#7FC68A] rounded-full mb-5"
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={{ scaleX: 1, originX: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      ></motion.div>

      {/* Content Section */}
      <div className="text-center md:text-left">
        <h3 className="text-white text-xl md:text-2xl font-semibold mb-2">
          {title}
        </h3>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardUI;
