import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { assets } from "../../assets/data";

import {
  useVerifySellerOTPMutation,
  useSendSellerOTPMutation,
} from "../../redux/features/seller/sellerApi";

const SellerVerifyPhone = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [verifyOtp, { isLoading }] = useVerifySellerOTPMutation();
  const [resendOtp] = useSendSellerOTPMutation();

  const phone = location.state?.phone;

  if (!phone) {
    navigate("/seller-create");
    return null;
  }

  const OtpSchema = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9]{6}$/, "Enter a valid 6-digit OTP")
      .required("OTP is required"),
  });

  const handleResend = async () => {
    try {
      await resendOtp({ phone }).unwrap();
      toast.success("OTP resent successfully!");
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* LEFT */}
      <div className="hidden md:flex flex-1 relative items-center justify-center text-center p-8">
        <img
          src={assets.bgImage}
          alt="Seller Verification"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-700/70 to-black/70" />

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-extrabold text-white mb-4 leading-snug">
            Verify Your <span className="text-green-300">Phone Number</span>
          </h1>

          <p className="text-gray-200 text-lg">
            Enter the OTP sent to <b>{phone}</b>
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Phone Verification
          </h2>

          <Formik
            initialValues={{ otp: "" }}
            validationSchema={OtpSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const payload = { phone, otp: values.otp.trim() };
                const res = await verifyOtp(payload).unwrap();

                toast.success(res.message || "Phone Verified!");
                resetForm();
                navigate("/profile");
              } catch (err) {
                toast.error(err?.data?.message || "Invalid OTP");
              }
            }}
          >
            {() => (
              <Form className="space-y-5">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Enter 6-Digit OTP
                  </label>

                  <Field
                    name="otp"
                    maxLength={6}
                    placeholder="••••••"
                    className="w-full text-center tracking-widest text-xl font-bold py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                  <ErrorMessage
                    name="otp"
                    component="p"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm mt-5">
            Didn't get the code?{" "}
            <button
              onClick={handleResend}
              className="text-blue-600 hover:underline font-medium"
            >
              Resend OTP
            </button>
          </p>

          <p className="text-center text-xs mt-3 text-gray-500">
            <Link to="/seller-create">← Back to Seller Creation</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerVerifyPhone;
