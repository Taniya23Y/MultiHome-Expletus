/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import {
  useCreatePropertyMutation,
  useGetPropertyEnumsQuery,
} from "../../../redux/features/property/propertyApi";
import { useGetCategoriesQuery } from "../../../redux/features/category/categoryApi";
import { useGetSubcategoryByCategoryQuery } from "../../../redux/features/category/subcategoryApi";

const steps = ["Basic Info", "Property Details", "Features", "Media", "Review"];

const AddProperty = () => {
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch Categories
  const { data: categories = [], isLoading: catLoading } =
    useGetCategoriesQuery();

  // Fetch Subcategories
  const { data: subData, isLoading: subLoading } =
    useGetSubcategoryByCategoryQuery(selectedCategory, {
      skip: !selectedCategory,
    });

  const subcategories = subData?.subcategories || [];

  const [createProperty, { isLoading }] = useCreatePropertyMutation();

  const { data: enums = {}, isLoading: enumsLoading } =
    useGetPropertyEnumsQuery();

  if (enumsLoading) return <p>Loading form...</p>;

  // ---------------------- INITIAL FORM VALUES ---------------------------
  const initialValues = {
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    maintenanceFee: "",
    securityDeposit: "",

    location: {
      address: "",
      locality: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      coordinates: { lat: "", lng: "" },
    },

    bedrooms: "",
    bathrooms: "",
    balconies: "",
    areaSqFt: "",
    carpetArea: "",
    propertyType: "",
    furnished: "",
    facing: "",
    floorNumber: "",
    totalFloors: "",
    builtYear: "",
    societyName: "",

    parking: false,
    liftAvailable: false,
    securityAvailable: false,
    electricityBackup: false,
    waterSupply: "",
    flooringType: "",
    ownershipType: "",
    utilityConnections: "",
    facingRoadWidth: "",
    landAreaSqFt: "",

    images: [],
    videos: [],
    floorPlan: "",

    category: "",
    subcategory: "",
    tags: "",
    availableFrom: "",
    preferredTenants: "",
    brokerAllowed: false,
    monthlyMaintenanceIncluded: false,
  };

  // ---------------------- VALIDATION ---------------------------
  const validationSchema = [
    Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      category: Yup.string().required("Required"),
      subcategory: Yup.string().required("Required"),
    }),

    Yup.object({
      bedrooms: Yup.number().required("Required"),
      bathrooms: Yup.number().required("Required"),
      areaSqFt: Yup.number().required("Required"),
      propertyType: Yup.string().required("Required"),
    }),

    Yup.object({
      waterSupply: Yup.string().required("Required"),
      flooringType: Yup.string().required("Required"),
      ownershipType: Yup.string().required("Required"),
    }),

    Yup.object({
      images: Yup.array().min(1, "At least 1 image required"),
    }),

    Yup.object({}),
  ];

  // ---------------------- SUBMIT HANDLER ---------------------------
  const onSubmit = async (values, { resetForm }) => {
    try {
      await createProperty(values).unwrap();
      toast.success("Property Created Successfully!");
      resetForm();

      setStep(0);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  // ---------------------- INPUT COMPONENT ---------------------------
  const InputField = ({ label, name, type = "text" }) => (
    <div className="mb-4">
      <label className="font-medium text-gray-700">{label}</label>
      <Field
        type={type}
        name={name}
        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
      />
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-xs"
      />
    </div>
  );

  // ---------------------- REUSABLE ENUM SELECT COMPONENT ----------------------
  const SelectField = ({ label, name, options }) => (
    <div className="mb-4">
      <label className="font-medium text-gray-700">{label}</label>
      <Field
        as="select"
        name={name}
        className="w-full mt-1 px-3 py-2 border rounded-lg"
      >
        <option value="">Select {label}</option>
        {options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-xs"
      />
    </div>
  );

  // ---------------------- RENDER STEP ---------------------------
  const renderStep = ({ values, setFieldValue }) => {
    switch (step) {
      // STEP 0: BASIC INFO
      case 0:
        return (
          <>
            <InputField label="Title" name="title" />
            <InputField label="Description" name="description" />
            <InputField label="Price" name="price" type="number" />
            <InputField
              label="Discount Price"
              name="discountPrice"
              type="number"
            />

            <h3 className="font-semibold mt-4 mb-2">Location Details</h3>
            <InputField label="Address" name="location.address" />

            <div className="mb-4">
              <SelectField
                label="Locality"
                name="location.locality"
                options={enums.locality}
              />
            </div>

            <InputField label="City" name="location.city" />
            <InputField label="State" name="location.state" />
            <InputField label="Country" name="location.country" />
            <InputField label="Pincode" name="location.pincode" />

            {/* CATEGORY */}
            <div className="mb-4">
              <label className="font-medium text-gray-700">Category</label>
              <Field
                as="select"
                name="category"
                onChange={(e) => {
                  const catId = e.target.value;
                  setFieldValue("category", catId);
                  setFieldValue("subcategory", "");
                  setSelectedCategory(catId);
                }}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              >
                <option value="">Select Category</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Field>
            </div>

            {/* SUBCATEGORY */}
            <div className="mb-4">
              <label className="font-medium text-gray-700">Subcategory</label>
              <Field
                as="select"
                name="subcategory"
                disabled={!selectedCategory}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
              >
                <option value="">Select Subcategory</option>
                {subcategories?.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </Field>
            </div>
          </>
        );

      // STEP 1: PROPERTY DETAILS
      case 1:
        return (
          <>
            <InputField label="Bedrooms" name="bedrooms" type="number" />
            <InputField label="Bathrooms" name="bathrooms" type="number" />
            <InputField label="Balconies" name="balconies" type="number" />
            <InputField label="Area (Sq Ft)" name="areaSqFt" type="number" />
            <InputField label="Carpet Area" name="carpetArea" type="number" />

            <div className="mb-4">
              <SelectField
                label="Property Type"
                name="propertyType"
                options={enums.propertyType}
              />
            </div>

            <div className="mb-4">
              <SelectField
                label="Furnished"
                name="furnished"
                options={enums.furnished}
              />
            </div>

            <div className="mb-4">
              <SelectField
                label="Facing"
                name="facing"
                options={enums.facing}
              />
            </div>
            <InputField label="Floor Number" name="floorNumber" />
            <InputField label="Total Floors" name="totalFloors" />
            <InputField label="Built Year" name="builtYear" type="number" />
            <InputField label="Society Name" name="societyName" />
          </>
        );

      // STEP 2: FEATURES
      case 2:
        return (
          <>
            <h3 className="font-semibold mb-3">Features & Amenities</h3>

            <div className="mb-4">
              <SelectField
                label="Parking"
                name="parking"
                options={enums.parking}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center">
                <Field type="checkbox" name="parking" className="mr-2" />{" "}
                Parking
              </label>

              <label className="flex items-center">
                <Field type="checkbox" name="liftAvailable" className="mr-2" />{" "}
                Lift Available
              </label>

              <label className="flex items-center">
                <Field
                  type="checkbox"
                  name="securityAvailable"
                  className="mr-2"
                />{" "}
                Security
              </label>

              <label className="flex items-center">
                <Field
                  type="checkbox"
                  name="electricityBackup"
                  className="mr-2"
                />{" "}
                Electricity Backup
              </label>
            </div>

            <div className="mb-4">
              <SelectField
                label="Water Supply"
                name="waterSupply"
                options={enums.waterSupply}
              />
            </div>

            <div className="mb-4">
              <SelectField
                label="Flooring Type"
                name="flooringType"
                options={enums.flooringType}
              />
            </div>

            <div className="mb-4">
              <SelectField
                label="Ownership Type"
                name="ownershipType"
                options={enums.ownershipType}
              />
            </div>
            <InputField label="Utility Connections" name="utilityConnections" />
            <InputField label="Facing Road Width" name="facingRoadWidth" />
            <div className="mb-4">
              <SelectField
                label="Preferred Tenants"
                name="preferredTenants"
                options={enums.preferredTenants}
              />
            </div>

            <InputField label="Land Area (Sq Ft)" name="landAreaSqFt" />
          </>
        );

      // STEP 3: MEDIA
      case 3:
        return (
          <>
            <h3 className="font-semibold mb-3">Upload Media</h3>

            <div className="mb-4">
              <label className="font-medium block mb-2">Images (min 1)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setFieldValue("images", files);
                }}
                className="w-full"
              />
              <ErrorMessage
                name="images"
                component="p"
                className="text-red-500 text-xs"
              />
            </div>

            {/* VIDEOS */}
            <div className="mb-4">
              <label className="font-medium block mb-2">Videos</label>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setFieldValue("videos", files);
                }}
                className="w-full"
              />
            </div>

            {/* FLOOR PLAN */}
            <div className="mb-4">
              <label className="font-medium block mb-2">Floor Plan</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue("floorPlan", file);
                }}
                className="w-full"
              />
            </div>

            {/* PREVIEW */}
            <div className="flex flex-wrap gap-3 mt-3">
              {values?.images?.map((file, index) => {
                const url = URL.createObjectURL(file);
                return (
                  <img
                    key={index}
                    src={url}
                    className="w-24 h-24 object-cover rounded"
                  />
                );
              })}
            </div>
          </>
        );

      // STEP 4: REVIEW
      case 4:
        return (
          <>
            <h3 className="font-semibold mb-3">Review Your Details</h3>

            <div className="space-y-2">
              <p>
                <strong>Title:</strong> {values.title}
              </p>
              <p>
                <strong>Description:</strong> {values.description}
              </p>
              <p>
                <strong>Price:</strong> {values.price}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {categories.find((c) => c._id === values.category)?.name}
              </p>

              <p>
                <strong>Subcategory:</strong>{" "}
                {subcategories.find((s) => s._id === values.subcategory)?.name}
              </p>

              <p>
                <strong>Bedrooms:</strong> {values.bedrooms}
              </p>
              <p>
                <strong>Bathrooms:</strong> {values.bathrooms}
              </p>

              <p>
                <strong>Images:</strong> {values.images?.length || 0}
              </p>
              <p>
                <strong>Videos:</strong> {values.videos?.length || 0}
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // ---------------------- MAIN JSX ---------------------------
  if (catLoading) return <p>Loading categories...</p>;

  return (
    <div className="bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema[step]}
          onSubmit={(values, formikHelpers) => {
            if (step === steps.length - 1) onSubmit(values, formikHelpers);
            else setStep(step + 1);
          }}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <Form onSubmit={handleSubmit}>
              {renderStep({ values, setFieldValue })}

              <div className="flex justify-between mt-6">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 cursor-pointer bg-gray-300 rounded-lg"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-lg"
                >
                  {step === steps.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProperty;
