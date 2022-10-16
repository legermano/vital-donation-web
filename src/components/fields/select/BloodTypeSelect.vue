<script setup lang="ts">
import BaseSelect from "./BaseSelect.vue";
import type { IBaseSelect } from "@/interfaces/IBaseSelection";
import { BloodType } from "@/types";

withDefaults(defineProps<IBaseSelect>(), {
  horizontal: false,
  showTitle: true,
  title: "Selecione o tipo sanguineo",
  useDefaultOption: true,
  defaultOption: "Selecione o tipo sanguineo",
});

const selectOptions = Object.values(BloodType);
</script>

<template>
  <BaseSelect
    :name="name"
    :horizontal="horizontal"
    :show-title="showTitle"
    :title="title"
    :initial-value="initialValue"
    :use-default-option="useDefaultOption"
    :default-option="defaultOption"
    :options="selectOptions"
    icon-class="fa-solid fa-droplet"
  />
</template>
