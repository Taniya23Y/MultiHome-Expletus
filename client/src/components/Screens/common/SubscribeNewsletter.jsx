/* eslint-disable no-unused-vars */
import React from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

const SubscribeNewsletter = () => {
  return (
    <div className="w-full flex justify-center py-16 px-6 md:px-10">
      <div className="w-full max-w-6xl bg-[#DCEDE0] rounded-xl shadow-lg py-12 px-6 md:px-12 flex flex-col items-center text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1931] mb-3">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-[#333] text-base md:text-lg mb-8">
          Get the latest property updates, market insights, and exclusive offers
          from <span className="text-emerald-500 font-semibold">MultiHome</span>
          .
        </p>

        {/* Input Section */}
        <motion.form
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg mx-auto"
        >
          <div className="relative w-full sm:flex-1">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2B5FEA] focus:border-transparent text-gray-700 transition bg-white"
              required
            />
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#2B5FEA",
              boxShadow: "0 0 12px rgba(43,95,234,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            type="submit"
            className="bg-[#2B5FEA] cursor-pointer text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#0A1931] transition-all"
          >
            Subscribe
          </motion.button>
        </motion.form>

        {/* Note */}
        <p className="text-gray-600 text-sm mt-6 max-w-md">
          We respect your privacy — no spam, just useful updates to help you{" "}
          <span className="text-black font-medium">live better.</span>
        </p>
      </div>
    </div>
  );
};

export default SubscribeNewsletter;
