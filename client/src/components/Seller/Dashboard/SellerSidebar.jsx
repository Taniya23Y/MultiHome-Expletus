import React, { useState } from "react";
import {
  Home,
  BarChart2,
  Package,
  ShoppingBag,
  Wallet,
  MessageCircle,
  Star,
  Settings,
  User,
  Bell,
  HelpCircle,
  Menu as MenuIcon,
  X,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SellerSidebar = () => {
  const [open, setOpen] = useState(true); // Desktop collapse
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile drawer
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const toggleMenu = (title) => {
    setActiveMenu(activeMenu === title ? null : title);
  };

  const sections = [
    {
      label: "Overview",
      icon: <Home />,
      submenu: [
        "Welcome message",
        "Today's stats",
        "Quick actions",
        "Notifications",
      ],
    },
    {
      label: "Analytics",
      icon: <BarChart2 />,
      submenu: [
        "Product views",
        "Sales performance",
        "Revenue over time",
        "Conversion rates",
        "Top-performing products",
        "Traffic sources",
      ],
    },
    {
      label: "Products",
      icon: <Package />,
      submenu: [
        "All products list",
        "Add new product",
        "Edit / delete product",
        "Product status",
      ],
    },
    {
      label: "Orders",
      icon: <ShoppingBag />,
      submenu: [
        "New orders",
        "Shipped orders",
        "Cancelled orders",
        "Returned orders",
        "Order details",
      ],
    },
    {
      label: "Earnings",
      icon: <Wallet />,
      submenu: [
        "Total earnings",
        "Withdrawable balance",
        "Payout history",
        "Payment methods",
      ],
    },
    {
      label: "Messages",
      icon: <MessageCircle />,
      submenu: ["Customer inquiries", "Internal messages"],
    },
    {
      label: "Reviews",
      icon: <Star />,
      submenu: ["Customer reviews", "Ratings average", "Review management"],
    },
    {
      label: "Store Settings",
      icon: <Settings />,
      submenu: ["Store name", "Store banner", "Business info", "Contact info"],
    },
    {
      label: "Account",
      icon: <User />,
      submenu: ["Email", "Password", "Phone", "Two-factor authentication"],
    },
    {
      label: "Notifications",
      icon: <Bell />,
      submenu: [
        "New order alerts",
        "Low-stock alerts",
        "Review alerts",
        "System messages",
      ],
    },
    {
      label: "Support",
      icon: <HelpCircle />,
      submenu: ["Raise a ticket", "FAQs", "Contact support"],
    },
  ];

  const createSlug = (txt) => txt.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#0A2A43] p-2 rounded-lg shadow-lg"
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
      <aside
        className={`
    fixed top-0 left-0 h-full bg-[#0A2A43] text-white transition-all z-50 shadow-xl
    ${open ? "w-64" : "w-20"}
    ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    duration-300
    flex flex-col
  `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
          <h1
            className={`text-xl font-bold text-[#A5D8FF] ${!open && "hidden"}`}
          >
            Seller Panel
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

        {/* MENU */}
        <nav className="mt-4 px-2 flex-1 overflow-y-auto hide-scrollbar cursor-pointer">
          {sections.map((sec, idx) => (
            <div key={idx} className="mb-2">
              {/* Main button */}
              <button
                onClick={() => toggleMenu(sec.label)}
                className={`w-full flex items-center justify-between p-3 rounded-lg 
            ${activeMenu === sec.label ? "bg-white/10" : "hover:bg-white/10"}
          `}
              >
                <div className="flex items-center gap-4 cursor-pointer">
                  {sec.icon}
                  {open && <span className="font-medium">{sec.label}</span>}
                </div>

                {open && (
                  <ChevronDown
                    className={`transition-transform cursor-pointer ${
                      activeMenu === sec.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Dropdown */}
              {activeMenu === sec.label && (
                <div className="ml-10 mt-2 space-y-2 text-sm text-gray-300">
                  {sec.submenu.map((item, i) => {
                    const path = `/seller/dashboard/${createSlug(item)}`;
                    return (
                      <Link
                        to={path}
                        key={i}
                        onClick={() => setMobileOpen(false)}
                        className={`block py-1 hover:text-white ${
                          location.pathname === path
                            ? "text-[#A5D8FF] font-semibold"
                            : ""
                        }`}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default SellerSidebar;
