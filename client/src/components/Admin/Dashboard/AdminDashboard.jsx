import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardHero from "./DashboardHero";
import { FaBars } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("view");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* --- Mobile Navbar Toggle Button --- */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-[#0D1117] text-blue-400 p-2 rounded-lg shadow-md hover:bg-[#1A1F29] transition"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars size={20} />
      </button>

      {/* --- Sidebar --- */}
      <div
        className={`fixed md:static top-0 left-0 h-full z-40 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <DashboardNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* --- Main Content --- */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "blur-sm md:blur-0" : ""
        }`}
        onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
      >
        <DashboardHero activeTab={activeTab} />
      </div>
    </div>
  );
};

export default AdminDashboard;
