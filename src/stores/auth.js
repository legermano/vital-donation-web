import { defineStore } from "pinia";
import { router } from "@/router";
import { useAlertStore } from "@/stores";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user?.token,
  },
  actions: {
    async login(cpf, password) {
      try {
        // Call API
        const user = {
          id: 1,
          name: "Lucas Germano",
          cpf: cpf,
          email: "lucas.germano@universo.univates.br",
          password: password,
          token: "JWT TOKEN",
        };

        // Update pinia state
        this.user = user;

        // Store user details and JWT in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to previous URL or Default to home page
        router.push(this.returnUrl || "/");
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/account/login");
    },
  },
});
