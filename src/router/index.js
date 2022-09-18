import { createRouter, createWebHistory } from "vue-router";
import { useAlertStore, useAuthStore, useFormValidationStore } from "@/stores";
import { HomeView } from "@/views";
import accountRoutes from "./account.routes";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "is-active",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    { ...accountRoutes },
  ],
});

router.beforeEach(async (to) => {
  // Clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // Clear form validation on route change
  const formValidationStore = useFormValidationStore();
  formValidationStore.clear();

  // Redirect to login page if not logged in and trying to access restricted page
  const publicPages = ["/", "/account/login", "/account/register"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.isLoggedIn) {
    authStore.returnUrl = to.fullPath;
    return "/account/login";
  }
});
