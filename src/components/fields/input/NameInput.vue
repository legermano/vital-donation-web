<script setup lang="ts">
// Needs to import directly from the file,because namespace is not supported by vite-plugin-vue-type-imports
import type { IBaseInput } from "@/interfaces/IBaseInput";
import BaseInput from "./BaseInput.vue";

withDefaults(defineProps<IBaseInput>(), {
  horizontal: false,
  showTitle: true,
  title: "Nome",
  initialValue: "",
});
</script>

<template>
  <BaseInput
    :name="name"
    :horizontal="horizontal"
    :show-title="showTitle"
    :title="title"
    :initial-value="initialValue"
    :readonly="readonly"
    :disabled="disabled"
    icon-class="fas fa-user"
  />
</template>
