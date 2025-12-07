import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSellerLogoutMutation } from "../../../../redux/features/seller/sellerApi";
import { sellerLogoutState } from "../../../../redux/features/seller/sellerAuthSlice";

export default function SellerNavbarActions({ isMenuOpen, setIsMenuOpen }) {
  const { seller } = useSelector((state) => state.sellerAuth);
  const isLoggedIn = Boolean(seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sellerLogout] = useSellerLogoutMutation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await sellerLogout().unwrap();
      dispatch(sellerLogoutState());
      setDropdownOpen(false);
      navigate("/become-a-seller");
    } catch (err) {
      console.error("Seller Logout failed:", err);
    }
  };

  return (
    <div className="flex items-center relative">
      {/* Desktop Buttons */}
      {!isLoggedIn && (
        <div className="hidden md:flex gap-2">
          <Link to="/seller-login">
            <button className="flex items-center justify-center w-16 h-10 border-1 border-gray-200 text-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold">
              Login
            </button>
          </Link>

          <Link to="/seller/onboarding">
            <button className="w-24 h-10 rounded-md cursor-pointer font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:text-black transition-colors duration-300 shadow-sm">
              signup
            </button>
          </Link>
        </div>
      )}

      {/* Logged In User Avatar */}
      {isLoggedIn && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-black font-semibold cursor-pointer shadow-sm hover:ring-2 hover:ring-gray-300"
          >
            {seller?.avatar ? (
              <img
                src={seller.avatar}
                className="w-full h-full rounded-full object-cover cursor-pointer"
              />
            ) : (
              seller?.name?.[0]?.toUpperCase()
            )}
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border shadow-xl rounded-xl p-2 animate-fadeIn z-50">
              <div className="px-3 py-2 text-sm text-gray-600 border-b">
                Hello, <span className="font-medium">{seller?.name}</span>
              </div>

              <Link
                to="/seller/dashboard"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  Dashboard
                </div>
              </Link>

              <div
                onClick={handleLogout}
                className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-red-500"
              >
                Logout
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu Hamburger */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="cursor-pointer md:hidden p-2"
      >
        {isMenuOpen ? <X /> : <Menu />}
      </button>
    </div>
  );
}
