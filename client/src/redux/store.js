import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { apiSlice } from "./features/api/apiSlice";
import { sellerApi } from "./features/seller/sellerApi";
import sellerAuthReducer from "./features/seller/sellerAuthSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    sellerAuth: sellerAuthReducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(sellerApi.middleware),
});
