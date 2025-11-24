import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  roles: null,
  isLoggedIn: false,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, roles, token } = action.payload;

      state.user = user;
      state.roles = roles;

      if (token) {
        state.token = token;
        localStorage.setItem("token", token);
      }

      state.isLoggedIn = true;
    },
    logoutState: (state) => {
      state.user = null;
      state.roles = null;
      state.isLoggedIn = false;
      state.token = null;

      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logoutState } = authSlice.actions;
export default authSlice.reducer;
