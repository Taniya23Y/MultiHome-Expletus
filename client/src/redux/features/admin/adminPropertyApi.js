import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminPropertyApi = createApi({
  reducerPath: "adminPropertyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/admin",
    credentials: "include",
  }),
  tagTypes: ["AdminProperties"],

  endpoints: (builder) => ({
    // Pending properties
    getPendingProperties: builder.query({
      query: () => "/properties/pending",
      providesTags: ["AdminProperties"],
    }),

    // Approve / Reject
    approveProperty: builder.mutation({
      query: ({ id, approved }) => ({
        url: `/properties/${id}/approve`,
        method: "PATCH",
        body: { approved },
      }),
      invalidatesTags: ["AdminProperties"],
    }),
  }),
});

export const { useGetPendingPropertiesQuery, useApprovePropertyMutation } =
  adminPropertyApi;
