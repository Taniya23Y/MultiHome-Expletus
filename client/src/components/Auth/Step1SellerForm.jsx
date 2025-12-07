import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useCreateSellerMutation,
  useSendSellerOTPMutation,
} from "../../redux/features/seller/sellerApi";
import {
  FaCode,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaMapMarkerAlt,
  FaMapPin,
  FaPhone,
  FaUser,
} from "react-icons/fa";

const Step1SellerForm = ({ onNext }) => {
  const [createSeller, { isLoading }] = useCreateSellerMutation();
  const [sendOtp] = useSendSellerOTPMutation();
  const [showPassword, setShowPassword] = useState(false);

  const SellerSchema = Yup.object().shape({
    name: Yup.string().required("Full name required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    phone: Yup.string().min(10).required("Phone is required"),
    password: Yup.string().min(6).required("Password is required"),
    area: Yup.string().required("Area required"),
    address: Yup.string().required("Address is required"),
    pincode: Yup.string().required("Pincode required"),
    referralCodeInput: Yup.string().optional(),
  });

  return (
    <div>
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
        Step 1 — Seller Registration
      </h2>

      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
          area: "",
          address: "",
          pincode: "",
          referralCodeInput: "",
        }}
        validationSchema={SellerSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res = await createSeller(values).unwrap();
            toast.success(res.message || "Seller created");

            // send OTP
            await sendOtp({ phone: values.phone }).unwrap();
            toast.success("OTP sent to phone");

            // notify parent: move to OTP step and pass phone
            onNext({ phone: values.phone, sellerId: res.sellerId });

            resetForm();
          } catch (error) {
            toast.error(
              error?.data?.message || error.message || "Failed to create seller"
            );
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-[13px] text-gray-400 text-sm" />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[10px] text-gray-500 hover:text-blue-500 transition text-lg"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Area
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

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Address
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

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Referral Code (optional)
              </label>
              <FaCode className="absolute left-3 top-[42px] text-gray-400 text-sm" />

              <Field
                name="referralCodeInput"
                type="text"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
                placeholder="REF-XXXX"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded"
              >
                {isLoading ? "Creating..." : "Create Seller & Send OTP"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step1SellerForm;
