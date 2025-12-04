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
        url: "/seller-create",
        method: "POST",
        body,
      }),
    }),

    sendSellerOTP: builder.mutation({
      query: (body) => ({
        url: "/send-phone-otp",
        method: "POST",
        body,
      }),
    }),

    verifySellerOTP: builder.mutation({
      query: (body) => ({
        url: "/verify-phone-otp",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setSellerCredentials(data.seller));
      },
    }),

    sellerLogin: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(setSellerCredentials(data.seller));
      },
    }),

    sellerRefresh: builder.query({
      query: () => ({
        url: "/seller-refresh",
        method: "POST",
      }),
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
      query: () => "/profile",
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
} = sellerApi;
