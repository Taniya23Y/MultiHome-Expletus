import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminDashboardHeader from "./AdminDashboardHeader";

export default function SellerLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex">
      <div className="1500px:w-[16%] w-1/5">
        <AdminSidebar
          mobileOpen={mobileOpen}
          closeMobile={() => setMobileOpen(false)}
        />
      </div>

      {/* Overlay (when mobile sidebar open) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="w-[100%] sm:w-[85%]">
        <AdminDashboardHeader onMobileMenu={() => setMobileOpen(true)} />

        <Outlet />
      </div>
    </div>
  );
}
