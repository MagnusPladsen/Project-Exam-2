import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, RegisterRequest, User } from "../../types/types";

export const authService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.noroff.dev/api/v1/holidaze/auth/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginRequest>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response: any) => {
        if (!response.ok) throw new Error(response.data.status);
        return response.json();
      },
    }),
    register: builder.mutation<User, RegisterRequest>({
      query: (body) => ({
        url: "register",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response: any) => {
        if (!response.ok) throw new Error(response.data.status);
        return response.json();
      },
    }),
    protected: builder.mutation({
      query: () => "protected",
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useProtectedMutation } =
  authService;
