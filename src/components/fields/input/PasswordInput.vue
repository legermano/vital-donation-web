<script setup lang="ts">
// Needs to import directly from the file,because namespace is not supported by vite-plugin-vue-type-imports
import type { IBaseInput } from "@/interfaces/IBaseInput";
import BaseInput from "./BaseInput.vue";

withDefaults(defineProps<IBaseInput>(), {
  horizontal: false,
  showTitle: true,
  title: "Senha",
  initialValue: "",
});
</script>

<template>
  <BaseInput
    :name="name"
    :horizontal="horizontal"
    :showTitle="showTitle"
    :title="title"
    :initialValue="initialValue"
    iconClass="fas fa-lock"
    type="password"
  />
</template>
