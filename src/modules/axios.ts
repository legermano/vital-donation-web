import coreAxios from "axios";

const axios = coreAxios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default axios;
