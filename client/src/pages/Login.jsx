import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { assets } from "../assets/data";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signed in with Email: ${email}`);
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In coming soon 🚀");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Section */}
      <div className="hidden md:flex flex-1 relative flex-col justify-center items-center text-center p-8 overflow-hidden">
        <img
          src={assets.bgImage}
          alt="Home and Services"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-700/70 to-black/70" />
        <div className="relative z-10 max-w-md px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-snug">
            Welcome to <span className="text-green-300">MultiHome</span>
          </h1>
          <p className="text-gray-200 text-base sm:text-lg mb-6 leading-relaxed">
            Discover a smarter way to{" "}
            <span className="font-semibold text-white">find homes</span> and
            access all your{" "}
            <span className="font-semibold text-white">home services</span> in
            one place.
          </p>
          <p className="text-sm text-gray-300 italic">
            “Sign in to explore the easiest way to manage your home journey.”
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-md transition-transform hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <FaEnvelope className="absolute left-3 top-[42px] text-gray-400 text-sm" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <FaLock className="absolute left-3 top-[42px] text-gray-400 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-3 top-[38px] text-gray-500 hover:text-blue-500 transition text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200 text-sm"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center cursor-pointer justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          {/* Links */}
          <p className="text-center text-sm mt-5 text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent cursor-pointer hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>

          <p className="text-center text-xs mt-3 text-gray-400 hover:text-gray-600 transition">
            <Link to="/">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
