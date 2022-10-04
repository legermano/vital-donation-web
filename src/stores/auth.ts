import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { router } from "@/router";
import { useNotificationStore } from "@/stores";
import axios from "axios";
import type { IAuth } from "@/interfaces";

export const useAuthStore = defineStore("auth", () => {
  // Store JWT token and refresh in local storage to keep user logged in between page refreshes
  const auth = useStorage("auth", null as IAuth | null);
  const returnUrl = ref<string | null>();

  const isLoggedIn = computed(() => !!auth.value?.access_token);

  const login = async (cpf: string, password: string): Promise<void> => {
    axios
      .get("http://localhost:8080/login", {
        data: {
          login: cpf,
          password,
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
          notificationStore.error("Ocoreu um erro", error.message);
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
