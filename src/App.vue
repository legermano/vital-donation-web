<script setup>
import { RouterView } from "vue-router";
import { NavBar, AlertNotification } from "@/components";
</script>

<template>
  <main>
    <NavBar />
    <AlertNotification />
    <RouterView />
  </main>
</template>
