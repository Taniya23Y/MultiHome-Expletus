import React, { useState } from "react";
import {
  Home,
  Users,
  Building,
  Calendar,
  Wallet,
  BarChart3,
  MessageCircle,
  Settings,
  Menu as MenuIcon,
  ChevronDown,
  X,
  FileWarning,
  BadgeCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const createSlug = (txt) => txt.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const toggleMenu = (title) => setOpenMenu(openMenu === title ? null : title);

  const menuItems = [
    {
      title: "Dashboard Overview",
      icon: <Home />,
      submenu: [
        "Platform stats",
        "Daily activity",
        "Total users",
        "Revenue analytics",
        "System logs",
      ],
    },
    {
      title: "User Management",
      icon: <Users />,
      submenu: [
        "Buyers list",
        "Tenants list",
        "Sellers / multiowners",
        "Helpers",
        "Verify users",
        "Ban / unban users",
      ],
    },
    {
      title: "Properties",
      icon: <Building />,
      submenu: [
        "All properties",
        "Pending approvals",
        "Flagged properties",
        "Boosted listings",
        "Owner verification status",
      ],
    },
    {
      title: "Bookings",
      icon: <Calendar />,
      submenu: [
        "All bookings",
        "Pending visits",
        "Cancelled bookings",
        "Completed visits",
        "Disputes",
      ],
    },
    {
      title: "Payments",
      icon: <Wallet />,
      submenu: [
        "Platform earnings",
        "Payout to sellers",
        "Refunds",
        "Offline payments",
        "Export statements",
      ],
    },
    {
      title: "Verifications",
      icon: <BadgeCheck />,
      submenu: [
        "KYC approvals",
        "Property verification",
        "Identity checks",
        "Reported fraud",
      ],
    },
    {
      title: "Reports & Complaints",
      icon: <FileWarning />,
      submenu: [
        "User complaints",
        "Property reports",
        "Helper complaints",
        "Resolve issues",
      ],
    },
    {
      title: "Insights",
      icon: <BarChart3 />,
      submenu: [
        "Traffic analytics",
        "Conversion data",
        "Popular areas",
        "User behaviour",
        "Revenue breakdown",
      ],
    },
    {
      title: "Messages & Support",
      icon: <MessageCircle />,
      submenu: [
        "Admin chat",
        "Support tickets",
        "User communication",
        "Notifications",
      ],
    },
    {
      title: "Settings",
      icon: <Settings />,
      submenu: [
        "Admin profile",
        "Platform settings",
        "Role permissions",
        "Security",
        "Logs",
      ],
    },
  ];

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#0D1117] p-2 rounded-lg shadow-lg"
        onClick={() => setMobileOpen(true)}
      >
        <MenuIcon size={24} />
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
          flex flex-col justify-between transition-all duration-300 z-50
          ${collapsed ? "w-20" : "w-64"}
          ${
            mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
            {!collapsed && (
              <Link to="/admin/dashboard">
                <h1 className="text-lg font-bold tracking-wide text-blue-400">
                  Admin Panel
                </h1>
              </Link>
            )}
            <button
              className="text-blue-400 text-xl"
              onClick={() => setCollapsed(!collapsed)}
            >
              <MenuIcon />
            </button>
            <button
              className="md:hidden text-white text-xl"
              onClick={() => setMobileOpen(false)}
            >
              <X />
            </button>
          </div>

          {/* MENU */}
          <div className="flex-1 overflow-y-auto px-2 mt-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hide-scrollbar">
            {menuItems.map((item, idx) => {
              const isActiveMain =
                location.pathname === item.path ||
                (item.submenu &&
                  item.submenu.some(
                    (s) =>
                      location.pathname === `/admin/dashboard/${createSlug(s)}`
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
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all cursor-pointer
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
                    <div className="ml-10 mt-2 space-y-2 text-sm text-gray-300 cursor-pointer">
                      {item.submenu.map((sub, i) => {
                        const path = `/admin/dashboard/${createSlug(sub)}`;
                        const isActiveSub = location.pathname === path;
                        return (
                          <Link
                            key={i}
                            to={path}
                            className={`block hover:text-white ${
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
          <div className="px-4 py-1 border-t border-gray-800">
            <button className="flex items-center gap-3 w-full px-2 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-600/10 transition-all">
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

export default AdminSidebar;
