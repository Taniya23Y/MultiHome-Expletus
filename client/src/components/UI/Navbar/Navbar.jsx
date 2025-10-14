import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../../../assets/data";

const Navbar = () => {
  const navItems = ["Home", "About", "Properties", "Services", "Contact"];

  const [active, setActive] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        setActive(window.scrollY > 10);
      } else {
        setActive(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-3 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] bg-white shadow-lg rounded-2xl z-50 transition-all duration-300 ${
        active ? "py-3 px-6" : "py-4 px-6"
      }`}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={assets.logoImg}
            alt="logoImg"
            className="h-9 w-9 object-contain"
          />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-wide">
            MultiHome
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item, index) => (
            <span
              key={index}
              className="text-gray-700 hover:text-[#7FC68A] font-medium transition-colors duration-200 cursor-pointer"
            >
              {item}
            </span>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button
              className="text-gray-700 text-3xl focus:outline-none"
              onClick={() => setMenuOpened(!menuOpened)}
            >
              {menuOpened ? "✕" : "☰"}
            </button>
          </div>

          {/* Desktop Login Button */}
          <Link to="/signin" className="hidden md:block">
            <button className="w-24 h-10 rounded-md cursor-pointer font-semibold bg-[#7FC68A] hover:bg-black text-black hover:text-white transition-colors duration-300 shadow-sm">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpened && (
        <div className="md:hidden mt-4 bg-white rounded-xl shadow-md p-4 flex flex-col items-center gap-4 animate-fadeIn">
          {navItems.map((item, index) => (
            <span
              key={index}
              className="text-gray-800 hover:text-[#7FC68A] font-medium transition-colors duration-200 cursor-pointer"
              onClick={() => setMenuOpened(false)}
            >
              {item}
            </span>
          ))}
          <Link to="/signin" onClick={() => setMenuOpened(false)}>
            <button className="w-28 h-10 rounded-md cursor-pointer font-semibold bg-[#7FC68A] hover:bg-black text-black hover:text-white transition-colors duration-300 shadow-sm">
              Login
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
