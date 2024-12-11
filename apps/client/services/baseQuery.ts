import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios from "./axios";
import { AxiosError } from "axios";

const customBaseQuery: BaseQueryFn<
  {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    data?: any;
    params?: any;
  },
  unknown,
  unknown
> = async ({ url, method, data, params }) => {
  try {
    const result = await axios({
      url,
      method,
      data,
      params,
    });

    return { data: result.data };
  } catch (axiosError) {
    const error = axiosError as AxiosError;

    return {
      error: { status: error.response?.status, data: error.response?.data },
    };
  }
};

export default customBaseQuery;
