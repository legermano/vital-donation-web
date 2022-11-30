import type { IUser } from "@/interfaces";
import { Constants } from "@/types";
import { AxiosError } from "axios";
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");

export const useUtils = () => {
  const isTokenExpiredError = (error: any): boolean => {
    return (
      error instanceof AxiosError &&
      error.response?.status == 403 &&
      error.response?.data.message.includes("The Token has expired")
    );
  };

  const userWeightInKilos = (user: IUser) => {
    if (user.weight == null) return;

    return user.weight.toFixed(2);
  };

  const userHeightInMeters = (user: IUser) => {
    if (user.height == null) return;

    return user.height.toFixed(2);
  };

  const formatDate = (date: string) => {
    return moment(date, Constants.backendDateFormat).format(
      Constants.frontendDateFormat
    );
  };

  const formatDatetime = (datetime: string) => {
    return moment(datetime, Constants.backendDateTimeFormat).format(
      Constants.frontendDateTimeFormat
    );
  };

  return {
    isTokenExpiredError,
    userWeightInKilos,
    userHeightInMeters,
    formatDate,
    formatDatetime,
  };
};
