<script setup lang="ts">
import BaseSelect from "./BaseSelect.vue";
import { BloodType, Constants } from "@/types";
import type { IBaseSelect } from "@/interfaces/IBaseSelection";

withDefaults(defineProps<IBaseSelect>(), {
  horizontal: false,
  showTitle: true,
  title: Constants.bloodTypeDefaultOption,
  useDefaultOption: true,
  defaultOption: Constants.bloodTypeDefaultOption,
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
