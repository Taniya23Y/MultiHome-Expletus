import { Bell, Menu, Moon, Search, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";

const SellerDashboardHero = () => {
  const { seller } = useSelector((state) => state.sellerAuth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getInitial = (name) => {
    if (!name) return "S";
    return name.charAt(0).toUpperCase();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white border-b">
      <div className="flex items-center justify-between px-6 py-4">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4 w-1/2">
          <button className="p-3 rounded-xl border bg-white hover:bg-gray-50">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center w-full px-4 py-2 bg-white border rounded-2xl gap-3">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search or type command..."
              className="w-full outline-none text-gray-600 placeholder-gray-400"
            />
            <span className="text-xs px-2 py-1 rounded-lg border text-gray-500">
              ⌘ K
            </span>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">
          <button className="w-10 h-10 rounded-full flex items-center justify-center border bg-white hover:bg-gray-50">
            <Moon className="w-5 h-5 text-gray-700" />
          </button>

          <button className="relative w-10 h-10 rounded-full flex items-center justify-center border bg-white hover:bg-gray-50">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full"></span>
          </button>

          {/* Profile Section */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {seller?.profileImage ? (
                <img
                  src={seller.profileImage}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Seller"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                  {getInitial(seller?.name)}
                </div>
              )}
              <span className="font-medium text-gray-800">
                {seller?.name || "Seller"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800">
                    Edit profile
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800">
                    Account settings
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800">
                    Support
                  </button>
                  <hr className="my-1 border-gray-200" />
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800">
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboardHero;
