import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { assets } from "../../assets/data";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRegisterUserMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);

  // Yup Validation Schema
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleGoogleSignUp = () => {
    toast("Google Sign-In coming soon 🚀");
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

          {/* Formik Wrapper */}
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const res = await registerUser(values).unwrap();

                toast.success(
                  res.message || "Account created! Check your email for OTP."
                );

                resetForm();
                navigate("/verify-user", { state: { email: values.email } });
              } catch (error) {
                toast.error(error?.data?.message || "Registration failed!");
                console.error(error);
              }
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="relative">
                  <label className="block mb-1 font-medium text-gray-700">
                    Full Name
                  </label>
                  <FaUser className="absolute left-3 top-[42px] text-gray-400 text-sm" />
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block mb-1 font-medium text-gray-700">
                    Email
                  </label>
                  <FaEnvelope className="absolute left-3 top-[42px] text-gray-400 text-sm" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name="email"
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

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-200 text-sm"
                >
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

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
