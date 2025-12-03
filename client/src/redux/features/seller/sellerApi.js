import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setSellerCredentials, sellerLogoutState } from "./sellerAuthSlice";

export const sellerApi = createApi({
  reducerPath: "sellerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/seller",
    credentials: "include",
  }),
  tagTypes: ["Seller"],
  endpoints: (builder) => ({
    createSeller: builder.mutation({
      query: (data) => ({
        url: "/seller-create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    sendSellerOTP: builder.mutation({
      query: (data) => ({
        url: "/send-phone-otp",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    verifySellerOTP: builder.mutation({
      query: (data) => ({
        url: "/verify-phone-otp",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setSellerCredentials(data.seller));
      },
    }),

    sellerLogin: builder.mutation({
      query: (data) => ({
        url: "/seller-login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setSellerCredentials(data.seller));
      },
    }),

    sellerRefresh: builder.query({
      query: () => ({
        url: "/seller-refresh",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSellerCredentials(data.seller));
        } catch (err) {
          // Important: Don't throw, just reset seller state
          console.warn("Seller refresh failed:", err);
          dispatch(sellerLogoutState());
        }
      },
    }),

    sellerProfile: builder.query({
      query: () => ({
        url: "/seller-profile",
        method: "GET",
        credentials: "include",
      }),
    }),

    sellerLogout: builder.mutation({
      query: () => ({
        url: "/seller/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { dispatch }) {
        dispatch(sellerLogoutState());
      },
    }),
  }),
});

export const {
  useCreateSellerMutation,
  useSendSellerOTPMutation,
  useVerifySellerOTPMutation,
  useSellerLoginMutation,
  useSellerProfileQuery,
  useSellerRefreshQuery,
  useSellerLogoutMutation,
} = sellerApi;
