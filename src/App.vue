<script setup lang="ts">
import { RouterView } from "vue-router";
import { LoaderSpinner, NavBar } from "@/components";
</script>

<template>
  <main>
    <NavBar />
    <Suspense>
      <RouterView />
      <template #fallback> <LoaderSpinner /> </template>
    </Suspense>
  </main>
</template>
