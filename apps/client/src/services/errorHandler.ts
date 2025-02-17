import { APIResponseError } from "@nimble/types";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
export class ErrorHandler {
  static handleError(error: unknown): void {
    console.log("heree", typeof error);
    if (error instanceof AxiosError) {
      const apiError = error.response?.data as APIResponseError;

      if (apiError) {
        console.error("API Error:", apiError);
        if (apiError.message) {
          toast.error(apiError.message, {
            position: "top-right",
            duration: 4000,
          });
        }

        if (apiError.errors) {
          Object.entries(apiError.errors).forEach(([field, messages]) => {
            toast.error(`${field}: ${messages.join(", ")}`, {
              position: "top-right",
              duration: 4000,
            });
          });
        }
      } else {
        console.error("Axios Error:", error);
        switch (error?.status) {
          case 400:
            toast.error("Bad Request: Please check your input", {
              position: "top-right",
            });
            break;
          case 401:
            toast.error("Unauthorized: Please log in again", {
              position: "top-right",
            });

            break;
          case 403:
            toast.error("Forbidden: You do not have permission", {
              position: "top-right",
            });
            break;
          case 404:
            toast.error("Not Found: The requested resource does not exist", {
              position: "top-right",
            });
            break;
          case 500:
            toast.error("Server Error: Something went wrong", {
              position: "top-right",
            });
            break;
          default:
            toast.error("An unexpected error occurred", {
              position: "top-right",
            });
        }
      }
    } else if (error instanceof Error) {
      toast.error(error.message, {
        position: "top-right",
      });
    } else {
      toast.error("An unknown error occurred", {
        position: "top-right",
      });
    }

    console.error("Detailed Error:", error);
  }

  static handleValidationErrors(errors: Record<string, string[]>) {
    Object.entries(errors).forEach(([field, messages]) => {
      toast.error(`${field}: ${messages.join(", ")}`, {
        position: "top-right",
        duration: 4000,
      });
    });
  }
}
