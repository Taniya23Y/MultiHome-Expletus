/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Store, Rocket, Shield } from "lucide-react";

import Button from "../components/UI/Button";

const SellerHome = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-emerald-500 to-blue-700 text-white py-28 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4"
        >
          Sell Your Property on MultiHome
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg max-w-2xl mx-auto"
        >
          List your properties on India’s trusted real-estate marketplace and
          connect instantly with verified buyers and renters. Reach verified
          customers and grow your business effortlessly.
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why List Your Property on MultiHome?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
          >
            <Store className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Grow Your Business</h3>
            <p className="text-gray-600">
              Reach thousands of genuine buyers and renters actively searching
              for properties.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
          >
            <Rocket className="w-12 h-12 text-emerald-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              List Your Property in Minutes
            </h3>
            <p className="text-gray-600">
              Upload property details, photos, and pricing — start getting buyer
              and renter inquiries instantly.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100"
          >
            <Shield className="w-12 h-12 text-blue-700 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Verified & Secure Marketplace
            </h3>
            <p className="text-gray-600">
              MultiHome verifies users and ensures secure communication between
              sellers, buyers, and renters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Account Creation Section */}
      <section className="py-20 bg-gray-100 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Create Your Seller Account
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Service Category
              </label>
              <select className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-600 outline-none">
                <option>Select a category</option>
                <option>Electrician</option>
                <option>Plumber</option>
                <option>Carpenter</option>
                <option>Cleaning Services</option>
                <option>Mechanic</option>
                <option>Painter</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition"
            >
              Create Account
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
export default SellerHome;
