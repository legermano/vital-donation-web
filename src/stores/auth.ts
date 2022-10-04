import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { router } from "@/router";
import { useNotificationStore } from "@/stores";
import type { IAuth } from "@/interfaces";

export const useAuthStore = defineStore("auth", () => {
  // Store JWT token and refresh in local storage to keep user logged in between page refreshes
  const auth = useStorage("auth", null as IAuth | null);
  const returnUrl = ref<string | null>();

  const isLoggedIn = computed(() => !!auth.value?.access_token);

  async function login(cpf: string, password: string): Promise<void> {
    try {
      // TOD: Call API
      const user = {
        cpf: cpf,
        password: password,
      };

      // Update pinia state
      auth.value = { access_token: "aaa", refresh_token: "bbb" };

      // Redirect to previous URL or Default to home page
      const oldReturnUrl = returnUrl.value;
      returnUrl.value = null;
      router.push(oldReturnUrl || "/");
    } catch (error) {
      if (error instanceof Error) {
        const notificationStore = useNotificationStore();
        notificationStore.error("Ocoreu um erro", error.message);
      }
    }
  }

  function logout(): void {
    auth.value = null;
    router.push("/account/login");
  }

  return {
    auth,
    returnUrl,
    isLoggedIn,
    login,
    logout,
  };
});
