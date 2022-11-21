import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import VueTypeImports from "vite-plugin-vue-type-imports";

export default ({ node }) => {
  process.env = { ...process.env, ...loadEnv(node, process.cwd()) };

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [vue(), VueTypeImports()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "bulma/sass/utilities/mixins.sass";`,
        },
      },
    },
    server: {
      proxy: {
        "/login": {
          target: process.env.VITE_API_URL + "/login",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/login/, ""),
        },
        "/backend": {
          target: process.env.VITE_API_URL + "/api",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/backend/, ""),
        },
      },
    },
  });
};
