<script setup lang="ts">
import flatPickr from "vue-flatpickr-component";
import { BaseInput } from "@/components/fields";
import { Portuguese } from "flatpickr/dist/l10n/pt";
// Needs to import directly from the file,because namespace is not supported by vite-plugin-vue-type-imports
import type { IBaseDate } from "@/interfaces/IBaseDate";

const props = withDefaults(defineProps<IBaseDate>(), {
  horizontal: false,
  showTitle: true,
  title: "Data",
  allowInput: true,
});

const config = {
  dateFormat: "d/m/Y H:i",
  locale: Portuguese,
  defaultDate: props.initialValue,
  allowInput: props.allowInput,
  enableTime: true,
};
</script>

<template>
  <BaseInput
    :name="name"
    :horizontal="horizontal"
    :showTitle="showTitle"
    :title="title"
    :initial-value="initialValue"
    iconClass="fa-regular fa-calendar-days"
  >
    <template #field="{ value, handlers, errorMessage }">
      <flat-pickr
        class="input"
        type="date"
        :placeholder="title"
        :class="{ 'is-danger': errorMessage }"
        :model-value="value"
        :config="config"
        v-on="handlers"
      />
    </template>
  </BaseInput>
</template>
