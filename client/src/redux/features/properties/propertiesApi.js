// src/redux/features/properties/propertiesApi.js

import { apiSlice } from "../api/apiSlice";

export const propertiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query({
      query: () => "/user/dashboard-overview",
    }),
  }),
});

export const { useGetDashboardOverviewQuery } = propertiesApi;
