import type { IUser } from "@/interfaces";
import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = useStorage("user", null as IUser | null);

  return {
    user,
  };
});
