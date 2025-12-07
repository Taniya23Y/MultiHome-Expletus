import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/data";
import { ArrowRight } from "lucide-react";

const SellerHero = () => {
  return (
    <div
      className="
        relative container mx-auto w-full rounded-2xl flex flex-col md:flex-row 
        items-center md:items-stretch justify-between overflow-hidden 
        bg-gradient-to-br from-[#CEE1E5] via-[#E6E0CC] to-[#E1DFD5] min-h-[480px]
      "
    >
      {/* Left Side */}
      <div className="w-full md:w-1/2 px-6 md:px-16 py-16 space-y-4 text-center md:text-left z-10">
        <p className="text-sm md:text-base font-semibold text-gray-600 text-left">
          <Link to="/" className="hover:underline transition-all">
            Welcome to MultiHome
          </Link>{" "}
          › Become a Seller
        </p>

        <h1 className="text-[2.5rem] md:text-[3.4rem] text-left font-bold text-gray-800 leading-tight">
          Sell & Manage Your Property at MultiHome
        </h1>

        <p className="text-gray-700 text-[15px] text-left md:text-[16px] max-w-lg mx-auto md:mx-0">
          Showcase your property, connect with serious buyers, and manage your
          real estate business effortlessly with MultiHome’s powerful seller
          tools.
        </p>

        {/* Hover Slider Button */}
        <div className="flex items-center gap-4">
          {/* Main button */}
          <Link to="/register">
            <button
              className="flex items-center cursor-pointer
             bg-black text-white rounded-full px-3 py-3 md:px-6 md:py-3 gap-3 hover:bg-gray-900 transition-all shadow-lg"
            >
              <span className="font-medium text-base">
                want to sell property!
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>

          {/* Users avatars */}
          <div className="flex -space-x-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="user1"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/60"
              alt="user2"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/30"
              alt="user3"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/80"
              alt="user3"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium border-2 border-white">
              10k+
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-[50%] relative flex justify-center items-center">
        <img
          src={assets.SellerHeroImage}
          alt="Modern house for sale"
          className="w-full h-full absolute top-3 object-cover drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default SellerHero;
