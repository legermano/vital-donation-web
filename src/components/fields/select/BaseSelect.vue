<script setup lang="ts">
import { ref } from "vue";
import { BaseInput } from "@/components/fields";
// Needs to import directly from the file,because namespace is not supported by vite-plugin-vue-type-imports
import type { IBaseSelect } from "@/interfaces/IBaseSelection";

const props = withDefaults(defineProps<IBaseSelect>(), {
  horizontal: false,
  showTitle: true,
  title: "Selecione",
  useDefaultOption: true,
  defaultOption: "Selecione uma opção",
  isExpanded: true,
});

let selectOptions = ref(props.options);
let defaultValue = ref(props.initialValue);

if (
  props.useDefaultOption &&
  props.defaultOption != undefined &&
  selectOptions.value != undefined
) {
  selectOptions.value = [props.defaultOption, ...selectOptions.value];
  defaultValue.value = defaultValue.value ?? props.defaultOption;
}
</script>

<template>
  <BaseInput
    :name="name"
    :horizontal="horizontal"
    :show-title="showTitle"
    :title="title"
    :initial-value="defaultValue"
    :icon-class="iconClass"
  >
    <template #field="{ value, handlers }">
      <div
        class="select is-normal"
        :class="{
          'is-fullwidth': isExpanded,
        }"
      >
        <select :value="value" v-on="handlers">
          <option
            v-for="(option, index) in selectOptions"
            :key="index"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </template>
  </BaseInput>
</template>
