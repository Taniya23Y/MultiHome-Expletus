import React, { useState } from "react";
import {
  Home,
  Heart,
  CalendarCheck,
  FileText,
  MessageSquare,
  Bell,
  File,
  User,
  HelpCircle,
  LogOut,
  Wallet,
  Key,
  Wrench,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ user }) => {
  const [open, setOpen] = useState(true); // Desktop collapse
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile drawer
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard Home", icon: <Home />, path: "/dashboard" },

    // Buyer
    { label: "Buyer Center", type: "label" },
    { title: "Saved Properties", icon: <Heart />, path: "/dashboard/saved" },
    {
      title: "Appointments",
      icon: <CalendarCheck />,
      path: "/dashboard/appointments",
    },
    { title: "Offers", icon: <FileText />, path: "/dashboard/offers" },

    // Renter
    { label: "Renter Center", type: "label" },
    { title: "Active Rental", icon: <Key />, path: "/dashboard/rental" },
    {
      title: "Rent Payments",
      icon: <Wallet />,
      path: "/dashboard/rent-payments",
    },
    {
      title: "Maintenance Requests",
      icon: <Wrench />,
      path: "/dashboard/maintenance",
    },
    {
      title: "Lease Renewal",
      icon: <File />,
      path: "/dashboard/lease-renewal",
    },

    // Communication
    { label: "Communication", type: "label" },
    { title: "Messages", icon: <MessageSquare />, path: "/dashboard/messages" },
    {
      title: "Notifications",
      icon: <Bell />,
      path: "/dashboard/notifications",
    },

    // Docs
    { title: "Documents", icon: <File />, path: "/dashboard/documents" },

    // User Section
    { label: "User", type: "label" },
    { title: "Profile", icon: <User />, path: "/dashboard/profile" },
    { title: "Help & Support", icon: <HelpCircle />, path: "/dashboard/help" },

    // Logout
    { title: "Logout", icon: <LogOut />, path: "/logout" },
  ];

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#0A2A43] p-2 rounded-lg shadow-lg"
        onClick={() => setMobileOpen(true)}
      >
        <MenuIcon size={24} />
      </button>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-[#0A2A43] text-white transition-all z-50 shadow-xl
          ${open ? "w-64" : "w-20"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          duration-300
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h1
            className={`text-xl font-bold text-[#A5D8FF] transition-all ${
              !open && "hidden"
            }`}
          >
            MultiHome
          </h1>

          {/* Desktop collapse */}
          <button
            className="hidden md:block text-white"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon size={22} />
          </button>

          {/* Mobile close */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* USER INFO */}
        {open && (
          <div className="text-center py-6 border-b border-white/10">
            <img
              src={user?.avatar || "/default-user.png"}
              className="w-16 h-16 rounded-full mx-auto border-2 border-[#A5D8FF]"
            />
            <h3 className="mt-3 font-semibold">{user?.name || "User"}</h3>
            <p className="text-sm text-gray-300">Buyer & Renter</p>
          </div>
        )}

        {/* MENUS */}
        <nav className="mt-4 px-2 overflow-y-auto h-[70vh]">
          {menuItems.map((item, index) =>
            item.type === "label" ? (
              open && (
                <p
                  key={index}
                  className="text-[#A5D8FF] text-sm font-semibold mt-4 mb-1 ml-2"
                >
                  {item.label}
                </p>
              )
            ) : (
              <Link
                to={item.path}
                key={index}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-4 p-3 mb-1 rounded-lg cursor-pointer transition-all 
                  ${
                    location.pathname === item.path
                      ? "bg-[#A5D8FF] text-[#0A2A43] font-semibold"
                      : "hover:bg-white/10"
                  }
                `}
              >
                {item.icon}
                {open && <span className="font-medium">{item.title}</span>}
              </Link>
            )
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
