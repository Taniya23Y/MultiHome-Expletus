import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { apiSlice } from "./features/api/apiSlice";
import { propertiesApi } from "./features/properties/propertiesApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
});
