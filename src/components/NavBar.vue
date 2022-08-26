<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const showBurger = ref(false);

function toogleBurger() {
  showBurger.value = !showBurger.value;
}

function closeBurger() {
  if (showBurger.value) {
    showBurger.value = false;
  }
}
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
          About
        </RouterLink>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-danger is-light">
              <strong>Sign up</strong>
            </a>
            <RouterLink
              to="/login"
              class="button is-light"
              @click="closeBurger"
            >
              Log in
            </RouterLink>
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
</style>
