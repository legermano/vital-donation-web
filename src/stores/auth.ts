import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { router } from "@/router";
import { useNotificationStore } from "@/stores";
import axios, { AxiosError } from "axios";
import type { IAuth } from "@/interfaces";

export const useAuthStore = defineStore("auth", () => {
  // Store JWT token and refresh in local storage to keep user logged in between page refreshes
  // TODO: Verify why does not store correctly on reload
  const auth = useStorage("auth", null as IAuth | null);
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
