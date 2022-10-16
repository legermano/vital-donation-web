<script setup lang="ts">
import BaseInput from "./BaseInput.vue";
// Needs to import directly from the file,because namespace is not supported by vite-plugin-vue-type-imports
import type { IBaseInput } from "@/interfaces/IBaseInput";
import { ref, watch } from "vue";

withDefaults(defineProps<IBaseInput>(), {
  horizontal: false,
  showTitle: true,
  title: "Celular",
  initialValue: "",
});

const value = ref("");
const phoneMask = ref("(##) ####-####");

watch(value, (newValue) => {
  const phoneNumber = newValue.replace(/[^\d]+/g, "");

  if (phoneNumber.length == 11) {
    phoneMask.value = "(##) #####-####";
  }
});
</script>

<template>
  <BaseInput
    :name="name"
    :horizontal="horizontal"
    :show-title="showTitle"
    :title="title"
    :initial-value="initialValue"
    :mask="phoneMask"
    icon-class="fa-solid fa-phone"
    v-model="value"
  >
    <template #leftAddon>
      <a class="button is-static">+55</a>
    </template>
  </BaseInput>
</template>
