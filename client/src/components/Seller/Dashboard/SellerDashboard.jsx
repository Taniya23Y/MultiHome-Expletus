import React from "react";
import {
  FaHome,
  FaUsers,
  FaPlus,
  FaClipboardList,
  FaUserTie,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";

export default function SellerDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-5 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">MultiHome</h1>

        <nav className="space-y-4 flex-1">
          <button className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100 rounded-lg w-full text-left">
            <FaChartBar /> Dashboard Overview
          </button>

          <button className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100 rounded-lg w-full text-left">
            <FaHome /> My Properties
          </button>

          <button className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100 rounded-lg w-full text-left">
            <FaPlus /> Add Property
          </button>

          <button className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100 rounded-lg w-full text-left">
            <FaClipboardList /> Leads & Enquiries
          </button>

          <button className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100 rounded-lg w-full text-left">
            <FaUsers /> Clients
          </button>

          <button className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-100 rounded-lg w-full text-left">
            <FaUserTie /> Profile Settings
          </button>
        </nav>

        <button className="flex items-center gap-3 p-3 mt-auto text-red-500 hover:bg-red-100 rounded-lg w-full text-left">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Seller Dashboard</h2>
          <p className="text-gray-600">
            Welcome back! Manage your properties smarter.
          </p>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Listed Properties</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Active Leads</h3>
            <p className="text-3xl font-bold">34</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500 text-sm">Total Sold</h3>
            <p className="text-3xl font-bold">05</p>
          </div>
        </div>

        {/* Latest Properties */}
        <section className="bg-white p-6 rounded-xl shadow mb-8">
          <h3 className="text-xl font-semibold mb-4">Recent Properties</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg flex justify-between">
              <div>
                <h4 className="font-semibold">2BHK Flat - Bhawarkua</h4>
                <p className="text-gray-500">₹45,00,000 • 1200 sqft</p>
              </div>
              <button className="text-blue-500">View</button>
            </div>

            <div className="p-4 border rounded-lg flex justify-between">
              <div>
                <h4 className="font-semibold">Villa - Nipania</h4>
                <p className="text-gray-500">₹1.2 Cr • 2400 sqft</p>
              </div>
              <button className="text-blue-500">View</button>
            </div>
          </div>
        </section>

        {/* Leads Section */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Latest Leads</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Rohit Sharma</p>
              <p className="text-gray-500 text-sm">
                Interested in 2BHK Bhawarkua property
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <p className="font-medium">Sneha Patel</p>
              <p className="text-gray-500 text-sm">
                Requested site visit for Nipania Villa
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
