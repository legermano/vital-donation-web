import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default ({ node }) => {
  process.env = { ...process.env, ...loadEnv(node, process.cwd()) };

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      proxy: {
        "/login": {
          target: process.env.VITE_API_URL + "/login",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/login/, ""),
        },
        "/api": {
          target: process.env.VITE_API_URL + "/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};
