import { AxiosError } from "axios";

export default function useUtils() {
  const isTokenExpiredError = (error: any): boolean => {
    return (
      error instanceof AxiosError &&
      error.response?.status == 403 &&
      error.response?.data.message.includes("The Token has expired")
    );
  };

  return {
    isTokenExpiredError,
  };
}
