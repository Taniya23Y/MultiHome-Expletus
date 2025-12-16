import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  isAdminAuthenticated: false,
  adminLoading: true,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdminCredentials: (state, action) => {
      state.adminLoading = true;
      state.admin = action.payload;
      state.isAdminAuthenticated = true;
      state.adminLoading = false;
    },

    adminLogoutState: (state) => {
      state.admin = null;
      state.isAdminAuthenticated = false;
      state.adminLoading = false;
    },

    finishAdminLoading: (state) => {
      state.adminLoading = false;
    },
  },
});

export const { setAdminCredentials, adminLogoutState, finishAdminLoading } =
  adminAuthSlice.actions;

export default adminAuthSlice.reducer;
