import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { assets } from "../../assets/data";
import { useVerifyUserMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [verifyUser, { isLoading }] = useVerifyUserMutation();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    navigate("/signup");
    return null;
  }

  // Yup Validation Schema
  const OtpSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers allowed")
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Section (Same as SignUp) */}
      <div className="hidden md:flex flex-1 relative justify-center items-center text-center p-8 overflow-hidden">
        <img
          src={assets.bgImage}
          alt="Home and Services"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-700/70 to-black/70" />
        <div className="relative z-10 max-w-md px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-snug">
            Verify Your <span className="text-green-300">Email</span>
          </h1>
          <p className="text-gray-200 text-base sm:text-lg mb-6 leading-relaxed">
            Enter the 6-digit OTP sent to your registered email address to
            activate your MultiHome account.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 w-full max-w-md transition-transform hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Email Verification
          </h2>

          {/* Formik OTP Form */}
          <Formik
            initialValues={{ otp: "" }}
            validationSchema={OtpSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const payload = { email, otp: values.otp.trim() };

                const res = await verifyUser(payload).unwrap();
                toast.success(res.message || "Email Verified Successfully!");

                resetForm();

                //  Navigate to Login Page
                navigate("/login");
              } catch (error) {
                toast.error(error?.data?.message || "OTP verification failed!");
              }
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="space-y-5">
                {/* OTP Input */}
                <div className="relative text-center">
                  <label className="block mb-1 font-medium text-gray-700">
                    Enter 6-Digit OTP
                  </label>

                  <Field
                    type="text"
                    name="otp"
                    maxLength={6}
                    placeholder="******"
                    className="w-full tracking-[0.6em] text-center text-lg font-bold py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  />

                  <ErrorMessage
                    name="otp"
                    component="p"
                    className="text-red-500 text-xs mt-1 text-left"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-200 text-sm"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Resend Link */}
          <p className="text-center text-sm mt-5 text-gray-500">
            Didn't receive code?{" "}
            <button className="text-blue-600 font-medium hover:underline">
              Resend OTP
            </button>
          </p>

          <p className="text-center text-xs mt-3 text-gray-400 hover:text-gray-600 transition">
            <Link to="/">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
