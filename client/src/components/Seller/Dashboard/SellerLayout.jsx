import React from "react";
import SellerSidebar from "../components/seller/SellerSidebar";
import { Outlet } from "react-router-dom";

const SellerLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SellerSidebar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;
