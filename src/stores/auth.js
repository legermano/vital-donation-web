import { defineStore } from "pinia";
import { router } from "@/router";
import { useNotificationStore } from "@/stores";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    jwtToken: localStorage.getItem("jwtToken"),
    returnUrl: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.jwtToken,
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
        this.jwtToken = user.token;

        // Store JWT token in local storage to keep user logged in between page refreshes
        localStorage.setItem("jwtToken", user.token);

        // Redirect to previous URL or Default to home page
        const returnUrl = this.returnUrl;
        this.returnUrl = null;
        router.push(returnUrl || "/");
      } catch (error) {
        const notificationStore = useNotificationStore();
        notificationStore.error("Ocoreu um erro", error.message);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem("jwtToken");
      router.push("/account/login");
    },
  },
});
