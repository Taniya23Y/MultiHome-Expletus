import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronDown,
  Star,
  LogIn,
  CreditCard,
  LayoutGrid,
} from "lucide-react";
import Button from "../../../UI/Button";
import { Link } from "react-router-dom";

export default function NavbarMobile({ isMenuOpen, setIsMenuOpen, megaMenus }) {
  const menuItems = Object.keys(megaMenus);

  // State for the currently open menu
  const [activeMenu, setActiveMenu] = useState(null);

  // Set first menu open only on the first mount
  useEffect(() => {
    if (isMenuOpen && activeMenu === null && menuItems.length > 0) {
      setActiveMenu(menuItems[0]);
    }
  }, [isMenuOpen, activeMenu, menuItems]);

  if (!isMenuOpen) return null;

  const toggleMenu = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="md:hidden fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-50 max-h-[89vh] overflow-y-auto">
        <div
          className="mx-1 mt-2 rounded-xl border border-purple-900/30"
          style={{
            background: "linear-gradient(180deg, #1a1a2e 0%, #16161e 100%)",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <nav className="flex flex-col p-3 space-y-2">
            {menuItems.map((id) => {
              const menu = megaMenus[id];
              return (
                <div key={id} className="flex flex-col">
                  {/* Top-level menu button */}
                  <button
                    onClick={() => toggleMenu(id)}
                    className="flex items-center justify-between py-2 px-3 text-gray-200 rounded-lg hover:bg-gray-800 transition-all duration-200"
                  >
                    <span className="font-medium text-sm">{menu.title}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeMenu === id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Expanded sub-menu */}
                  {activeMenu === id && (
                    <div className="ml-4 mt-2 space-y-2">
                      {menu.columns.map((col, idx) => (
                        <div key={idx}>
                          <h4 className="text-gray-400 text-xs font-semibold mb-1">
                            {col.title}
                          </h4>
                          <div className="flex flex-col space-y-1">
                            {col.items.map((item, index) => (
                              <a
                                key={index}
                                href={item.href || "#"}
                                className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-800 text-gray-200 text-sm"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {item.icon}
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {item.title}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {item.description}
                                  </span>
                                </div>
                                <ChevronRight className="ml-auto h-3 w-3 text-gray-500" />
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Featured CTA */}
                      {menu.featured && (
                        <a
                          href={menu.featured.ctaLink || "#"}
                          className="mt-2 flex items-center justify-between py-2 px-3 bg-purple-700/70 rounded-lg text-white font-medium hover:bg-purple-600 transition-all duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {menu.featured.ctaText}
                          <ChevronRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Main navigation links */}
            <div className="mb-3 pb-3 border-b border-gray-800/50">
              <div className="grid grid-cols-2 gap-1">
                <Link
                  to="/about"
                  className="flex items-center py-2 px-3 text-gray-200 rounded-lg hover:bg-gray-800 transition-all duration-200 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutGrid className="h-4 w-4 text-indigo-400 mr-2 group-hover:text-indigo-300 transition-colors" />
                  <span className="font-medium text-sm">About</span>
                </Link>
                <Link
                  to="/pricing-info"
                  className="flex items-center py-2 px-3 text-gray-200 rounded-lg hover:bg-gray-800 transition-all duration-200 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <CreditCard className="h-4 w-4 text-indigo-400 mr-2 group-hover:text-indigo-300 transition-colors" />
                  <span className="font-medium text-sm">Pricing</span>
                </Link>
                <Link
                  to="/get-helps"
                  className="flex items-center py-2 px-3 text-gray-200 rounded-lg hover:bg-gray-800 transition-all duration-200 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Star className="h-4 w-4 text-indigo-400 mr-2 group-hover:text-indigo-300 transition-colors" />
                  <span className="font-medium text-sm">Get Help</span>
                </Link>
                <div
                  className="flex items-center py-2 px-3 text-gray-200 rounded-lg hover:bg-gray-800 transition-all duration-200 group cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4 text-gray-400 mr-2 group-hover:text-gray-300 transition-colors" />
                  <span className="font-medium text-sm">Log in</span>
                </div>
              </div>
            </div>

            {/* Get Started button */}
            <Button
              className="w-full py-3 my-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm hover:from-purple-700 hover:to-pink-600 shadow-lg shadow-purple-700/25 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
              <ChevronRight className="h-3 w-3" />
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
}
