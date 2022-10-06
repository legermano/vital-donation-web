import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { axios } from "@/modules";
import type { IUser } from "@/interfaces";

export const useUserStore = defineStore("user", () => {
  const user = useStorage<IUser>("user", {} as IUser);

  const getUserInfo = () => {
    axios.get("/users/").then(({ data }) => {
      user.value = data;
    });
  };

  return {
    user,
    getUserInfo,
  };
});
