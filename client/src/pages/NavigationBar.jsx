/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Home,
  Search,
  Users,
  MessageCircle,
  Sparkles,
  BotMessageSquare,
  Bell,
  Settings,
  UserCircle,
  Heart,
  Zap,
  Crown,
} from "lucide-react";
import logo from "../assets/home-regular-24.png";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

// Enhanced Animation Variants
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 25,
    },
  },
};

const floatingAnimation = {
  y: [-2, 2, -2],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const glowAnimation = {
  boxShadow: [
    "0 0 20px rgba(59, 130, 246, 0.2)",
    "0 0 40px rgba(59, 130, 246, 0.4)",
    "0 0 20px rgba(59, 130, 246, 0.2)",
  ],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const sparkleVariants = {
  animate: {
    scale: [1, 1.3, 1],
    rotate: [0, 180, 360],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const NavigationBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications] = useState(3); // Example notification count
  const dropdownRef = useRef(null);
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();

  // Handle click outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 shadow-xl backdrop-blur-xl border-b border-gray-200/50"
          : "bg-white/90 backdrop-blur-lg border-b border-gray-100/80"
      }`}
    >
      {/* Premium gradient border */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              variants={logoVariants}
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                scale: 1.1,
                ...glowAnimation,
              }}
              transition={{ duration: 0.5 }}
              className="relative p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg group-hover:shadow-blue-500/30"
            >
              <img
                src={logo}
                alt="BuildEstate logo"
                className="w-6 h-6 brightness-0 invert"
              />
              {/* Floating sparkles */}
              <motion.div
                animate={floatingAnimation}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-3 h-3 text-yellow-300" />
              </motion.div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500">
                BuildEstate
              </span>
              <span className="text-xs text-gray-500 font-medium -mt-1">
                Premium Properties
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks currentPath={location.pathname} />

            {/* Enhanced Auth Section */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  {/* Notification Bell */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Bell className="w-5 h-5 text-gray-600" />
                    {notifications > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                      >
                        {notifications}
                      </motion.span>
                    )}
                  </motion.button>

                  {/* User Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={toggleDropdown}
                      className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none"
                      aria-label="User menu"
                      aria-expanded={isDropdownOpen}
                    >
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/30"
                        >
                          {getInitials(user?.name)}
                        </motion.div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                        </div>
                      </div>
                      <div className="hidden lg:flex flex-col items-start">
                        <span className="text-sm font-semibold text-gray-700">
                          {user?.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          Premium Member
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    </motion.button>

                    {/* Enhanced Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                        >
                          {/* Header */}
                          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                                {getInitials(user?.name)}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-gray-900">
                                  {user?.name}
                                </p>
                                <p className="text-xs text-gray-600 truncate">
                                  {user?.email}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Crown className="w-3 h-3 text-yellow-500" />
                                  <span className="text-xs text-yellow-600 font-medium">
                                    Premium
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="py-2">
                            <motion.button
                              whileHover={{
                                x: 4,
                                backgroundColor: "rgb(243 244 246)",
                              }}
                              className="w-full px-6 py-3 text-left text-sm text-gray-700 hover:text-blue-600 flex items-center space-x-3 transition-colors"
                            >
                              <UserCircle className="w-4 h-4" />
                              <span>My Profile</span>
                            </motion.button>
                            <motion.button
                              whileHover={{
                                x: 4,
                                backgroundColor: "rgb(243 244 246)",
                              }}
                              className="w-full px-6 py-3 text-left text-sm text-gray-700 hover:text-blue-600 flex items-center space-x-3 transition-colors"
                            >
                              <Heart className="w-4 h-4" />
                              <span>Saved Properties</span>
                            </motion.button>
                            <motion.button
                              whileHover={{
                                x: 4,
                                backgroundColor: "rgb(243 244 246)",
                              }}
                              className="w-full px-6 py-3 text-left text-sm text-gray-700 hover:text-blue-600 flex items-center space-x-3 transition-colors"
                            >
                              <Settings className="w-4 h-4" />
                              <span>Settings</span>
                            </motion.button>
                            <div className="border-t border-gray-100 my-2" />
                            <motion.button
                              whileHover={{
                                x: 4,
                                backgroundColor: "rgb(254 242 242)",
                              }}
                              onClick={handleLogout}
                              className="w-full px-6 py-3 text-left text-sm text-red-600 hover:text-red-700 flex items-center space-x-3 transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Sign out</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
                    >
                      Sign in
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, ...glowAnimation }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/signup"
                      className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl shadow-blue-500/30 font-semibold overflow-hidden"
                    >
                      <span className="relative z-10">Get Started</span>
                      <motion.div
                        animate={sparkleVariants.animate}
                        className="absolute top-1 right-1"
                      >
                        <Sparkles className="w-3 h-3 text-yellow-300" />
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMobileMenu}
            className="md:hidden relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </motion.div>
            {isLoggedIn && notifications > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
              >
                {notifications}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-6">
              <MobileNavLinks
                setMobileMenuOpen={setIsMobileMenuOpen}
                isLoggedIn={isLoggedIn}
                user={user}
                handleLogout={handleLogout}
                currentPath={location.pathname}
                notifications={notifications}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLinks = ({ currentPath }) => {
  // Enhanced NavLinks with modern styling
  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
      color: "from-blue-500 to-cyan-500",
      description: "Welcome home",
    },
    {
      name: "Properties",
      path: "/properties",
      icon: Search,
      color: "from-green-500 to-emerald-500",
      description: "Find your dream",
    },
    {
      name: "About Us",
      path: "/about",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      description: "Our story",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: MessageCircle,
      color: "from-orange-500 to-red-500",
      description: "Get in touch",
    },
  ];

  // Special animation for sparkles
  const [sparkleKey, setSparkleKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkleKey((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const isAIHubActive = currentPath.startsWith("/ai-property-hub");

  return (
    <div className="flex space-x-2 items-center">
      {navLinks.map(({ name, path, icon: Icon, color, description }) => {
        const isActive =
          path === "/" ? currentPath === path : currentPath.startsWith(path);

        return (
          <motion.div
            key={name}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={path}
              className={`relative group font-medium transition-all duration-300 flex items-center gap-2 px-4 py-2.5 rounded-xl
                ${
                  isActive
                    ? `text-white bg-gradient-to-r ${color} shadow-lg shadow-blue-500/30`
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/80"
                }
              `}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive
                    ? "text-white"
                    : "text-gray-600 group-hover:text-blue-600"
                }`}
              />
              <span className="font-semibold">{name}</span>

              {/* Tooltip */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                  {description}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/10 border border-white/20"
                  initial={false}
                />
              )}
            </Link>
          </motion.div>
        );
      })}

      {/* Enhanced AI Property Hub Link */}
      <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/ai-property-hub"
          className={`relative group font-semibold transition-all duration-300 flex items-center gap-2.5 px-5 py-2.5 rounded-xl overflow-hidden ${
            isAIHubActive
              ? "text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl shadow-purple-500/40"
              : "text-indigo-700 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:text-white border border-indigo-200 hover:border-transparent"
          }`}
        >
          <div className="relative">
            <BotMessageSquare
              className={`w-5 h-5 ${
                isAIHubActive
                  ? "text-white"
                  : "text-indigo-600 group-hover:text-white"
              }`}
            />
            {/* Animated sparkles */}
            <motion.div
              key={sparkleKey}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-3 h-3 text-yellow-400" />
            </motion.div>
          </div>
          <span>AI Property Hub</span>

          {/* Premium badge */}
          {!isAIHubActive && (
            <motion.span
              animate={{
                opacity: [0.8, 1, 0.8],
                scale: [0.95, 1, 0.95],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-2"
            >
              <Zap className="w-2.5 h-2.5" />
              NEW
            </motion.span>
          )}

          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={isAIHubActive ? { x: [-100, 100] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Active indicator */}
          {isAIHubActive && (
            <motion.div
              layoutId="aiActiveIndicator"
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/10 border border-white/30"
              initial={false}
            />
          )}

          {/* Tooltip */}
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
              AI-powered property recommendations
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

const MobileNavLinks = ({
  setMobileMenuOpen,
  isLoggedIn,
  user,
  handleLogout,
  currentPath,
  notifications,
}) => {
  // Enhanced navigation links with colors and descriptions
  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
      color: "from-blue-500 to-cyan-500",
      description: "Welcome home",
    },
    {
      name: "Properties",
      path: "/properties",
      icon: Search,
      color: "from-green-500 to-emerald-500",
      description: "Find your dream",
    },
    {
      name: "About Us",
      path: "/about",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      description: "Our story",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: MessageCircle,
      color: "from-orange-500 to-red-500",
      description: "Get in touch",
    },
  ];

  const isAIHubActive = currentPath.startsWith("/ai-property-hub");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col space-y-3"
    >
      {/* Enhanced AI Property Hub for Mobile */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="px-2"
      >
        <Link
          to="/ai-property-hub"
          onClick={() => setMobileMenuOpen(false)}
          className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl shadow-lg transition-all duration-300 overflow-hidden ${
            isAIHubActive
              ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-purple-500/30"
              : "bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 text-indigo-700 border-2 border-indigo-100"
          }`}
        >
          <div className="relative">
            <motion.div
              animate={floatingAnimation}
              className={`p-2.5 rounded-xl ${
                isAIHubActive ? "bg-white/20" : "bg-indigo-100"
              }`}
            >
              <BotMessageSquare
                className={`w-6 h-6 ${
                  isAIHubActive ? "text-white" : "text-indigo-600"
                }`}
              />
            </motion.div>
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          </div>
          <div className="flex-1">
            <div className="font-bold text-lg">AI Property Hub</div>
            <div
              className={`text-sm ${
                isAIHubActive ? "text-indigo-100" : "text-indigo-500"
              }`}
            >
              Smart property recommendations
            </div>
          </div>
          {!isAIHubActive && (
            <motion.span
              animate={{ scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
            >
              <Zap className="w-3 h-3" />
              NEW
            </motion.span>
          )}

          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0"
            animate={
              isAIHubActive ? { x: [-100, 100], opacity: [0, 0.3, 0] } : {}
            }
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </Link>
      </motion.div>

      {/* Elegant separator */}
      <div className="flex items-center gap-4 px-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <span className="text-xs text-gray-400 font-medium">Navigation</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Enhanced Navigation Links */}
      {navLinks.map(({ name, path, icon: Icon, color, description }, index) => {
        const isActive =
          path === "/" ? currentPath === path : currentPath.startsWith(path);

        return (
          <motion.div
            key={name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Link
              to={path}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive
                  ? `bg-gradient-to-r ${color} text-white shadow-lg`
                  : "text-gray-700 hover:bg-gray-50 active:scale-95"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className={`p-2 rounded-lg ${
                  isActive
                    ? "bg-white/20"
                    : "bg-gray-100 group-hover:bg-blue-100"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 group-hover:text-blue-600"
                  }`}
                />
              </div>
              <div className="flex-1">
                <div
                  className={`font-semibold ${
                    isActive ? "text-white" : "text-gray-900"
                  }`}
                >
                  {name}
                </div>
                <div
                  className={`text-sm ${
                    isActive ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {description}
                </div>
              </div>
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              )}
            </Link>
          </motion.div>
        );
      })}

      {/* Enhanced Auth Section for Mobile */}
      <div className="pt-4 mt-2">
        <div className="flex items-center gap-4 px-2 mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <span className="text-xs text-gray-400 font-medium">Account</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {isLoggedIn ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-4 px-2"
          >
            {/* Enhanced User Profile Card */}
            <div className="relative p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 overflow-hidden">
              <div className="flex items-center space-x-4 relative z-10">
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  >
                    {user?.name ? user.name[0].toUpperCase() : "U"}
                  </motion.div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                  </div>
                  {notifications > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {notifications}
                    </motion.div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {user?.email}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-yellow-600 font-semibold">
                      Premium Member
                    </span>
                  </div>
                </div>
              </div>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full transform translate-x-6 -translate-y-6" />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <Heart className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Saved</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Settings
                </span>
              </motion.button>
            </div>

            {/* Logout Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-all font-semibold"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign out</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col space-y-3 px-2"
          >
            <motion.div whileTap={{ scale: 0.97 }}>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold"
              >
                Sign in
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.97 }}>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="relative w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all font-semibold shadow-lg shadow-blue-500/30 overflow-hidden"
              >
                <span className="relative z-10">Create account</span>
                <motion.div
                  animate={sparkleVariants.animate}
                  className="absolute top-2 right-2"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

NavLinks.propTypes = {
  currentPath: PropTypes.string.isRequired,
};

MobileNavLinks.propTypes = {
  setMobileMenuOpen: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
  notifications: PropTypes.number,
};

export default NavigationBar;
