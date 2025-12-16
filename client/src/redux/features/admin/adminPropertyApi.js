import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { adminLogoutState } from "./adminAuthSlice";

export const adminPropertyApi = createApi({
  reducerPath: "adminPropertyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/admin",
    credentials: "include",
  }),
  tagTypes: ["AdminProperties"],

  endpoints: (builder) => ({
    getPendingProperties: builder.query({
      query: () => "/properties/pending",
      providesTags: ["AdminProperties"],
    }),

    approveProperty: builder.mutation({
      query: ({ id, approved }) => ({
        url: `/properties/${id}/approve`,
        method: "PATCH",
        body: { approved },
      }),
      invalidatesTags: ["AdminProperties"],
    }),

    getFlaggedProperties: builder.query({
      query: () => "/properties/flagged",
      providesTags: ["AdminProperties"],
    }),

    getBoostedProperties: builder.query({
      query: () => "/properties/boosted",
      providesTags: ["AdminProperties"],
    }),

    getOwnerVerificationProperties: builder.query({
      query: () => "/properties/owner-verification",
      providesTags: ["AdminProperties"],
    }),

    getUserList: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["AdminProperties"],
    }),

    getSellerList: builder.query({
      query: () => ({
        url: `/sellers`,
        method: "GET",
      }),
      providesTags: ["AdminProperties"],
    }),

    verifyUser: builder.mutation({
      query: (id) => ({
        url: `/verify-user/${id}`,
        method: "PUT",
      }),
    }),

    toggleBanUser: builder.mutation({
      query: (id) => ({
        url: `/ban-user/${id}`,
        method: "PUT",
      }),
    }),

    adminLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(adminLogoutState());
      },
    }),
  }),
});

export const {
  useGetPendingPropertiesQuery,
  useApprovePropertyMutation,
  useGetBoostedPropertiesQuery,
  useGetFlaggedPropertiesQuery,
  useGetOwnerVerificationPropertiesQuery,
  useGetUserListQuery,
  useGetSellerListQuery,
  useVerifyUserMutation,
  useToggleBanUserMutation,
  useAdminLogoutMutation,
} = adminPropertyApi;
