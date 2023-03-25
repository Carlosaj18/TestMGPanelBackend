import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "Users",
    "UserFilter",
    "UpdateUser",
    "DeleteUser",
    "PostSignUp",
    "PostSignUpAdmin",
  ],
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => "user/all",
      providesTags: [
        "Users",
        "UserFilter",
        "UpdateUser",
        "PostSignUp",
        "PostSignUpAdmin",
      ],
    }),
    getUserFilter: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "user/filter",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["UserFilter"],
    }),
    updateUser: build.mutation({
      query: ({ id, ...payload }) => ({
        url: `user/updateProfile/${id}`,
        method: "PUT",
        body: payload,
      }),
      providesTags: ["UpdateUser"],
    }),
    deleteItem: build.mutation({
      query: ({ id }) => ({
        url: `user/delete/${id}`,
        method: "DELETE",
      }),
      providesTags: ["DeleteUser"],
    }),
    postSignUp: build.mutation({
      query: ({ ...payload }) => {
        return {
          url: "auth/register",
          method: "POST",
          body: payload,
        };
      },
      providesTags: ["PostSignUp"],
    }),
    postSignUpAdmin: build.mutation({
      query: ({ ...payload }) => {
        return {
          url: "auth/registerAdmin",
          method: "POST",
          body: payload,
        };
      },
      providesTags: ["PostSignUpAdmin"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserFilterQuery,
  useUpdateUserMutation,
  useUpdateStatusUserMutation,
  useDeleteItemMutation,
  usePostSignUpMutation,
  usePostSignUpAdminMutation,
} = api;
