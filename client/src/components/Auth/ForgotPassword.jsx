import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useForgotPasswordMutation,
  useVerifyForgotPasswordMutation,
  useResetPasswordMutation,
} from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { assets } from "../../assets/data";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp] = useVerifyForgotPasswordMutation();
  const [resetPassword] = useResetPasswordMutation();

  const EmailSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
  });

  const OtpSchema = Yup.object().shape({
    otp: Yup.string().min(4).max(6).required("OTP is required"),
  });

  const ResetSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("New password required"),
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
            Welcome to <span className="text-green-300">MultiHome</span>
          </h1>
          <p className="text-gray-200 text-base sm:text-lg mb-6 leading-relaxed">
            Access your home services and properties at one place.
          </p>
        </div>
      </div>

      {/* right-section */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-md transition-transform hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Forgot Password
          </h2>

          {/* STEP 1 - Email */}
          {step === 1 && (
            <Formik
              initialValues={{ email: "" }}
              validationSchema={EmailSchema}
              onSubmit={async (values) => {
                try {
                  const res = await forgotPassword(values).unwrap();
                  toast.success(res.message);
                  setEmail(values.email);
                  setStep(2);
                } catch (err) {
                  toast.error(err?.data?.message || "Error sending OTP");
                }
              }}
            >
              <Form className="space-y-4">
                <div className="relative">
                  <label className="block mb-1 font-medium text-gray-700">
                    Email
                  </label>
                  <FaEnvelope className="absolute left-3 top-[42px] text-gray-400 text-sm" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-200 text-sm"
                >
                  Send OTP
                </button>
              </Form>
            </Formik>
          )}

          {/* STEP 2 - Verify OTP */}
          {step === 2 && (
            <Formik
              initialValues={{ otp: "" }}
              validationSchema={OtpSchema}
              onSubmit={async (values) => {
                try {
                  const res = await verifyOtp({
                    email,
                    otp: values.otp,
                  }).unwrap();
                  toast.success(res.message);
                  setStep(3);
                } catch (err) {
                  toast.error(err?.data?.message || "OTP verification failed");
                }
              }}
            >
              <Form className="space-y-4">
                <div className="relative">
                  <label className="font-medium">Enter OTP</label>
                  <Field
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name="otp"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer bg-purple-600 text-white py-2 rounded-lg"
                >
                  Verify OTP
                </button>
              </Form>
            </Formik>
          )}

          {/* STEP 3 - Reset Password */}
          {step === 3 && (
            <Formik
              initialValues={{ newPassword: "" }}
              validationSchema={ResetSchema}
              onSubmit={async (values) => {
                try {
                  const res = await resetPassword({
                    email,
                    newPassword: values.newPassword,
                  }).unwrap();

                  toast.success(res.message);

                  // Redirect to login after success
                  setTimeout(() => {
                    navigate("/login");
                  }, 1200);
                } catch (err) {
                  toast.error(err?.data?.message || "Password reset failed");
                }
              }}
            >
              <Form className="space-y-4">
                <div className="relative">
                  <label className="font-medium">New Password</label>
                  <FaLock className="absolute left-3 top-[38px] text-gray-400 text-sm" />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
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
                    name="newPassword"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer bg-green-600 text-white py-2 rounded-lg"
                >
                  Reset Password
                </button>
              </Form>
            </Formik>
          )}

          {/* STEP 4 (No longer used because we redirect) */}
          {step === 4 && (
            <p className="text-center text-green-600 font-semibold">
              Password reset successful!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
