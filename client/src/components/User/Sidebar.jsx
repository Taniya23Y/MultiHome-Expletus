// src/components/Sidebar.jsx

import React from "react";
import {
  Home,
  Star,
  Calendar,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white shadow-xl shadow-sky-100 border-r border-sky-200 min-h-screen p-6">
      {/* HEADER */}
      <div className="mb-8">
        <div className="text-3xl font-bold text-sky-700">MultiHome</div>
        <div className="text-sm text-black/60">Dashboard</div>
      </div>

      {/* NAV */}
      <nav className="space-y-2">
        <NavItem icon={<Home size={18} />} label="Dashboard Overview" />

        <SectionTitle title="Buyer" />
        <NavItem icon={<Star size={18} />} label="Browse Properties" />
        <NavItem icon={<Star size={18} />} label="Saved Homes" />
        <NavItem icon={<Calendar size={18} />} label="Visits" />

        <SectionTitle title="Renter" />
        <NavItem icon={<MessageSquare size={18} />} label="Rental Listings" />
        <NavItem icon={<MessageSquare size={18} />} label="My Applications" />

        <div className="mt-6 pt-4 border-t border-sky-200">
          <NavItem icon={<User size={18} />} label="Profile" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </div>
      </nav>
    </aside>
  );
}

function NavItem({ icon, label }) {
  return (
    <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#E8F4FF] cursor-pointer transition">
      {icon}
      <span className="text-black">{label}</span>
    </a>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="mt-4 text-xs text-sky-600 uppercase font-semibold tracking-wide">
      {title}
    </div>
  );
}
