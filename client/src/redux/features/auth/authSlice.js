import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  roles: null,
  accessToken: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.roles = action.payload.roles;
      state.accessToken = action.payload.accessToken || null;
      state.isLoggedIn = true;
    },
    logoutState: (state) => {
      state.user = null;
      state.roles = null;
      state.accessToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setCredentials, logoutState } = authSlice.actions;
export default authSlice.reducer;
