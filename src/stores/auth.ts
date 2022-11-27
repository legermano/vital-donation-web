import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { router } from "@/router";
import { useUserStore } from "@/stores";
import { useToast } from "@/modules";
import axios, { AxiosError } from "axios";
import type { IAuth } from "@/interfaces";

export const useAuthStore = defineStore("auth", () => {
  const { error } = useToast();
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
        // Update pinia state
        auth.value = data;

        useUserStore().getLoggedUser();

        // Redirect to previous URL or Default to home page
        const oldReturnUrl = returnUrl.value;
        returnUrl.value = null;
        router.push(oldReturnUrl || "/");
      })
      .catch((err) => {
        if (err instanceof Error) {
          if (err instanceof AxiosError && err.response?.status == 403) {
            error(
              "Erro ao logar! Certifique-se que digitou corretamente seu CPF e senha."
            );

            return;
          }

          error(`Erro ao logar! ${err.message}`);
        }
      });
  };

  const logout = (): void => {
    auth.value = null;
    useUserStore().cleanUserInfo();
    router.push("/account/login");
  };

  const refreshToken = async (): Promise<void> => {
    await axios
      .post("/backend/users/refresh-token", null, {
        headers: {
          Authorization: `Bearer ${auth.value?.refresh_token}`,
        },
      })
      .then(({ data }) => {
        auth.value = data;
      })
      .catch(() => logout());
  };

  return {
    auth,
    returnUrl,
    isLoggedIn,
    login,
    logout,
    refreshToken,
  };
});
