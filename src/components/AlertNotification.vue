<script setup>
import { storeToRefs } from "pinia";
import { useAlertStore } from "@/stores";

const alertStore = useAlertStore();
const { alert } = storeToRefs(useAlertStore());
</script>

<template>
  <div v-if="alert" class="container columns is-centered">
    <div class="notification is-light" :class="alert.type">
      <button class="delete" @click="alertStore.clear()"></button>
      {{ alert.message }}
    </div>
  </div>
</template>

<style scoped>
.notification {
  position: absolute;
  z-index: 1;
  margin-top: 1rem;
}
</style>
