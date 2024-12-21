import { apiSlice } from "@nimble/services/api";
import { AxiosError } from "axios";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        data: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      }),
    }),
    fetchProfile: builder.query<unknown | AxiosError, void>({
      query: () => ({
        url: "/owner",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation, useFetchProfileQuery } =
  authApiSlice;
