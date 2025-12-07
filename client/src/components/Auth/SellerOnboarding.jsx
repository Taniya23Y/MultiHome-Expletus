/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Step1SellerForm from "./Step1SellerForm";
import Step1VerifyOtp from "./Step1VerifyOtp";
import Step2CreateShop from "./Step2CreateShop";
import Step3BankSetup from "./Step3BankSetup";

const SellerOnboarding = () => {
  const [step, setStep] = useState(1);
  const [phoneForOtp, setPhoneForOtp] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  const [shopId, setShopId] = useState(null);

  const next = (payload) => {
    if (payload?.phone) setPhoneForOtp(payload.phone);
    if (payload?.sellerId) setSellerId(payload.sellerId);
    if (payload?.shopId) setShopId(payload.shopId);
    setStep((s) => Math.min(4, s + 1));
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Stepper */}
        <div className="col-span-1 bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm">
          <VerticalStepper step={step} />
        </div>

        {/* Right Side: Form Content */}
        <div className="col-span-2 p-6 bg-white rounded-2xl shadow-sm min-h-[450px] animate-fadeIn">
          {step === 1 && <Step1SellerForm onNext={next} />}

          {step === 2 && (
            <Step1VerifyOtp
              phone={phoneForOtp}
              onVerified={(seller) => {
                if (seller?.sellerId) setSellerId(seller.sellerId);
                next();
              }}
              onBack={back}
            />
          )}

          {step === 3 && <Step2CreateShop onNext={next} onBack={back} />}

          {step === 4 && (
            <Step3BankSetup
              onBack={back}
              onComplete={() => (window.location.href = "/become-a-seller")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------
      Vertical Stepper UI
------------------------------- */
const VerticalStepper = ({ step }) => {
  const steps = [
    { label: "Basic Details", id: 1 },
    { label: "Verify OTP", id: 2 },
    { label: "Create Shop", id: 3 },
    { label: "Bank Setup", id: 4 },
  ];

  return (
    <div className="relative flex flex-col">
      {/* Vertical Line */}
      <div className="absolute left-5 top-0 h-full w-[3px] bg-gray-300 rounded-lg"></div>

      {steps.map((s, index) => {
        const isActive = s.id === step;
        const isCompleted = s.id < step;

        return (
          <div key={s.id} className="flex items-start gap-4 mb-10 relative">
            {/* Step Circle */}
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center z-10 border 
                ${isCompleted ? "bg-green-500 text-white border-green-500" : ""}
                ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-110"
                    : ""
                }
                ${
                  !isActive && !isCompleted
                    ? "bg-gray-200 text-gray-600 border-gray-300"
                    : ""
                }
                transition-all duration-300
              `}
            >
              {isCompleted ? "✓" : s.id}
            </div>

            {/* Step Label */}
            <div className="flex flex-col">
              <span className="text-xs uppercase text-gray-400">
                Step {s.id}
              </span>
              <span
                className={`text-lg font-semibold ${
                  isActive ? "text-indigo-600" : "text-gray-700"
                }`}
              >
                {s.label}
              </span>

              {/* Status Tag */}
              {isCompleted && (
                <span className="text-green-600 text-xs mt-1">Completed</span>
              )}
              {isActive && (
                <span className="text-indigo-500 text-xs mt-1">
                  In Progress
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SellerOnboarding;
