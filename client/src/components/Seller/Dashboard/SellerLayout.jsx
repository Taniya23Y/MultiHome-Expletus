import { Outlet } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";
import SellerDashboardHero from "./SellerDashboardHero";

export default function SellerLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar: 20% width */}
      <div className="w-1/5 min-w-[250px]">
        <SellerSidebar />
      </div>

      {/* Main Content: 80% width */}
      <div className="w-4/5 flex flex-col">
        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
