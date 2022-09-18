<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";

const { isLoggedIn, user } = storeToRefs(useAuthStore());
const showBurger = ref(false);
const toogleBurger = () => (showBurger.value = !showBurger.value);
const closeBurger = () => (showBurger.value = false);
const logout = () => {
  closeBurger();
  const { logout } = useAuthStore();
  logout();
};
</script>

<template>
  <nav
    class="navbar is-fixed-top is-danger"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a
        role="button"
        class="ml-0 navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarItens"
        @click="toogleBurger"
        :class="{ 'is-active': showBurger }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>

      <RouterLink to="/" class="navbar-item">
        <img src="@/assets/logo.png" width="32" height="28" />
      </RouterLink>
    </div>

    <div
      id="navbarItens"
      class="navbar-menu"
      :class="{ 'is-active': showBurger }"
    >
      <div class="navbar-start">
        <RouterLink to="/" class="navbar-item" @click="closeBurger">
          Home
        </RouterLink>
        <RouterLink to="/about" class="navbar-item" @click="closeBurger">
          Sobre
        </RouterLink>
      </div>

      <div class="navbar-end">
        <div v-if="!isLoggedIn" class="navbar-item">
          <div class="buttons">
            <RouterLink
              to="/account/register"
              class="button is-danger is-light"
              @click="closeBurger"
            >
              <strong>Criar nova conta</strong>
            </RouterLink>
            <RouterLink
              to="/account/login"
              class="button is-light"
              @click="closeBurger"
            >
              Entrar
            </RouterLink>
          </div>
        </div>
        <div v-else class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link is-arrowless">
            <figure class="image">
              <img
                class="is-rounded"
                :src="`https://ui-avatars.com/api/?name=${user.name}`"
              />
            </figure>
            <div class="name">{{ user.name }}</div>
          </a>
          <div class="navbar-dropdown">
            <RouterLink
              to="/user/edit"
              class="navbar-item"
              @click="closeBurger"
            >
              <span class="columns is-centered icon-text">
                <span class="column icon">
                  <i class="fas fa-pencil"></i>
                </span>
                <span class="column">Editar dados</span>
              </span>
            </RouterLink>
            <button
              class="navbar-item button is-danger is-light is-fullwidth"
              @click="logout"
            >
              <strong>Logout</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a.navbar-item.is-active,
a.navbar-item:hover {
  color: #ef2e55;
}
.name {
  margin: 0 1rem;
}
</style>
