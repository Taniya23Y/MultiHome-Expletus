/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AdminDashboardHero from "./AdminDashboardHero";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function SellerLayout() {
  const [activeTab, setActiveTab] = useState("view");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex">
      <div className="1500px:w-[16%] w-1/5">
        <AdminSidebar />
      </div>

      <div className="w-[100%] sm:w-[85%]">
        <Outlet />

        <div className="flex h-screen bg-gray-100">
          <button
            className="fixed top-4 left-4 z-50 md:hidden bg-[#0D1117] text-blue-400 p-2 rounded-lg shadow-md hover:bg-[#1A1F29] transition"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars size={20} />
          </button>

          {/* --- Main Content --- */}
          <div
            className={`flex-1 transition-all duration-300 ease-in-out ${
              isSidebarOpen ? "blur-sm md:blur-0" : ""
            }`}
            onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
          >
            <AdminDashboardHero activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
}
