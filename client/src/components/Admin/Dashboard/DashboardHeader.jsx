import React, { useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Property Added",
      message: "A new luxury apartment was added to the listings.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
      status: "unread",
    },
    {
      id: 2,
      title: "New User Registered",
      message: "A new agent joined MultiHome platform.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      status: "read",
    },
  ]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "read" } : n))
    );
  };

  return (
    <header className="fixed md:static top-0 right-0 w-full z-50 bg-white shadow-sm md:shadow-none border-b md:border-0">
      <div className="flex flex-wrap justify-between md:justify-end items-center px-4 sm:px-6 md:px-8 py-3 md:py-5 bg-white/90 backdrop-blur-md border-b border-gray-200">
        {/* --- Search Bar (hidden on mobile) --- */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-full text-gray-600 w-72">
          <FaSearch className="mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent w-full outline-none text-sm"
          />
        </div>

        {/* --- Right Section --- */}
        <div className="flex items-center gap-3 sm:gap-5 md:gap-6 w-full md:w-auto justify-between md:justify-end mt-2 md:mt-0">
          {/* Notifications */}
          <div
            className="relative cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition mx-auto md:mx-0"
            onClick={() => setOpen(!open)}
          >
            <IoMdNotificationsOutline className="text-2xl text-gray-700" />
            {notifications.some((n) => n.status === "unread") && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] w-[16px] h-[16px] rounded-full flex items-center justify-center">
                {notifications.filter((n) => n.status === "unread").length}
              </span>
            )}
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <FaUserCircle className="text-3xl text-gray-700" />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-tight">
                Taniya Yadav
              </p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Dropdown Notifications --- */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-4 sm:right-6 md:right-8 top-16 w-64 sm:w-72 md:w-80 bg-[#0D1117] text-white rounded-xl shadow-2xl overflow-hidden border border-blue-600/30 z-50"
        >
          <div className="bg-blue-600/20 p-3 text-center border-b border-blue-500/30">
            <h4 className="font-semibold text-blue-400 text-sm sm:text-base">
              Notifications
            </h4>
          </div>

          <div className="max-h-64 overflow-y-auto p-3">
            {notifications.length > 0 ? (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#161B22] mb-3 p-3 rounded-lg border border-gray-800 hover:border-blue-500/50 transition"
                >
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-semibold text-blue-400">
                      {item.title}
                    </p>
                    {item.status === "unread" && (
                      <button
                        onClick={() => handleMarkAsRead(item.id)}
                        className="text-xs text-red-400 font-bold hover:text-red-300"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-1">{item.message}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(item.createdAt, { addSuffix: true })}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-5 text-sm">
                No new notifications
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
