/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSellerLoginMutation } from "../../redux/features/seller/sellerApi";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { assets } from "../../assets/data";

const SellerLogin = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [sellerLogin, { isLoading }] = useSellerLoginMutation();

  const LoginSchema = Yup.object().shape({
    emailOrPhone: Yup.string().required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

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
            Welcome to <span className="text-green-300">Seller MultiHome</span>
          </h1>
          <p className="text-gray-200 text-base sm:text-lg mb-6 leading-relaxed">
            Sell your home services and properties at one place.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-md transition-transform hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Seller Sign In
          </h2>

          <Formik
            initialValues={{ emailOrPhone: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                // const res = await sellerLogin(values).unwrap();
                const res = await sellerLogin({
                  email: values.emailOrPhone,
                  phone: values.emailOrPhone,
                  password: values.password,
                }).unwrap();

                toast.success(res.message || "Seller Login Successful!");

                resetForm();

                navigate("/become-a-seller");
              } catch (error) {
                toast.error(error?.data?.message || "Invalid credentials!");
              }
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="relative">
                  <label className="block mb-1 font-medium text-gray-700">
                    Email
                  </label>
                  <FaEnvelope className="absolute left-3 top-[42px] text-gray-400 text-sm" />
                  <Field
                    type="email"
                    name="emailOrPhone"
                    placeholder="Enter your email or phone"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name="emailOrPhone"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="block mb-1 font-medium text-gray-700">
                    Password
                  </label>
                  <FaLock className="absolute left-3 top-[42px] text-gray-400 text-sm" />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] text-gray-500 hover:text-blue-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                  {/* Forgot Password Link */}
                  <div className="text-right ">
                    <Link
                      to="/seller-forgot-password"
                      className="text-sm  text-blue-700 hover:underline hover:text-blue-500"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-200 text-sm"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
          <p
            onClick={() => navigate("/seller/create")}
            className="text-center mt-3 text-indigo-600 cursor-pointer"
          >
            Create a seller account
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
