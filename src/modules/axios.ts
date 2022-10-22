import coreAxios from "axios";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";
import type { AxiosRequestConfig } from "axios";

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

export default axios;
