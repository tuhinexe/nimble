import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./baseQuery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});

export default apiSlice;
