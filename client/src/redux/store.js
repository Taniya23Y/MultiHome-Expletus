import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { apiSlice } from "./features/api/apiSlice";
import { sellerApi } from "./features/seller/sellerApi";
import { propertyApi } from "./features/property/propertyApi";
import sellerAuthReducer from "./features/seller/sellerAuthSlice";
import propertyReducer from "./features/property/propertySlice";
import { categoryApi } from "./features/category/categoryApi";
import { subcategoryApi } from "./features/category/subcategoryApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [subcategoryApi.reducerPath]: subcategoryApi.reducer,

    auth: authReducer,
    sellerAuth: sellerAuthReducer,
    property: propertyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(sellerApi.middleware)
      .concat(propertyApi.middleware)
      .concat(categoryApi.middleware)
      .concat(subcategoryApi.middleware),
});
