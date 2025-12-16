import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import sellerAuthReducer from "./features/seller/sellerAuthSlice";
import adminAuthReducer from "./features/admin/adminAuthSlice";
import propertyReducer from "./features/property/propertySlice";

import { apiSlice } from "./features/api/apiSlice";
import { sellerApi } from "./features/seller/sellerApi";
import { propertyApi } from "./features/property/propertyApi";
import { categoryApi } from "./features/category/categoryApi";
import { subcategoryApi } from "./features/category/subcategoryApi";
import { adminPropertyApi } from "./features/admin/adminPropertyApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [sellerApi.reducerPath]: sellerApi.reducer,
    [adminPropertyApi.reducerPath]: adminPropertyApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [subcategoryApi.reducerPath]: subcategoryApi.reducer,

    auth: authReducer,
    sellerAuth: sellerAuthReducer,
    adminAuth: adminAuthReducer,
    property: propertyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(sellerApi.middleware)
      .concat(adminPropertyApi.middleware)
      .concat(propertyApi.middleware)
      .concat(categoryApi.middleware)
      .concat(subcategoryApi.middleware),
});
