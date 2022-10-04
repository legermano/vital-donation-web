<script setup lang="ts">
import { RouterView } from "vue-router";
import { NavBar, NotificationCard } from "@/components";
</script>

<template>
  <main>
    <NavBar />
    <NotificationCard />
    <RouterView />
  </main>
</template>
