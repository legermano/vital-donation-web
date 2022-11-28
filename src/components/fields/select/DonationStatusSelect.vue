<script setup lang="ts">
import BaseSelect from "./BaseSelect.vue";
import { DonationStatus } from "@/types";
import type { IBaseSelect } from "@/interfaces/IBaseSelection";

withDefaults(defineProps<IBaseSelect>(), {
  horizontal: false,
  showTitle: true,
  title: "Selecione o status da doação",
  useDefaultOption: false,
});

const selectOptions = Object.values(DonationStatus);
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
    icon-class="fa-solid fa-syringe"
  />
</template>
