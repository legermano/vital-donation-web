import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { router } from "@/router";
import { useNotificationStore, useUserStore } from "@/stores";
import axios, { AxiosError } from "axios";
import type { IAuth } from "@/interfaces";

export const useAuthStore = defineStore("auth", () => {
  // Store JWT token and refresh in local storage to keep user logged in between page refreshes
  const auth = useStorage<IAuth | null>("auth", {} as IAuth);
  const returnUrl = ref<string | null>();

  const isLoggedIn = computed(() => !!auth.value?.access_token);

  const login = async (cpf: string, password: string): Promise<void> => {
    const data = new FormData();
    data.append("login", cpf.replace(/[^\d]+/g, ""));
    data.append("password", password);

    axios
      .post("/login", data, {
        headers: {
          "Content-Type": "multipart/form-data;",
        },
      })
      .then(({ data }) => {
        useUserStore().getUserInfo();
        // Update pinia state
        auth.value = data;

        // Redirect to previous URL or Default to home page
        const oldReturnUrl = returnUrl.value;
        returnUrl.value = null;
        router.push(oldReturnUrl || "/");
      })
      .catch((error) => {
        if (error instanceof Error) {
          const notificationStore = useNotificationStore();

          if (error instanceof AxiosError && error.response?.status == 403) {
            notificationStore.error(
              "Erro ao logar!",
              "Certifique-se que digitou corretamente seu CPF e senha."
            );

            return;
          }

          notificationStore.error("Erro ao logar!", error.message);
        }
      });
  };

  const logout = (): void => {
    auth.value = null;
    useUserStore().cleanUserInfo();
    router.push("/account/login");
  };

  return {
    auth,
    returnUrl,
    isLoggedIn,
    login,
    logout,
  };
});
