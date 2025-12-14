import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/property",
    credentials: "include",
  }),
  tagTypes: ["Properties", "SingleProperty"],

  endpoints: (builder) => ({
    // ---------------------- CREATE PROPERTY ----------------------
    createProperty: builder.mutation({
      query: (data) => ({
        url: "/create-property",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Properties"],
    }),

    // ---------------------- UPDATE PROPERTY ----------------------
    updateProperty: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Properties", "SingleProperty"],
    }),

    // ---------------------- DELETE PROPERTY ----------------------
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Properties"],
    }),

    // ---------------------- MY PROPERTIES ----------------------
    myProperties: builder.query({
      query: () => `/my-properties`,
      providesTags: ["Properties"],
    }),

    getAllPublicProperties: builder.query({
      query: () => "/all-properties",
      providesTags: ["Properties"],
    }),

    // ---------------------- GET PROPERTY BY ID ----------------------
    getPropertyById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["SingleProperty"],
    }),

    // ---------------------- UPLOAD IMAGES ----------------------
    uploadPropertyImages: builder.mutation({
      query: ({ id, images }) => {
        const formData = new FormData();
        images.forEach((img) => formData.append("images", img));

        return {
          url: `/${id}/upload-images`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["SingleProperty"],
    }),

    // ---------------------- SET AVAILABILITY ----------------------
    setAvailability: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Properties", "SingleProperty"],
    }),

    getPropertyEnums: builder.query({
      query: () => "/enums",
    }),
  }),
});

export const {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
  useMyPropertiesQuery,
  useGetAllPublicPropertiesQuery,
  useGetPropertyByIdQuery,
  useUploadPropertyImagesMutation,
  useSetAvailabilityMutation,
  useGetPropertyEnumsQuery,
} = propertyApi;
