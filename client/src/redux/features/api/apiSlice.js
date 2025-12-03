/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { setCredentials, logoutState } from "../auth/authSlice";

const mutex = new Mutex();

// Normal baseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/auth",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  // First request attempt
  let result = await baseQuery(args, api, extraOptions);

  // If access token expired
  if (result.error?.status === 401) {
    // If mutex is not locked → we are the first request to refresh
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Refresh token API
        const refreshResult = await baseQuery(
          { url: "/refresh", method: "POST" },
          api,
          extraOptions
        );

        if (refreshResult?.data?.accessToken) {
          // Save new access token in Redux
          api.dispatch(
            setCredentials({
              accessToken: refreshResult.data.accessToken,
              user: api.getState().auth.user,
              roles: api.getState().auth.roles,
            })
          );

          // Retry original request with new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Refresh token expired → logout
          api.dispatch(logoutState());
        }
      } finally {
        release();
      }
    } else {
      // Another request is already refreshing → wait
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({}),
});
