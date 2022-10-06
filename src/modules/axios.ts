import coreAxios from "axios";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";
import type { AxiosRequestConfig } from "axios";

const axios = coreAxios.create({
  baseURL: "/api",
});

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers != undefined) {
    const { auth } = storeToRefs(useAuthStore());
    config.headers.Authorization = `Bearer ${auth.value.access_token}`;
  }

  return config;
});

export default axios;
