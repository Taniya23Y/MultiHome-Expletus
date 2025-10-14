import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Properties", path: "/properties" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const DesktopNav = () => {
  return (
    <nav className="hidden md:flex space-x-6">
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="text-black hover:text-[#7FC68A] font-medium transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNav;
