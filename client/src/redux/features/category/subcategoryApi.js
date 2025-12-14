import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subcategoryApi = createApi({
  reducerPath: "subcategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/subcategories",
    credentials: "include",
  }),
  tagTypes: ["Subcategories", "SingleSubcategory"],

  endpoints: (builder) => ({
    // ---------------------- GET ALL SUBCATEGORIES ----------------------
    getSubcategories: builder.query({
      query: () => "/subcategories",
      providesTags: ["Subcategories"],
    }),

    // ---------------------- GET SUBCATEGORY BY ID ----------------------
    getSubcategoryById: builder.query({
      query: (id) => `/subcategory/${id}`,
      providesTags: ["SingleSubcategory"],
    }),

    // ---------------------- CREATE SUBCATEGORY ----------------------
    createSubcategory: builder.mutation({
      query: (data) => ({
        url: "/create-subcategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subcategories"],
    }),

    // ---------------------- UPDATE SUBCATEGORY ----------------------
    updateSubcategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subcategory/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subcategories", "SingleSubcategory"],
    }),

    getSubcategoryByCategory: builder.query({
      query: (categoryId) => `/category/${categoryId}`,
      providesTags: ["Subcategories"],
    }),

    // ---------------------- DELETE SUBCATEGORY ----------------------
    deleteSubcategory: builder.mutation({
      query: (id) => ({
        url: `/subcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subcategories"],
    }),
  }),
});

export const {
  useGetSubcategoriesQuery,
  useGetSubcategoryByIdQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useGetSubcategoryByCategoryQuery,
  useDeleteSubcategoryMutation,
} = subcategoryApi;
