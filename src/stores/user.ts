import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { axios, useUtils, useToast } from "@/modules";
import { router } from "@/router";
import { AxiosError } from "axios";
import { ref, computed } from "vue";
import type { ICompletedForm, IUser } from "@/interfaces";

export const useUserStore = defineStore("user", () => {
  const user = useStorage<IUser | null>("user", {} as IUser);
  const completedForms = ref<Array<ICompletedForm> | null>(null);
  const users = ref<IUser[]>([]);
  const { success, error } = useToast();

  const createUser = (
    name: string,
    cpf: string,
    email: string,
    password: string
  ): void => {
    axios
      .post("/users", { name, cpf, email, password })
      .then(() => {
        success("Usuário criado com sucesso!");
        router.push("/account/login");
      })
      .catch((err) => {
        if (
          err instanceof AxiosError &&
          err.response?.status == 403 &&
          err.message.includes("already exists")
        ) {
          error("Já existe um usuário cadastrado para esse CPF!");

          return;
        }

        if (!useUtils().isTokenExpiredError(err)) {
          error(`Erro ao criar uma nova conta: ${err.message}`);
        }
      });
  };

  const updateUser = async (user: IUser): Promise<void> => {
    axios
      .put(`/users/${user.id}`, user)
      .then(() => {
        success("Dados atualizados com sucesso!");
      })
      .catch((err) => {
        if (
          err instanceof AxiosError &&
          err.response?.status == 404 &&
          err.message.includes("user not found")
        ) {
          error(
            "Não foi possível encontrar o usuário para atualizar os dados. Tente relogar na aplicação!"
          );

          return;
        }

        if (!useUtils().isTokenExpiredError(error)) {
          error(`Erro ao atualizar dados: ${err.message}`);
        }
      });
  };

  const getLoggedUser = async () => {
    axios.get("/users").then(async ({ data }) => {
      user.value = data;

      if (user.value != null) {
        completedForms.value = await getUserCompletedForms(user.value);
      }
    });
  };

  const getAllUsers = async (): Promise<void> => {
    await axios.get("/users/list").then(({ data }) => (users.value = data));
  };

  const getUser = async (id: string): Promise<IUser> => {
    return await axios.get(`/users/${id}`).then(({ data }) => data as IUser);
  };

  const cleanUserInfo = () => (user.value = null);

  const getUserCompletedForms = async (
    user: IUser
  ): Promise<ICompletedForm[]> => {
    return await axios
      .get(`/forms/completed/forms/user/${user.id}`)
      .then(({ data }) => data as ICompletedForm[]);
  };

  const isSuperUser = computed(() =>
    user.value?.roles?.some((r) => r.name == "SUPER_USER")
  );

  const isAdmin = computed(() =>
    user.value?.roles?.some((r) => r.name == "ADMIN" || r.name == "SUPER_USER")
  );

  const isManager = computed(() =>
    user.value?.roles?.some(
      (r) => r.name == "MANAGER" || r.name == "ADMIN" || r.name == "SUPER_USER"
    )
  );

  return {
    user,
    isAdmin,
    isManager,
    isSuperUser,
    users,
    completedForms,
    createUser,
    getLoggedUser,
    cleanUserInfo,
    updateUser,
    getUserCompletedForms,
    getAllUsers,
    getUser,
  };
});
