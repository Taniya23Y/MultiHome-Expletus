import { Bell, Menu, Search, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";

const SellerDashboardHero = () => {
  const { seller } = useSelector((state) => state.sellerAuth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "S");

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full">
      <div className="flex items-center justify-between px-4 md:px-8 py-4 w-full">
        <h1>
          Welcome Seller 👋
          <span className="hidden md:block font-medium text-gray-800">
            {seller?.name || "Seller"}
          </span>
        </h1>
        <div className="flex items-center gap-4 w-full md:w-1/2">
          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center w-full px-4 py-2 border rounded-2xl gap-3">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search listings, orders, messages..."
              className="w-full outline-none bg-transparent text-gray-700"
            />
            <span className="text-xs px-2 py-1 rounded-md border bg-white text-gray-500">
              ⌘ K
            </span>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Notification */}
          <button className="relative w-10 h-10 rounded-xl flex items-center justify-center border bg-white hover:bg-gray-50 shadow-sm">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-purple-600 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
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

              {/* Name hidden on mobile */}
              <span className="hidden md:block font-medium text-gray-800">
                {seller?.name || "Seller"}
              </span>

              <ChevronDown className="hidden md:block w-4 h-4 text-gray-600" />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 min-w-max bg-white border rounded-xl shadow-xl z-50 animate-fadeIn">
                <div className="py-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                    Dashboard
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                    Edit Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                    Support
                  </button>
                  <hr className="my-1 border-gray-200" />
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium">
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex items-center w-full px-4 py-2 bg-gray-50 border rounded-2xl gap-3">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </div>
      </div>
    </header>
  );
};

export default SellerDashboardHero;
