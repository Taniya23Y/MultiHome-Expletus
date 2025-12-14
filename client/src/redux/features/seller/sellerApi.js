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
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),

    sendSellerOTP: builder.mutation({
      query: (body) => ({
        url: "/send-otp",
        method: "POST",
        body,
      }),
    }),

    verifySellerOTP: builder.mutation({
      query: (body) => ({
        url: "/verify-otp",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.seller) dispatch(setSellerCredentials(data.seller));
        } catch {
          // ignore
        }
      },
    }),

    sellerLogin: builder.mutation({
      query: (body) => ({
        url: "/seller-login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setSellerCredentials(data.seller));
      },
    }),

    sellerRefresh: builder.query({
      query: () => "/seller-refresh",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSellerCredentials(data.seller));
        } catch {
          dispatch(sellerLogoutState());
        }
      },
    }),

    sellerProfile: builder.query({
      query: () => "/seller-profile",
      providesTags: ["Seller"],
    }),

    sellerLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        dispatch(sellerLogoutState());
      },
    }),

    // NEW: create shop
    createShop: builder.mutation({
      query: (body) => ({
        url: "/create-shop",
        method: "POST",
        body,
      }),
    }),

    // NEW: bank endpoints
    createBank: builder.mutation({
      query: () => ({
        url: "/bank/create",
        method: "POST",
      }),
    }),

    uploadBankDocs: builder.mutation({
      query: (formData) => ({
        url: "/bank/upload-docs",
        method: "POST",
        body: formData,
      }),
    }),

    verifyBank: builder.mutation({
      query: () => ({
        url: "/bank/verify",
        method: "POST",
      }),
    }),

    sellerProperties: builder.query({
      query: () => "/properties",
      providesTags: ["Properties"],
    }),
  }),
});

export const {
  useCreateSellerMutation,
  useSendSellerOTPMutation,
  useVerifySellerOTPMutation,
  useSellerLoginMutation,
  useSellerRefreshQuery,
  useSellerProfileQuery,
  useSellerLogoutMutation,
  useCreateShopMutation,
  useCreateBankMutation,
  useUploadBankDocsMutation,
  useVerifyBankMutation,
  useSellerPropertiesQuery,
} = sellerApi;
