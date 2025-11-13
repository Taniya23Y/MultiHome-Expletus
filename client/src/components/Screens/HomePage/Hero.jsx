/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Home,
  MapPin,
  IndianRupee,
  Bed,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";
import { assets } from "../../../assets/data"; // contains bgImage
import { motion } from "framer-motion";

const Hero = () => {
  const [activeBanner, setActiveBanner] = useState(0);

  // Banner data
  const banners = [
    {
      type: "image",
      bg: `url(${assets.bgImage})`,
      title: "Find. Rent. Sell. Manage. Live Better.",
      Description:
        "Your all-in-one platform for smarter living — explore homes, manage rentals, and access trusted home services in one place.",
      button: "Explore Now",
      btnColor: "#407CFF",
    },
    {
      type: "color",
      color: "#5791C3",
      title: "Find Your Dream Home to Buy",
      Description:
        "Discover a curated collection of premium properties that fit your budget and lifestyle — your perfect home awaits.",
      button: "Buy Now",
      btnColor: "#6995BB",
    },
    {
      type: "color",
      color: "#1B4D3E",
      title: "Discover Homes for Rent",
      Description:
        "Explore verified rental properties with comfort, convenience, and affordability — move in with peace of mind.",
      button: "Rent Now",
      btnColor: "#5EBF98",
    },
    {
      type: "color",
      color: "#1E3A8A",
      title: "Sell Your Property Easily",
      Description:
        "List your property with confidence and connect with genuine buyers — fast, secure, and hassle-free selling experience.",
      button: "Sell Now",
      btnColor: "#5B8FF9",
    },
  ];

  // Auto change banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = banners[activeBanner];

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  return (
    <section
      className={`max-container relative w-full h-auto lg:py-[7rem] py-[5rem] rounded-2xl flex flex-col justify-center items-center text-center overflow-hidden transition-all duration-500 ${current.color}`}
      style={
        current.type === "color"
          ? { backgroundColor: current.color }
          : {
              backgroundImage: current.bg,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
      }
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 text-white flex flex-col items-center">
        {/* Trust Badge */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-3 px-6 py-3 bg-black text-white rounded-full font-semibold mb-8 relative overflow-hidden border-1 border-gray-300 "
        >
          {/* Circular shield icon */}
          <div className="w-12 h-8 rounded-4xl bg-white flex items-center justify-center text-red-600 ">
            <Shield className="w-5 h-5 font-extrabold" />
          </div>

          {/* Text */}
          <span className="whitespace-nowrap">Are You Looking for Space?</span>

          {/* Arrow */}
          <div className="ml-2">
            <ArrowRight />
          </div>

          {/* Light inner border */}
          <div className="absolute inset-0 rounded-full border-2 border-white/20 pointer-events-none"></div>
        </motion.div>

        {/* Headline */}
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          {current.title}
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl">
          {current.Description}
        </p>

        {/* Search Bar */}
        <div className="relative top-10 w-full max-w-6xl bg-white rounded-2xl shadow-lg p-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-3 backdrop-blur-sm">
          {/* Property Type */}
          <div className="flex items-center gap-2 flex-1 min-w-[150px] px-3 py-2 border rounded-lg md:rounded-none md:border-0">
            <Home className="w-5 h-5 text-gray-500" />
            <select className="w-full bg-transparent text-gray-700 text-sm outline-none">
              <option>Buy</option>
              <option>Rent</option>
              <option>PG / Hostel</option>
              <option>Commercial</option>
            </select>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 flex-1 min-w-[150px] px-3 py-2 border md:border-l md:border-gray-200 rounded-lg md:rounded-none">
            <MapPin className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Type Location"
              className="w-full outline-none text-gray-700 text-sm"
            />
          </div>

          {/* Budget */}
          <div className="flex items-center gap-2 flex-1 min-w-[150px] px-3 py-2 border md:border-l md:border-gray-200 rounded-lg md:rounded-none">
            <IndianRupee className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Budget Range"
              className="w-full outline-none text-gray-700 text-sm"
            />
          </div>

          {/* BHK */}
          <div className="flex items-center gap-2 flex-1 min-w-[150px] px-3 py-2 border md:border-l md:border-gray-200 rounded-lg md:rounded-none">
            <Bed className="w-5 h-5 text-gray-500" />
            <select className="w-full bg-transparent text-gray-700 text-sm outline-none">
              <option>1 BHK</option>
              <option>2 BHK</option>
              <option>3 BHK</option>
              <option>4+ BHK</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            className="bg-[#7FC68A] text-white cursor-pointer px-6 py-3 rounded-xl font-semibold hover:bg-[#69b377] transition-all whitespace-nowrap"
            style={{
              backgroundColor: current.btnColor,
            }}
          >
            {current.button}
          </button>
        </div>
      </div>

      {/* 3 Dots Navigation */}
      <div className="absolute bottom-6 right-6 flex gap-3 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveBanner(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeBanner === index
                ? "bg-white scale-125 cursor-pointer"
                : "bg-white/60 cursor-pointer hover:bg-white/80"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
