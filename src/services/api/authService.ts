import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../redux/store";

export const authService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.noroff.dev/api/v1/holidaze/auth/",
/*     prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).authSlice.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }, */
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
