import React from "react";

const DashboardNavbar = ({ setActiveTab }) => {
  return (
    <aside className="w-64 bg-[#7FC68A] min-h-screen text-white flex flex-col p-5 rounded-r-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <button
        onClick={() => setActiveTab("view")}
        className="text-left px-4 py-2 hover:bg-white hover:text-[#7FC68A] rounded-lg mb-2 font-semibold"
      >
        View All Properties
      </button>
      <button
        onClick={() => setActiveTab("add")}
        className="text-left px-4 py-2 hover:bg-white hover:text-[#7FC68A] rounded-lg mb-2 font-semibold"
      >
        Add New Property
      </button>
      <button
        onClick={() => setActiveTab("edit")}
        className="text-left px-4 py-2 hover:bg-white hover:text-[#7FC68A] rounded-lg mb-2 font-semibold"
      >
        Edit Property
      </button>
      <button
        onClick={() => setActiveTab("delete")}
        className="text-left px-4 py-2 hover:bg-white hover:text-[#7FC68A] rounded-lg mb-2 font-semibold"
      >
        Delete Property
      </button>
    </aside>
  );
};

export default DashboardNavbar;
