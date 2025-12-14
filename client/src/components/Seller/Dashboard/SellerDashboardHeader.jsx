import React, { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  sellerApi,
  useSellerLogoutMutation,
} from "../../../redux/features/seller/sellerApi";
import { sellerLogoutState } from "../../../redux/features/seller/sellerAuthSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SellerDashboardHeader({ onMobileMenu }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { seller } = useSelector((state) => state.sellerAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sellerLogout] = useSellerLogoutMutation();

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "S");

  const handleLogout = async () => {
    try {
      await sellerLogout().unwrap();
      dispatch(sellerLogoutState());
      dispatch(sellerApi.util.resetApiState());
      setOpen(false);
      navigate("/seller-login");
    } catch (err) {
      console.error("Seller Logout failed:", err);
    }
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white border-b">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenu}
            className="md:hidden p-0 rounded-md border bg-white"
          >
            <Menu size={20} />
          </button>

          <div>
            <h1 className="hidden md:block text-2xl font-bold">
              Welcome Seller 👋
            </h1>
          </div>
        </div>

        {/* Middle search */}
        <div className="hidden md:flex items-center md:flex-1 md:mx-6 max-w-[600px]">
          <div className="flex items-center w-full px-3 py-2 border rounded-2xl bg-gray-50">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              className="flex-1 ml-2 bg-transparent outline-none text-sm"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-md border bg-white">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
              4
            </span>
          </button>

          {/* Profile Dropdown */}
          <div
            className="relative flex items-center gap-3 cursor-pointer"
            ref={menuRef}
            onClick={() => setOpen(!open)}
          >
            <div className="w-10 h-10 rounded-full border flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-500 text-white">
              {seller?.profileImage ? (
                <img
                  src={seller.profileImage}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200"
                  alt="Seller"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 text-white flex items-center justify-center font-semibold">
                  {getInitial(seller?.name)}
                </div>
              )}
            </div>

            {seller?.name && (
              <div className="flex flex-col leading-tight">
                {seller.name.split(" ").map((word, idx) => (
                  <span key={idx} className="font-semibold text-gray-800">
                    {word}
                  </span>
                ))}
              </div>
            )}

            <ChevronDown className="w-4 h-4 text-gray-600" />

            {/* Dropdown menu */}
            {open && (
              <div className="absolute right-0 mt-[15rem] w-48 cursor-pointer bg-white border rounded-lg shadow-lg z-30">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">{seller?.name || "Seller"}</p>
                  <p className="text-xs text-gray-500">{seller?.email}</p>
                </div>

                <Link to="/seller/dashboard/profile">
                  <button className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100">
                    Profile
                  </button>
                </Link>
                <button className="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100">
                  Settings
                </button>

                <hr />

                <button
                  className="w-full text-left px-4 py-2 cursor-pointer text-red-600 hover:bg-gray-50"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
