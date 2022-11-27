<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { onClickOutside } from "@vueuse/core";
import { useAuthStore, useUserStore } from "@/stores";

const { isLoggedIn } = storeToRefs(useAuthStore());
const { user, isManager } = storeToRefs(useUserStore());

const navBar = ref(null);
const showBurger = ref(false);

onClickOutside(navBar, () => closeBurger());

const toogleBurger = () => (showBurger.value = !showBurger.value);

const closeBurger = () => (showBurger.value = false);

const logout = () => {
  closeBurger();
  useAuthStore().logout();
};
</script>

<template>
  <nav
    ref="navBar"
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

      <RouterLink to="/" class="navbar-item item-home" @click="closeBurger">
        <img src="@/assets/logo.png" width="28" height="32" />
      </RouterLink>
    </div>

    <div
      id="navbarItens"
      class="navbar-menu"
      :class="{ 'is-active': showBurger }"
      @click="closeBurger"
    >
      <div class="navbar-start">
        <RouterLink to="/#about-page-section" class="navbar-item item-home">
          Sobre
        </RouterLink>
        <RouterLink to="/#faq-section" class="navbar-item item-home">
          FAQ
        </RouterLink>
        <RouterLink to="/#institutional-footer" class="navbar-item item-home">
          Institucional
        </RouterLink>
        <RouterLink
          v-if="isManager === false"
          to="/donation/user-donations"
          class="navbar-item item-home"
        >
          Suas doações
        </RouterLink>
        <RouterLink
          v-if="isManager"
          to="/donation/list"
          class="navbar-item item-home"
        >
          Doações
        </RouterLink>
      </div>

      <div class="navbar-end">
        <div v-if="!isLoggedIn" class="navbar-item">
          <div class="buttons">
            <RouterLink
              to="/account/register"
              class="button is-danger is-light"
            >
              <strong>Criar nova conta</strong>
            </RouterLink>
            <RouterLink to="/account/login" class="button is-light">
              Entrar
            </RouterLink>
          </div>
        </div>
        <div v-else class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link is-arrowless">
            <div class="is-flex">
              <figure class="image">
                <img
                  class="is-rounded"
                  :src="`https://ui-avatars.com/api/?name=${user?.name}`"
                />
              </figure>
              <div class="name">{{ user?.name }}</div>
            </div>
          </a>
          <div class="navbar-dropdown">
            <RouterLink to="/user/edit" class="navbar-item">
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

<style scoped lang="scss">
a.navbar-item.is-active,
a.navbar-item:hover {
  color: #ef2e55;
}

.item-home {
  @media screen and (min-width: 1024px) {
    background-color: hsl(348deg, 86%, 61%) !important;

    &:hover {
      background-color: #ef2e55 !important;
    }
  }

  @media screen and (max-width: 1024px) {
    &[href="/"] {
      background-color: hsl(348deg, 86%, 61%) !important;
    }
    color: hsl(0deg, 0%, 29%) !important;
  }
}
.name {
  margin: 0 1rem;
}
</style>
