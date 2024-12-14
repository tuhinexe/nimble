import { apiSlice } from "@nimble/services/api";

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
    fetchProfile: builder.mutation({
      query: (ownerID) => ({
        url: "/user/profile",
        method: "POST",
        data: { ownerID },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useFetchProfileMutation,
} = authApiSlice;
