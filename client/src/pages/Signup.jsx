import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { assets } from "../assets/data";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Account created for ${name}!`);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleGoogleSignUp = () => {
    alert("Google Sign-In coming soon 🚀");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Section (hidden on mobile) */}
      <div className="hidden md:flex flex-1 relative flex-col justify-center items-center text-center p-8 overflow-hidden">
        <img
          src={assets.bgImage}
          alt="Home and Services"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-700/70 to-black/70" />
        <div className="relative z-10 max-w-md px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-snug">
            Join <span className="text-green-300">MultiHome</span> Today
          </h1>
          <p className="text-gray-200 text-base sm:text-lg mb-6 leading-relaxed">
            Unlock access to all your{" "}
            <span className="font-semibold text-white">home services</span> in
            one trusted platform. Build your dream home, hire experts, and
            simplify your living — all in one place.
          </p>
          <p className="text-sm text-gray-300 italic">
            “Create your account and start exploring the smarter way to manage
            your home.”
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md transition-transform hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Name
              </label>
              <FaUser className="absolute left-3 top-[42px] text-gray-400 text-sm" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

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
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
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
                placeholder="Create a password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 cursor-pointer top-[38px] text-gray-500 hover:text-green-500 transition text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200 text-sm"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex cursor-pointer items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700"
          >
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>

          {/* Links */}
          <p className="text-center text-sm mt-5 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-green-500 cursor-pointer hover:underline font-medium"
            >
              Sign In
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

export default SignUp;
