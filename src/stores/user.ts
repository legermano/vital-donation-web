import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { axios } from "@/modules";
import { router } from "@/router";
import { AxiosError } from "axios";
import { useNotificationStore } from "@/stores";
import { computed } from "vue";
import { Constants } from "@/types";
import moment from "moment";
import "moment/locale/pt-br";
import type { IUser } from "@/interfaces";

moment.locale("pt-br");

export const useUserStore = defineStore("user", () => {
  const user = useStorage<IUser | null>("user", {} as IUser);

  const formattedBirthDate = computed(() => {
    if (user.value?.birthdate == null) return null;

    return moment(user.value.birthdate, Constants.backendDateFormat).format(
      Constants.frontendDateFormat
    );
  });

  const weightInKilos = computed(() => {
    if (user.value?.weight == null) return;

    return (user.value.weight / 1000).toFixed(2);
  });

  const heightInMeters = computed(() => {
    if (user.value?.height == null) return;

    return (user.value.height / 100).toFixed(2);
  });

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

  const updateUser = (user: IUser): void => {
    console.log(user);
    axios
      .put(`/users/${user.id}`, user)
      .then(() => {
        useNotificationStore().success(
          "Dados atualizados!",
          "Dados atualizados com sucesso!"
        );

        getUserInfo();
      })
      .catch((error) => {
        const notificationStore = useNotificationStore();

        if (
          error instanceof AxiosError &&
          error.response?.status == 404 &&
          error.message.includes("user not found")
        ) {
          notificationStore.error(
            "Usuário não encontrado",
            "Não foi possível encontrar o usuário para atualizar os dados. Tente relogar na aplicação!"
          );

          return;
        }

        notificationStore.error("Error ao atualizar dados", error.message);
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
    formattedBirthDate,
    weightInKilos,
    heightInMeters,
    createUser,
    getUserInfo,
    cleanUserInfo,
    updateUser,
  };
});
