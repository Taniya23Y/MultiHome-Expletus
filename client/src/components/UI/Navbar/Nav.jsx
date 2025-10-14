import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../../assets/data";
import DesktopNav from "./DesktopNav";

const Nav = () => {
  return (
    <header className="bg-white shadow-md rounded-xl mt-2 mx-3 p-2 relative z-50 max-w-7xl">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={assets.logoImg} alt="logoImg" className="h-9" />
          <h1 className="text-xl font-bold text-black">MultiHome</h1>
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav />

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="text-gray-700 text-2xl focus:outline-none">
            ☰
          </button>
        </div>

        {/* login button */}
        <div>
          <Link to="/Signin">
            <button className="w-25 h-10 rounded-2xl cursor-pointer font-semibold bg-[#7FC68A] hover:bg-black text-black hover:text-white">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Nav;
