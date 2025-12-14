// src/pages/Seller/steps/Step2CreateShop.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCreateShopMutation } from "../../redux/features/seller/sellerApi";
import {
  Store,
  FileText,
  MapPin,
  Tags,
  Globe,
  Clock,
  Building2,
  Phone,
} from "lucide-react";

const ShopSchema = Yup.object().shape({
  name: Yup.string().required("Shop name required"),
  bio: Yup.string().optional(),
  category: Yup.string().optional(),
  address: Yup.string().optional(),
  website: Yup.string().optional(),
  phone: Yup.string().optional(),
  hours: Yup.string().optional(),
});

const Step2CreateShop = ({ onNext, onBack }) => {
  const [createShop, { isLoading }] = useCreateShopMutation();

  return (
    <div>
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
        Step 3 — Create Real-Estate Seller Shop
      </h2>

      <Formik
        initialValues={{
          name: "",
          bio: "",
          category: "",
          address: "",
          website: "",
          phone: "",
          hours: "",
        }}
        validationSchema={ShopSchema}
        onSubmit={async (values) => {
          try {
            const res = await createShop(values).unwrap();
            toast.success(res.message || "Shop created");
            onNext({ shopId: res.shop?._id });
          } catch (err) {
            toast.error(err?.data?.message || "Shop creation failed");
          }
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Shop name
              </label>
              <Store
                size={18}
                className="absolute left-3 top-10 text-gray-500"
              />
              <Field
                name="name"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Bio
              </label>
              <FileText
                size={18}
                className="absolute left-3 top-10 text-gray-500"
              />
              <Field
                as="textarea"
                name="bio"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Address
              </label>
              <MapPin
                size={18}
                className="absolute left-3 top-10 text-gray-500"
              />
              <Field
                name="address"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Shop Phone Number
              </label>
              <Phone
                size={18}
                className="absolute left-3 top-10 text-gray-500"
              />
              <Field
                name="phone"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* City / Service Area */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                City / Service Area
              </label>
              <Building2
                size={18}
                className="absolute left-3 top-10 text-gray-500"
              />
              <Field
                name="city"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Opening Hours */}
            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Opening Hours
              </label>
              <Clock
                size={18}
                className="absolute left-3 top-10 text-gray-500"
              />
              <Field
                name="hours"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="relative">
              <label className="block mb-1 font-medium text-gray-700">
                Website (Optional)
              </label>
              <Globe
                size={18}
                className="absolute left-3 top-10 text-gray-500"
              />
              <Field
                name="website"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onBack}
                className="px-3 py-2 border rounded cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer text-white px-4 py-2 rounded"
              >
                {isLoading ? "Creating..." : "Create Shop & Continue"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Step2CreateShop;
