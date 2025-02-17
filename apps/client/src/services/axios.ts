import { BASE_URL } from "@nimble/constants";
import axios_ from "axios";
import { ErrorHandler } from "./errorHandler";

const axios = axios_.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axios.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token");
//         if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// )

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    ErrorHandler.handleError(error);
    return Promise.reject(error);
  }
);

export default axios;
