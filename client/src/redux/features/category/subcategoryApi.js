import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subcategoryApi = createApi({
  reducerPath: "subcategoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/subcategories",
    credentials: "include",
  }),
  tagTypes: ["Subcategories", "SingleSubcategory"],

  endpoints: (builder) => ({
    getSubcategories: builder.query({
      query: () => "/subcategories",
      providesTags: ["Subcategories"],
    }),

    getSubcategoryById: builder.query({
      query: (id) => `/subcategory/${id}`,
      providesTags: ["SingleSubcategory"],
    }),

    createSubcategory: builder.mutation({
      query: (data) => ({
        url: "/create-subcategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subcategories"],
    }),

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
