import React, { useState } from "react";
import { toast } from "react-toastify";
import { useVerifySellerOTPMutation } from "../../redux/features/seller/sellerApi";

const Step1VerifyOtp = ({ phone, onVerified, onBack }) => {
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifySellerOTPMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    try {
      const res = await verifyOtp({ phone, otp }).unwrap();
      toast.success("Phone verified successfully!");
      onVerified?.(res);
    } catch (err) {
      toast.error(err?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-extrabold text-center mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Verify OTP
      </h2>

      <p className="text-center text-gray-600 mb-6">
        We sent a 6-digit OTP to <span className="font-semibold">{phone}</span>
      </p>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-xl shadow-md"
      >
        {/* OTP Input */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Enter OTP
          </label>

          <input
            type="text"
            value={otp}
            maxLength={6}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="••••••"
            className="w-full text-center text-2xl tracking-widest font-bold py-3 border rounded-lg 
                       focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-2/3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer font-semibold rounded-lg 
                        transition disabled:opacity-60"
          >
            {isLoading ? "Verifying..." : "Verify & Continue"}
          </button>
        </div>
      </form>

      {/* Resend OTP */}
      <div className="mt-4 text-center">
        <button className="text-indigo-600 cursor-pointer font-medium hover:underline">
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default Step1VerifyOtp;
