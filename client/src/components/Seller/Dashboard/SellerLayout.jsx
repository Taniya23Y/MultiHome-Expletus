// SellerLayout.jsx
import { Outlet } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";
import SellerDashboardHeader from "./SellerDashboardHeader";
import { useState } from "react";

export default function SellerLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SellerSidebar
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      {/* Overlay (when mobile sidebar open) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 md:ml-64">
        {/* Pass mobile toggle into header */}
        <SellerDashboardHeader onMobileMenu={() => setMobileOpen(true)} />

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
