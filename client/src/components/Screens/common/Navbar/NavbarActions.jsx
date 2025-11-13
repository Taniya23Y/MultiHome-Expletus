import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavbarActions({ isMenuOpen, setIsMenuOpen }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        {/* Login */}
        <Link to="/login" className="hidden md:block">
          <button className="flex items-center justify-center w-16 h-10 border-1 border-gray-200 text-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold">
            Login
          </button>
        </Link>

        {/* Get Started Button */}
        <Link to="/signup" className="hidden md:block">
          <button className="w-24 h-10 rounded-md cursor-pointer font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:text-black transition-colors duration-300 shadow-sm">
            signup
          </button>
        </Link>
      </div>

      {/* Mobile Menu Toggle (Visible only on small screens) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-black hover:bg-black hover:text-white rounded-xl p-2"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 cursor-pointer" />
        ) : (
          <Menu className="h-6 w-6 cursor-pointer" />
        )}
      </button>
    </div>
  );
}
