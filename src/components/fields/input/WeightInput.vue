<script setup lang="ts">
import BaseInput from "./BaseInput.vue";
// Needs to import directly from the file,because namespace is not supported by vite-plugin-vue-type-imports
import type { IBaseInput } from "@/interfaces/IBaseInput";
import { ref, watch } from "vue";

const props = withDefaults(defineProps<IBaseInput>(), {
  horizontal: false,
  showTitle: true,
  title: "Peso",
});

const value = ref("");
const weightMask = ref("###.##");

const updateMask = (value: string) => {
  const dotIndex = value.indexOf(".");

  if (dotIndex == 1) {
    weightMask.value = "#.##";
  }

  if (dotIndex == 2) {
    weightMask.value = "##.##";
  }

  if (dotIndex >= 3 || dotIndex < 1) {
    weightMask.value = "###.##";
  }
};

if (typeof props.initialValue === "string") {
  updateMask(props.initialValue);
}

watch(value, (newValue) => updateMask(newValue));
</script>

<template>
  <BaseInput
    :name="name"
    :horizontal="horizontal"
    :show-title="showTitle"
    :title="title"
    :initial-value="initialValue"
    :mask="weightMask"
    icon-class="fa-solid fa-weight-scale"
    v-model="value"
  >
    <template #rightAddon>
      <a class="button is-static"> Kg </a>
    </template>
  </BaseInput>
</template>
