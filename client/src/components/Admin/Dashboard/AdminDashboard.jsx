import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardHero from "./DashboardHero";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <div className="flex">
      <DashboardNavbar setActiveTab={setActiveTab} />
      <DashboardHero activeTab={activeTab} />
    </div>
  );
};

export default AdminDashboard;
