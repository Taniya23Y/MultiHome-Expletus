import React, { useState } from "react";
import {
  Home,
  Building2,
  CalendarDays,
  Users,
  Wallet,
  Wrench,
  MessageCircle,
  Star,
  Settings,
  Menu,
  ChevronDown,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const SellerSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const createSlug = (txt) => txt.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const toggleMenu = (title) => setOpenMenu(openMenu === title ? null : title);

  const menuItems = [
    { title: "Dashboard", icon: <Home />, path: "/seller/dashboard" },
    {
      title: "Post Properties",
      icon: <Building2 />,
      submenu: [
        "Add property",
        "View properties",
        "Edit property details",
        "Manage availability",
        "Set pricing",
        "Upload images & videos",
      ],
    },
    {
      title: "Bookings",
      icon: <CalendarDays />,
      submenu: [
        "Pending visit requests",
        "Confirmed bookings",
        "Visit tracking",
      ],
    },
    {
      title: "Tenants",
      icon: <Users />,
      submenu: ["Tenant details", "Payment history", "Send notices"],
    },
    {
      title: "Payments",
      icon: <Wallet />,
      submenu: [
        "Monthly rent received",
        "Outstanding payments",
        "Download invoices",
      ],
    },
    {
      title: "Service Requests",
      icon: <Wrench />,
      submenu: ["Assign helper", "Mark completed", "Helper ratings"],
    },
    {
      title: "Messages",
      icon: <MessageCircle />,
      submenu: ["Chat with tenants", "Chat with helpers"],
    },
    { title: "Ratings", icon: <Star />, path: "/seller/dashboard/ratings" },
    {
      title: "Settings",
      icon: <Settings />,
      submenu: [
        "Profile",
        "Bank details",
        "Identity verification",
        "Notification preferences",
      ],
    },
  ];

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#0D1117] p-2 rounded-lg shadow-lg"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#0D1117] text-white shadow-lg border-r border-gray-800
        flex flex-col justify-between transition-all duration-300 z-50+
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800 flex-shrink-0">
            {!collapsed && (
              <Link to="/seller/dashboard">
                <h1 className="text-lg font-bold tracking-wide text-blue-400">
                  Seller Panel
                </h1>
              </Link>
            )}
            <button
              className="text-blue-400 text-xl"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Menu />
            </button>
            <button
              className="md:hidden text-white text-xl"
              onClick={() => setMobileOpen(false)}
            >
              <X />
            </button>
          </div>

          {/* SCROLLABLE MENU */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent mt-4 hide-scrollbar">
            {menuItems.map((item, idx) => {
              const isActiveMain =
                location.pathname === item.path ||
                (item.submenu &&
                  item.submenu.some(
                    (s) =>
                      location.pathname === `/seller/dashboard/${createSlug(s)}`
                  ));

              return (
                <div key={idx} className="mb-1">
                  {item.path && !item.submenu ? (
                    <Link
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
                        ${
                          isActiveMain
                            ? "bg-blue-600/20 text-blue-400 border-l-4 border-emerald-400"
                            : "hover:bg-blue-500/10 text-gray-400 hover:text-blue-300"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-lg ${
                            isActiveMain ? "text-blue-400" : ""
                          }`}
                        >
                          {item.icon}
                        </span>
                        {!collapsed && (
                          <span
                            className={`text-sm font-medium ${
                              isActiveMain ? "text-blue-400" : ""
                            }`}
                          >
                            {item.title}
                          </span>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleMenu(item.title)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
                        ${
                          isActiveMain
                            ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
                            : "hover:bg-blue-500/10 text-gray-400 hover:text-blue-300"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-lg ${
                            isActiveMain ? "text-blue-400" : ""
                          }`}
                        >
                          {item.icon}
                        </span>
                        {!collapsed && (
                          <span
                            className={`text-sm font-medium ${
                              isActiveMain ? "text-blue-400" : ""
                            }`}
                          >
                            {item.title}
                          </span>
                        )}
                      </div>
                      {!collapsed && item.submenu && (
                        <ChevronDown
                          className={`transition-transform ${
                            openMenu === item.title ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  )}

                  {/* SUBMENU */}
                  {!collapsed && item.submenu && openMenu === item.title && (
                    <div className="ml-10 mt-2 space-y-2 text-sm text-gray-300 transition-all duration-300 cursor-pointer">
                      {item.submenu.map((sub, i) => {
                        const path = `/seller/dashboard/${createSlug(sub)}`;
                        const isActiveSub = location.pathname === path;
                        return (
                          <Link
                            key={i}
                            to={path}
                            className={`block cursor-pointer hover:text-white ${
                              isActiveSub
                                ? "text-blue-400 font-semibold"
                                : "text-gray-300"
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* LOGOUT */}
          <div className="px-4 py-5 border-t border-gray-800 flex-shrink-0">
            <button className="flex items-center gap-3 cursor-pointer w-full px-2 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-600/10 transition-all duration-300">
              <FaSignOutAlt className="text-lg" />
              {!collapsed && (
                <span className="text-sm font-medium">Logout</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerSidebar;
