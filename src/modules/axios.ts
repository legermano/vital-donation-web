import coreAxios from "axios";
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

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (useUtils().isTokenExpiredError(err)) {
      originalConfig._retry = true;
      useAuthStore()
        .refreshToken()
        .then(() => axios(originalConfig));
    }

    return Promise.reject(err);
  }
);

export default axios;
