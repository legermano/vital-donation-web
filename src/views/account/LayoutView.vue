<script setup>
import { useAuthStore } from "@/stores";
import { router } from "@/router";

const { isLoggedIn } = useAuthStore();

if (isLoggedIn) {
  router.push("/");
}
</script>

<template>
  <section class="hero">
    <RouterView></RouterView>
  </section>
</template>
