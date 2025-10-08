import React from "react";
import { assets } from "../assets/data";

const Navbar = ({ setShowAuth }) => {
  const navItems = ["Home", "About", "Properties", "Services", "Contact"];

  return (
    <header className=" bg-white shadow-md rounded-xl mt-2 mx-3 p-2 relative z-50 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img src={assets.logoImg} alt="logoImg" className="h-9" />
          <h1 className="text-xl font-bold text-black">MultiHome</h1>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <span
              key={index}
              className="text-black hover:text-[#7FC68A] font-medium transition-colors cursor-pointer"
            >
              {item}
            </span>
          ))}
        </nav>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button className="text-gray-700 text-2xl focus:outline-none">
            ☰
          </button>
        </div>

        {/* Login button */}
        <div>
          <button
            onClick={() => setShowAuth(true)} // open login/signup form
            className="w-24 h-10 rounded-2xl cursor-pointer font-semibold bg-[#7FC68A] hover:bg-black text-black hover:text-white transition-colors duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
