import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  adminPropertyApi,
  useAdminLogoutMutation,
} from "../../../redux/features/admin/adminPropertyApi";
import { logoutState } from "../../../redux/features/auth/authSlice"; // use main auth slice

export default function AdminDashboardHeader({ onMobileMenu }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { user } = useSelector((state) => state.auth); // get from auth slice
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminLogout] = useAdminLogoutMutation();

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "A");

  const handleLogout = async () => {
    try {
      await adminLogout().unwrap();
      dispatch(logoutState()); // logout from auth slice
      dispatch(adminPropertyApi.util.resetApiState());
      setOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("Admin Logout failed:", err);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Only show admin info if logged in and role is admin
  const admin = user?.role === "admin" ? user : null;

  return (
    <header className="sticky top-0 z-20 bg-white border-b">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left: Mobile Menu & Welcome */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenu}
            className="md:hidden p-0 rounded-md border bg-white"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="hidden md:block text-2xl font-bold">
              Welcome Admin 👋
            </h1>
          </div>
        </div>

        {/* Middle: Search */}
        <div className="hidden md:flex items-center md:flex-1 md:mx-6 max-w-[600px]">
          <div className="flex items-center w-full px-3 py-2 border rounded-2xl bg-gray-50">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              className="flex-1 ml-2 bg-transparent outline-none text-sm"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-md border bg-white">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
              4
            </span>
          </button>

          {/* Profile Dropdown */}
          {admin && (
            <div
              className="relative flex items-center gap-3 cursor-pointer"
              ref={menuRef}
              onClick={() => setOpen(!open)}
            >
              <div className="w-10 h-10 rounded-full border flex items-center justify-center bg-gradient-to-br from-green-600 to-teal-500 text-white">
                {admin.profileImage ? (
                  <img
                    src={admin.profileImage}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200"
                    alt="Admin"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                    {getInitial(admin.name)}
                  </div>
                )}
              </div>

              <div className="flex flex-col leading-tight">
                {admin.name.split(" ").map((word, idx) => (
                  <span key={idx} className="font-semibold text-gray-800">
                    {word}
                  </span>
                ))}
              </div>

              <ChevronDown className="w-4 h-4 text-gray-600" />

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute right-0 mt-[15rem] w-48 cursor-pointer bg-white border rounded-lg shadow-lg z-30">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold">{admin.name}</p>
                    <p className="text-xs text-gray-500">{admin.email}</p>
                  </div>

                  <Link to="/admin/dashboard/profile">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Profile
                    </button>
                  </Link>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Settings
                  </button>

                  <hr />

                  <button
                    className="w-full cursor-pointer text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
