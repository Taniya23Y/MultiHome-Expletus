import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { assets } from "../assets/data";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    businessName: "",
    preferredLocation: "",
    propertyType: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Future: send to backend (JWT + MongoDB)
    console.log("SignUp Data:", formData);
    alert(`Account created for ${formData.name} as ${formData.role}`);
  };

  const handleGoogleSignUp = () => {
    alert("Google Sign-In coming soon 🚀");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Section */}
      <div className="hidden md:flex flex-1 relative justify-center items-center text-center p-8 overflow-hidden">
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
            Explore, list, and manage properties — all in one trusted platform.
            Whether you’re a{" "}
            <span className="font-semibold text-white">buyer</span>,{" "}
            <span className="font-semibold text-white">seller</span>, or{" "}
            <span className="font-semibold text-white">agent</span> — we’ve got
            you covered.
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
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Full Name
              </label>
              <FaUser className="absolute left-3 top-[42px] text-gray-400 text-sm" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <FaEnvelope className="absolute left-3 top-[42px] text-gray-400 text-sm" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Phone
              </label>
              <FaPhone className="absolute left-3 top-[42px] text-gray-400 text-sm" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Role */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                I am a...
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full py-2 border border-gray-300 rounded-lg text-sm px-3 focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Role</option>
                <option value="buyer">Buyer / Renter</option>
                <option value="seller">Property Owner / Seller</option>
                <option value="agent">Agent / Professional</option>
              </select>
            </div>

            {/* Conditional Fields */}
            {formData.role === "seller" && (
              <>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-[42px] text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Business or Company Name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-[42px] text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    placeholder="Property Type (e.g., Apartment, Villa)"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </>
            )}

            {formData.role === "buyer" && (
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-[42px] text-gray-400 text-sm" />
                <input
                  type="text"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                  placeholder="Preferred Location (e.g., Indore, Bhopal)"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <FaLock className="absolute left-3 top-[42px] text-gray-400 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-blue-500 transition text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-[9px] text-gray-400 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[9px] text-gray-500 hover:text-blue-500 transition text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-200 text-sm"
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
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700"
          >
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>

          {/* Links */}
          <p className="text-center text-sm mt-5 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:underline font-medium"
            >
              Login
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
