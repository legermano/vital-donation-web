<script setup lang="ts">
// Needs to import directly from the file,because namespace is not supported by vite-plugin-vue-type-imports
import flatPickr from "vue-flatpickr-component";
import { BaseInput } from "@/components/fields";
import { Portuguese } from "flatpickr/dist/l10n/pt";
import type { IBaseInput } from "@/interfaces/IBaseInput";

const props = withDefaults(defineProps<IBaseInput>(), {
  horizontal: false,
  showTitle: true,
  title: "Data",
  initialValue: "",
});

const config = {
  dateFormat: "d/m/Y",
  locale: Portuguese,
  defaultDate: props.initialValue,
};
</script>

<template>
  <BaseInput
    :name="name"
    :horizontal="horizontal"
    :showTitle="showTitle"
    :title="title"
    iconClass="fa-regular fa-calendar-days"
    v-slot="{ value, handlers, errorMessage }"
  >
    <flat-pickr
      class="input"
      type="date"
      :placeholder="title"
      :class="{ 'is-danger': errorMessage }"
      :model-value="value"
      :config="config"
      v-on="handlers"
    />
  </BaseInput>
</template>
