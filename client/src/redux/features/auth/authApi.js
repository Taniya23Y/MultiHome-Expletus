import { apiSlice } from "../api/apiSlice";
import { setCredentials } from "../auth/authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/register-user",
        method: "POST",
        body: data,
      }),
    }),

    verifyUser: builder.mutation({
      query: (data) => ({
        url: "/verify-user",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            setCredentials({
              user: data.user,
              roles: data.roles,
              token: data.accessToken,
            })
          );

          // store token if backend sends it
          if (data.accessToken) {
            localStorage.setItem("token", data.accessToken);
          }
        } catch (error) {
          console.log("Login error:", error);
        }
      },
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "POST",
        // credentials: "include",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    verifyForgotPassword: builder.mutation({
      query: (data) => ({
        url: "/verify-forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    getProfile: builder.query({
      query: () => "/profile",
    }),

    getAdminDashboard: builder.query({
      query: () => "/admin/dashboard",
    }),

    getSuperAdminPanel: builder.query({
      query: () => "/superadmin/panel",
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useVerifyUserMutation,
  useLoginUserMutation,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useVerifyForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutUserMutation,
  useGetProfileQuery,
  useGetAdminDashboardQuery,
  useGetSuperAdminPanelQuery,
} = authApi;
