import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { axios } from "@/modules";
import { router } from "@/router";
import { AxiosError } from "axios";
import { useNotificationStore } from "@/stores";
import type { IUser } from "@/interfaces";

export const useUserStore = defineStore("user", () => {
  const user = useStorage<IUser | null>("user", {} as IUser);

  const createUser = (
    name: string,
    cpf: string,
    email: string,
    password: string
  ): void => {
    axios
      .post("/users", { name, cpf, email, password })
      .then(() => {
        useNotificationStore().success(
          "Usuário criado",
          "Usuário criado com sucesso!"
        );
        router.push("/account/login");
      })
      .catch((error) => {
        const notificationStore = useNotificationStore();

        if (
          error instanceof AxiosError &&
          error.response?.status == 403 &&
          error.message.includes("already exists")
        ) {
          notificationStore.error(
            "Erro ao criar uma nova conta",
            "Já existe um usuário cadastrado para esse CPF!"
          );

          return;
        }

        notificationStore.error("Erro ao criar uma nova conta", error.message);
      });
  };

  const getUserInfo = () => {
    axios.get("/users").then(({ data }) => {
      user.value = data;
    });
  };

  const cleanUserInfo = () => (user.value = null);

  return {
    user,
    createUser,
    getUserInfo,
    cleanUserInfo,
  };
});
