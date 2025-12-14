/* eslint-disable no-unused-vars */
// src/components/Seller/Property/EditPropertyDetails.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

// Adjust these imports to match your RTK Query slices
import {
  useGetPropertyByIdQuery,
  useUpdatePropertyMutation,
  useGetPropertyEnumsQuery,
} from "../../../redux/features/property/propertyApi";
import { useGetCategoriesQuery } from "../../../redux/features/category/categoryApi";
import { useGetSubcategoryByCategoryQuery } from "../../../redux/features/category/subcategoryApi";

const steps = ["Basic Info", "Property Details", "Features", "Media", "Review"];

const EditPropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // API hooks
  const { data: propertyData, isLoading: loadingProperty } =
    useGetPropertyByIdQuery(id);
  const [updateProperty, { isLoading: updating }] = useUpdatePropertyMutation();

  const { data: enums = {}, isLoading: enumsLoading } =
    useGetPropertyEnumsQuery();
  const { data: categories = [], isLoading: catLoading } =
    useGetCategoriesQuery();

  // chosen category for subcategory fetch
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data: subData } = useGetSubcategoryByCategoryQuery(selectedCategory, {
    skip: !selectedCategory,
  });
  const subcategories = subData?.subcategories || [];

  // local state to manage UI between existing/new images
  const [existingImages, setExistingImages] = useState([]); // from server: [{ _id, url, caption }]
  const [imagesToRemove, setImagesToRemove] = useState(new Set()); // ids of existing images to delete
  const [newImages, setNewImages] = useState([]); // File objects
  const [newVideos, setNewVideos] = useState([]); // File objects
  const [newFloorPlan, setNewFloorPlan] = useState(null); // File object

  const [step, setStep] = useState(0);

  // When property loads, prefill local states
  useEffect(() => {
    if (propertyData?.property) {
      const p = propertyData.property;
      setExistingImages(p.images || []);
      setSelectedCategory(p.category?._id || p.category || "");
    }
  }, [propertyData]);

  // Build initialValues from propertyData when available
  const initialValues = useMemo(() => {
    const p = propertyData?.property;
    return {
      title: p?.title || "",
      description: p?.description || "",
      price: p?.price || "",
      discountPrice: p?.discountPrice || "",
      maintenanceFee: p?.maintenanceFee || "",
      securityDeposit: p?.securityDeposit || "",

      // location object - stringify coordinates to keep fields consistent
      location: {
        address: p?.location?.address || "",
        locality: p?.location?.locality || "",
        city: p?.location?.city || "",
        state: p?.location?.state || "",
        country: p?.location?.country || "",
        pincode: p?.location?.pincode || "",
        coordinates: {
          lat: p?.location?.coordinates?.lat || "",
          lng: p?.location?.coordinates?.lng || "",
        },
      },

      bedrooms: p?.bedrooms || "",
      bathrooms: p?.bathrooms || "",
      balconies: p?.balconies || "",
      areaSqFt: p?.areaSqFt || "",
      carpetArea: p?.carpetArea || "",
      propertyType: p?.propertyType || "",
      furnished: p?.furnished || "",
      facing: p?.facing || "",
      floorNumber: p?.floorNumber || "",
      totalFloors: p?.totalFloors || "",
      builtYear: p?.builtYear || "",
      societyName: p?.societyName || "",

      parking: p?.parking || "",
      liftAvailable: !!p?.liftAvailable,
      securityAvailable: !!p?.securityAvailable,
      electricityBackup: !!p?.electricityBackup,
      waterSupply: p?.waterSupply || "",
      flooringType: p?.flooringType || "",
      ownershipType: p?.ownershipType || "",
      utilityConnections: p?.utilityConnections || "",
      facingRoadWidth: p?.facingRoadWidth || "",
      landAreaSqFt: p?.landAreaSqFt || "",

      // media placeholders — actual files handled separately
      images: [], // new files
      videos: [], // new files
      floorPlan: "",

      category: p?.category?._id || p?.category || "",
      subcategory: p?.subcategory?._id || p?.subcategory || "",
      tags: (p?.tags || []).join(", "),
      availableFrom: p?.availableFrom ? p.availableFrom.split("T")[0] : "",
      preferredTenants: p?.preferredTenants || "",
      brokerAllowed: !!p?.brokerAllowed,
      monthlyMaintenanceIncluded: !!p?.monthlyMaintenanceIncluded,
    };
  }, [propertyData]);

  // Yup validation: make all fields required as requested
  const validationSchema = [
    // Step 0: Basic Info
    Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number().required("Price is required"),
      category: Yup.string().required("Category is required"),
      subcategory: Yup.string().required("Subcategory is required"),
      "location.address": Yup.string().required("Address is required"),
      "location.city": Yup.string().required("City is required"),
      "location.state": Yup.string().required("State is required"),
      "location.country": Yup.string().required("Country is required"),
      "location.pincode": Yup.string().required("Pincode is required"),
    }),

    // Step 1: Property Details
    Yup.object({
      bedrooms: Yup.number().required("Bedrooms required"),
      bathrooms: Yup.number().required("Bathrooms required"),
      areaSqFt: Yup.number().required("Area required"),
      propertyType: Yup.string().required("Property type required"),
    }),

    // Step 2: Features
    Yup.object({
      waterSupply: Yup.string().required("Water supply required"),
      flooringType: Yup.string().required("Flooring type required"),
      ownershipType: Yup.string().required("Ownership type required"),
    }),

    // Step 3: Media - require at least one image existing OR new upload
    Yup.object({
      // We do a custom test because Formik value.images is for new files only;
      // we must ensure existingImages - imagesToRemove leaves at least 1, or user uploads newImages
      images: Yup.mixed().test(
        "at-least-one-image",
        "At least one image required",
        function () {
          // this.path points to 'images'
          const hasExistingKept =
            existingImages.filter((img) => !imagesToRemove.has(img._id))
              .length > 0;
          const hasNew = newImages.length > 0;
          return hasExistingKept || hasNew;
        }
      ),
    }),

    // Step 4: Review - no extra validations
    Yup.object({}),
  ];

  if (loadingProperty || enumsLoading || catLoading) {
    return <div className="p-6">Loading...</div>;
  }

  // -------------------------
  // Handlers for image actions
  // -------------------------
  const toggleRemoveExistingImage = (imgId) => {
    setImagesToRemove((prev) => {
      const next = new Set(prev);
      if (next.has(imgId)) next.delete(imgId);
      else next.add(imgId);
      return next;
    });
  };

  const handleNewImagesChange = (files) => {
    setNewImages(Array.from(files || []));
  };

  const handleNewVideosChange = (files) => {
    setNewVideos(Array.from(files || []));
  };

  const handleFloorPlanChange = (file) => {
    setNewFloorPlan(file || null);
  };

  // -------------------------
  // Submit handler
  // -------------------------
  const handleSubmit = async (values, formikHelpers) => {
    try {
      // Build FormData
      const formData = new FormData();

      // Append simple scalar values
      const scalarFields = [
        "title",
        "description",
        "price",
        "discountPrice",
        "maintenanceFee",
        "securityDeposit",
        "bedrooms",
        "bathrooms",
        "balconies",
        "areaSqFt",
        "carpetArea",
        "propertyType",
        "furnished",
        "facing",
        "floorNumber",
        "totalFloors",
        "builtYear",
        "societyName",
        "parking",
        "liftAvailable",
        "securityAvailable",
        "electricityBackup",
        "waterSupply",
        "flooringType",
        "ownershipType",
        "preferredTenants",
        "brokerAllowed",
        "monthlyMaintenanceIncluded",
        "facingRoadWidth",
        "landAreaSqFt",
        "availableFrom",
        "tags",
      ];
      scalarFields.forEach((key) => {
        const val = values[key];
        if (val !== undefined && val !== null) formData.append(key, val);
      });

      // Append category/subcategory
      formData.append("category", values.category);
      formData.append("subcategory", values.subcategory);

      // Append location as JSON string (backend expects object)
      formData.append(
        "location",
        JSON.stringify({
          address: values.location.address,
          locality: values.location.locality,
          city: values.location.city,
          state: values.location.state,
          country: values.location.country,
          pincode: values.location.pincode,
          coordinates: {
            lat: values.location.coordinates.lat,
            lng: values.location.coordinates.lng,
          },
        })
      );

      // Append utilityConnections if provided
      if (values.utilityConnections) {
        // If user entered a string, try to append as-is; else stringify
        if (typeof values.utilityConnections === "string") {
          formData.append("utilityConnections", values.utilityConnections);
        } else {
          formData.append(
            "utilityConnections",
            JSON.stringify(values.utilityConnections)
          );
        }
      }

      // Append new images (files)
      if (newImages && newImages.length > 0) {
        newImages.forEach((file) => formData.append("images", file));
      }

      // Append new videos
      if (newVideos && newVideos.length > 0) {
        newVideos.forEach((file) => formData.append("videos", file));
      }

      // Floor plan
      if (newFloorPlan) formData.append("floorPlan", newFloorPlan);

      // Inform backend which existing images to remove (array of ids)
      formData.append(
        "imagesToRemove",
        JSON.stringify(Array.from(imagesToRemove))
      );

      // Finally call API (expecting updateProperty to accept FormData)
      // This assumes your RTK mutation expects {id, body} and sends body directly.
      await updateProperty({ id, body: formData }).unwrap();

      toast.success("Property updated successfully!");
      // Redirect back to properties list
      navigate("/seller/dashboard/view-properties");
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err?.data?.message || "Update failed");
    }
  };

  // -------------------------
  // UI for each step (like AddProperty)
  // -------------------------
  const renderStep = ({ values, setFieldValue }) => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="mb-4">
              <label className="font-medium">Title</label>
              <Field name="title" className="w-full mt-1 p-2 border rounded" />
              <ErrorMessage
                name="title"
                component="p"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="mb-4">
              <label className="font-medium">Description</label>
              <Field
                as="textarea"
                name="description"
                className="w-full mt-1 p-2 border rounded h-24"
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Price</label>
                <Field
                  name="price"
                  type="number"
                  className="w-full mt-1 p-2 border rounded"
                />
                <ErrorMessage
                  name="price"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="font-medium">Discount Price</label>
                <Field
                  name="discountPrice"
                  type="number"
                  className="w-full mt-1 p-2 border rounded"
                />
                <ErrorMessage
                  name="discountPrice"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>

            <h3 className="font-semibold mt-4 mb-2">Location</h3>
            <div className="mb-3">
              <label className="font-medium">Address</label>
              <Field
                name="location.address"
                className="w-full mt-1 p-2 border rounded"
              />
              <ErrorMessage
                name="location.address"
                component="p"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Locality</label>
                <Field
                  name="location.locality"
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <div>
                <label className="font-medium">City</label>
                <Field
                  name="location.city"
                  className="w-full mt-1 p-2 border rounded"
                />
                <ErrorMessage
                  name="location.city"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-3">
              <Field
                name="location.state"
                className="w-full mt-1 p-2 border rounded"
                placeholder="State"
              />
              <Field
                name="location.country"
                className="w-full mt-1 p-2 border rounded"
                placeholder="Country"
              />
              <Field
                name="location.pincode"
                className="w-full mt-1 p-2 border rounded"
                placeholder="Pincode"
              />
            </div>

            {/* category & subcategory */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="font-medium">Category</label>
                <Field
                  as="select"
                  name="category"
                  className="w-full mt-1 p-2 border rounded"
                  onChange={(e) => {
                    const catId = e.target.value;
                    setFieldValue("category", catId);
                    setFieldValue("subcategory", "");
                    setSelectedCategory(catId);
                  }}
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="font-medium">Subcategory</label>
                <Field
                  as="select"
                  name="subcategory"
                  className="w-full mt-1 p-2 border rounded"
                  disabled={!selectedCategory}
                >
                  <option value="">Select Subcategory</option>
                  {subcategories?.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="subcategory"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>
          </>
        );

      case 1:
        return (
          <>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="font-medium">Bedrooms</label>
                <Field
                  name="bedrooms"
                  type="number"
                  className="w-full mt-1 p-2 border rounded"
                />
                <ErrorMessage
                  name="bedrooms"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="font-medium">Bathrooms</label>
                <Field
                  name="bathrooms"
                  type="number"
                  className="w-full mt-1 p-2 border rounded"
                />
                <ErrorMessage
                  name="bathrooms"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="font-medium">Balconies</label>
                <Field
                  name="balconies"
                  type="number"
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="font-medium">Area (Sq Ft)</label>
                <Field
                  name="areaSqFt"
                  type="number"
                  className="w-full mt-1 p-2 border rounded"
                />
                <ErrorMessage
                  name="areaSqFt"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="font-medium">Carpet Area</label>
                <Field
                  name="carpetArea"
                  type="number"
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="font-medium">Property Type</label>
                <Field
                  as="select"
                  name="propertyType"
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option value="">Select</option>
                  {enums.propertyType?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="propertyType"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="font-medium">Furnished</label>
                <Field
                  as="select"
                  name="furnished"
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option value="">Select</option>
                  {enums.furnished?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Field>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <Field
                name="facing"
                as="select"
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Facing</option>
                {enums.facing?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Field>
              <Field
                name="floorNumber"
                className="w-full mt-1 p-2 border rounded"
                placeholder="Floor Number"
              />
              <Field
                name="totalFloors"
                className="w-full mt-1 p-2 border rounded"
                placeholder="Total Floors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Field
                name="builtYear"
                type="number"
                className="w-full mt-1 p-2 border rounded"
                placeholder="Built Year"
              />
              <Field
                name="societyName"
                className="w-full mt-1 p-2 border rounded"
                placeholder="Society Name"
              />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h3 className="font-semibold mb-3">Features & Amenities</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Parking</label>
                <Field
                  as="select"
                  name="parking"
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option value="">Select</option>
                  {enums.parking?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="flex items-center space-x-2">
                <Field type="checkbox" name="liftAvailable" />
                <label>Lift Available</label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <Field type="checkbox" name="securityAvailable" />
                <label>Security</label>
              </div>

              <div className="flex items-center space-x-2">
                <Field type="checkbox" name="electricityBackup" />
                <label>Electricity Backup</label>
              </div>
            </div>

            <div className="mt-4">
              <label className="font-medium">Water Supply</label>
              <Field
                as="select"
                name="waterSupply"
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Select</option>
                {enums.waterSupply?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="waterSupply"
                component="p"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="font-medium">Flooring Type</label>
                <Field
                  as="select"
                  name="flooringType"
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option value="">Select</option>
                  {enums.flooringType?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="flooringType"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="font-medium">Ownership Type</label>
                <Field
                  as="select"
                  name="ownershipType"
                  className="w-full mt-1 p-2 border rounded"
                >
                  <option value="">Select</option>
                  {enums.ownershipType?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="ownershipType"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Field
                name="utilityConnections"
                className="w-full mt-1 p-2 border rounded"
                placeholder="utilityConnections (JSON or text)"
              />
              <Field
                name="facingRoadWidth"
                className="w-full mt-1 p-2 border rounded"
                placeholder="Facing Road Width"
              />
            </div>

            <div className="mt-4">
              <label className="font-medium">Preferred Tenants</label>
              <Field
                as="select"
                name="preferredTenants"
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Select</option>
                {enums.preferredTenants?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Field>
            </div>

            <div className="mt-4">
              <label className="font-medium">Land Area (Sq Ft)</label>
              <Field
                name="landAreaSqFt"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h3 className="font-semibold mb-3">Media</h3>

            {/* EXISTING IMAGES */}
            <div className="mb-4">
              <label className="font-medium">Existing Images</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {existingImages.length === 0 && (
                  <p className="text-sm text-gray-500">No existing images</p>
                )}

                {existingImages.map((img) => {
                  const isMarked = imagesToRemove.has(img._id);
                  return (
                    <div key={img._id} className="relative">
                      <img
                        src={img.url}
                        alt="existing"
                        className={`w-28 h-28 object-cover rounded ${
                          isMarked ? "opacity-40" : ""
                        }`}
                      />
                      <div className="absolute top-1 right-1 flex space-x-1">
                        <button
                          type="button"
                          onClick={() => toggleRemoveExistingImage(img._id)}
                          className={`px-2 py-1 text-xs rounded ${
                            isMarked
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {isMarked ? "Keep" : "Remove"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Mark images to remove, or keep them. New uploads will be
                appended.
              </p>
            </div>

            {/* NEW IMAGE UPLOAD */}
            <div className="mb-4">
              <label className="font-medium">
                Upload New Images (these will be appended)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  handleNewImagesChange(e.target.files);
                }}
                className="w-full mt-2"
              />
              <div className="flex flex-wrap gap-3 mt-3">
                {newImages.map((file, idx) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <img
                      key={idx}
                      src={url}
                      alt="new"
                      className="w-24 h-24 object-cover rounded"
                    />
                  );
                })}
              </div>
            </div>

            {/* VIDEOS */}
            <div className="mb-4">
              <label className="font-medium">
                Upload New Videos (optional)
              </label>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleNewVideosChange(e.target.files)}
                className="w-full mt-2"
              />
              <div className="flex flex-wrap gap-3 mt-3">
                {newVideos.map((file, idx) => (
                  <div key={idx} className="w-40 p-2 border rounded text-xs">
                    {file.name}
                  </div>
                ))}
              </div>
            </div>

            {/* FLOOR PLAN */}
            <div className="mb-4">
              <label className="font-medium">
                Floor Plan (existing shown below)
              </label>
              {propertyData?.property?.floorPlan ? (
                <div className="mt-2">
                  <a
                    href={propertyData.property.floorPlan}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View existing floor plan
                  </a>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  No floor plan uploaded
                </p>
              )}

              <div className="mt-3">
                <label className="block font-medium">
                  Upload New Floor Plan (optional: replaces existing)
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFloorPlanChange(e.target.files[0])}
                  className="w-full mt-2"
                />
                {newFloorPlan && (
                  <p className="text-sm mt-2">{newFloorPlan.name}</p>
                )}
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h3 className="font-semibold mb-3">Review</h3>
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
                <strong>Existing images kept:</strong>{" "}
                {
                  existingImages.filter((img) => !imagesToRemove.has(img._id))
                    .length
                }
              </p>
              <p>
                <strong>New images:</strong> {newImages.length}
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Property</h2>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema[step]}
          onSubmit={(values, formikHelpers) => {
            if (step < steps.length - 1) {
              setStep((s) => s + 1);
            } else {
              handleSubmit(values, formikHelpers);
            }
          }}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  {steps.map((s, idx) => (
                    <div
                      key={s}
                      className={`px-3 py-1 rounded ${
                        idx === step
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {renderStep({ values, setFieldValue })}

              <div className="flex justify-between mt-6">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(0);
                    }}
                    className="px-4 py-2 bg-gray-100 rounded"
                  >
                    Start Over
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded"
                  >
                    {step === steps.length - 1
                      ? updating
                        ? "Saving..."
                        : "Save Changes"
                      : "Next"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditPropertyDetails;
