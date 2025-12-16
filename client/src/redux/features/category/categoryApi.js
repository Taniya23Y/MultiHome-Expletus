// src/redux/features/category/categoryApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/categories",
    credentials: "include",
  }),
  tagTypes: ["Categories", "SingleCategory"],

  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Categories"],
      transformResponse: (response) => response.categories,
    }),

    getCategoryById: builder.query({
      query: (id) => `/category/${id}`,
      providesTags: ["SingleCategory"],
      transformResponse: (response) => response.category,
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories", "SingleCategory"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
