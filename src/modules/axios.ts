import coreAxios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";
import type { AxiosRequestConfig } from "axios";
import { useUtils } from "@/modules";

const axios = coreAxios.create({
  baseURL: "/backend",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const { auth, isLoggedIn } = storeToRefs(useAuthStore());
  if (config.headers != undefined && isLoggedIn) {
    config.headers.Authorization = `Bearer ${auth.value?.access_token}`;
  }

  return config;
});

const refreshAuthLogin = async (failedRequest: any): Promise<void> => {
  if (useUtils().isTokenExpiredError(failedRequest)) {
    await useAuthStore().refreshToken();
  }

  return Promise.resolve();
};

createAuthRefreshInterceptor(axios, refreshAuthLogin, {
  statusCodes: [403],
});

export default axios;
