import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaHome,
  FaChartLine,
  FaFileUpload,
  FaSignOutAlt,
} from "react-icons/fa";

const SellerSidebar = () => {
  const linkClass =
    "flex items-center gap-3 p-3 rounded-lg text-gray-200 hover:bg-gray-700 transition";

  return (
    <div className="w-64 bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Seller Panel</h2>

      <nav className="space-y-2">
        <NavLink to="/seller/dashboard" className={linkClass}>
          <FaTachometerAlt /> Dashboard
        </NavLink>

        <NavLink to="/seller/profile" className={linkClass}>
          <FaUser /> Profile
        </NavLink>

        <NavLink to="/seller/properties" className={linkClass}>
          <FaHome /> Properties
        </NavLink>

        <NavLink to="/seller/stats" className={linkClass}>
          <FaChartLine /> Stats
        </NavLink>

        <NavLink to="/seller/documents" className={linkClass}>
          <FaFileUpload /> Documents
        </NavLink>

        <NavLink to="/seller/logout" className={linkClass}>
          <FaSignOutAlt /> Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default SellerSidebar;
