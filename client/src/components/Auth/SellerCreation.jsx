import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaStore,
  FaMapMarkerAlt,
  FaLock,
  FaCode,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../../assets/data";
import { FaMapPin } from "react-icons/fa6";
import {
  useCreateSellerMutation,
  useSendSellerOTPMutation,
} from "../../redux/features/seller/sellerApi";

const SellerCreation = () => {
  const navigate = useNavigate();
  const [createSeller, { isLoading }] = useCreateSellerMutation();
  const [sendOtp] = useSendSellerOTPMutation();
  const [showPassword, setShowPassword] = useState(false);

  const SellerSchema = Yup.object().shape({
    name: Yup.string().required("Full name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    phone: Yup.string().min(10).required("Phone is required"),
    password: Yup.string().min(6).required("Password is required"),
    businessName: Yup.string().required("Business name required"),
    area: Yup.string().required("Area required"),
    address: Yup.string().required("Address is required"),
    pincode: Yup.string().required("Pincode required"),
    referralCodeInput: Yup.string().optional(),
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Section */}
      <div className="hidden md:flex flex-1 relative justify-center items-center text-center p-8">
        <img
          src={assets.bgImage}
          alt="Seller"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-700/70 to-black/70" />
        <div className="relative z-10 max-w-md px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Become a <span className="text-green-300">Verified Seller</span>
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed">
            Start listing properties, manage clients and grow your real estate
            business.
          </p>
          <p className="text-sm text-gray-300 italic">
            “Create your seller account and start showcasing properties with a
            smarter, more efficient system.”
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="bg-white shadow-2xl rounded-2xl p-10 sm:p-10 w-full max-w-md transition-transform hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Become a Seller
          </h2>

          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
              businessName: "",
              area: "",
              address: "",
              pincode: "",
              referralCodeInput: "",
            }}
            validationSchema={SellerSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const res = await createSeller(values).unwrap();
                toast.success(res.message);
                await sendOtp({ phone: values.phone });

                navigate("/verify-phone-otp", {
                  state: { phone: values.phone },
                });
                resetForm();
              } catch (error) {
                toast.error(
                  error?.data?.message || "Failed to create seller profile"
                );
              }
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
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
                    name="email"
                    type="email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter email"
                  />
                  <ErrorMessage
                    name="email"
                    className="text-red-500 text-xs"
                    component="p"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block mb-1 font-medium text-gray-700">
                    Phone
                  </label>
                  <FaPhone className="absolute left-3 top-[42px] text-gray-400 text-sm" />
                  <Field
                    name="phone"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter phone number"
                  />
                  <ErrorMessage
                    name="phone"
                    className="text-red-500 text-xs"
                    component="p"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="block mb-1 font-medium text-gray-700">
                    Password
                  </label>
                  <FaLock className="absolute left-3 top-[42px] text-gray-400 text-sm" />
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Create password"
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
                    className="text-red-500 text-xs"
                    component="p"
                  />
                </div>

                {/* Business Name */}
                <div className="relative">
                  <label className="block mb-1 font-medium text-gray-700">
                    Business Name
                  </label>
                  <FaStore className="absolute left-3 top-[42px] text-gray-400 text-sm" />
                  <Field
                    name="businessName"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Business / Agency name"
                  />
                  <ErrorMessage
                    name="businessName"
                    className="text-red-500 text-xs"
                    component="p"
                  />
                </div>

                {/* Area */}
                <div className="relative">
                  <label className="block mb-1 font-medium text-gray-700">
                    Indore Area Name
                  </label>
                  <FaMapMarkerAlt className="absolute left-3 top-[42px] text-gray-400 text-sm" />
                  <Field
                    name="area"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Area / Locality"
                  />
                  <ErrorMessage
                    name="area"
                    className="text-red-500 text-xs"
                    component="p"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Full Address
                  </label>
                  <Field
                    as="textarea"
                    name="address"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter full business address"
                  />
                  <ErrorMessage
                    name="address"
                    className="text-red-500 text-xs"
                    component="p"
                  />
                </div>

                {/* Pincode */}
                <div className="relative">
                  <label className="block mb-1 font-medium text-gray-700">
                    Pincode
                  </label>
                  <FaMapPin className="absolute left-3 top-[42px] text-gray-400 text-sm" />

                  <Field
                    name="pincode"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="Pincode"
                  />
                  <ErrorMessage
                    name="pincode"
                    className="text-red-500 text-xs"
                    component="p"
                  />
                </div>

                {/* Referral */}
                <div className="relative">
                  <label className="block mb-1 font-medium text-gray-700">
                    Referral Code (Optional)
                  </label>
                  <FaCode className="absolute left-3 top-[42px] text-gray-400 text-sm" />

                  <Field
                    name="referralCodeInput"
                    type="text"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                    placeholder="REF-XXXX"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold"
                >
                  {isLoading ? "Creating Seller..." : "Create Seller Account"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-purple-500 cursor-pointer hover:underline"
            >
              Go Back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerCreation;
