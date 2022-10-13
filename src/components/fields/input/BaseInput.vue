<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef, computed, ref } from "vue";
import { InteractionModes } from "@/modules";
// Needs to import directly from the file,because namespace is not supported by vite-plugin-vue-type-imports
import type { IBaseInput } from "@/interfaces/IBaseInput";
import { InteractionMode } from "@/types";

const props = withDefaults(defineProps<IBaseInput>(), {
  horizontal: false,
  showTitle: true,
  title: "Input",
  type: "text",
  mask: "",
  mode: InteractionMode.LAZY,
  initialValue: "",
});

const { meta, value, errorMessage, handleChange, handleBlur } = useField(
  toRef(props, "name"),
  undefined,
  {
    validateOnValueUpdate: false,
  }
);

const handlers = computed(() => {
  const on: Record<string, any> = {
    blur: handleBlur,
    // Default input event to sync the value 'false' here prevents validation
    input: [(e: unknown) => handleChange(e, false)],
  };

  const triggers: string[] = InteractionModes[props.mode]({
    errorMessage,
    meta,
  });

  triggers.forEach((t) => {
    if (Array.isArray(on[t])) {
      on[t].push(handleChange);
    } else {
      on[t] = handleChange;
    }
  });

  return on;
});

value.value = ref(props.initialValue).value;
</script>

<template>
  <div class="field" :class="{ 'is-horizontal': horizontal }">
    <div
      v-if="showTitle"
      class="mb-1"
      :class="{ 'field-label': horizontal, 'is-normal': horizontal }"
    >
      <label class="label">{{ title }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div
          class="control"
          :class="{
            'has-icons-left': iconClass,
            'has-icons-right': errorMessage,
          }"
        >
          <slot
            :value="value"
            :handlers="handlers"
            :errorMessage="errorMessage"
          >
            <input
              class="input"
              :type="type"
              :placeholder="title"
              :class="{ 'is-danger': errorMessage }"
              v-mask="mask"
              v-model="value"
              v-on="handlers"
            />
          </slot>
          <span v-if="iconClass" class="icon is-small is-left">
            <i :class="iconClass"></i>
          </span>
          <span v-if="errorMessage" class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p v-if="errorMessage" class="help is-danger">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>
