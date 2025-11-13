import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaPlusCircle,
  FaEdit,
  FaUsers,
  FaTools,
  FaMoneyBillWave,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardNavbar = ({ activeTab, setActiveTab }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { title: "Dashboard", icon: <FaHome /> },
    { title: "Add Property", icon: <FaPlusCircle /> },
    { title: "Edit Property", icon: <FaEdit /> },
    { title: "Users", icon: <FaUsers /> },
    { title: "Home Services", icon: <FaTools /> },
    { title: "Payments", icon: <FaMoneyBillWave /> },
    { title: "Analytics", icon: <FaChartLine /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-[#0D1117] text-white flex flex-col justify-between shadow-lg border-r border-gray-800 transition-all duration-300 z-40`}
    >
      {/* Header */}
      <div>
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
          {!collapsed && (
            <h1 className="text-lg font-bold tracking-wide text-blue-400">
              MultiHome
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-blue-400 text-xl"
          >
            <FaBars />
          </button>
        </div>

        {/* User Profile */}
        {!collapsed && (
          <div className="flex flex-col items-center mt-6 mb-4">
            <img
              src="https://i.pravatar.cc/60"
              alt="Admin"
              className="w-14 h-14 rounded-full border-2 border-blue-500 mb-2"
            />
            <p className="text-white font-semibold">Taniya Yadav</p>
            <p className="text-gray-400 text-sm">Admin</p>
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex flex-col gap-1 mt-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item.title)}
              className={`flex items-center gap-3 px-5 py-3 w-full text-left rounded-lg transition-all duration-200 ${
                activeTab === item.title
                  ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
                  : "hover:bg-blue-500/10 text-gray-400 hover:text-blue-300"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span className="text-sm">{item.title}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="px-4 py-5 border-t border-gray-800">
        <button className="flex items-center gap-3 w-full px-2 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-600/10 transition-all duration-300">
          <FaSignOutAlt className="text-lg" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
