<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef, computed } from "vue";
import { InteractionModes } from "@/modules";
// Needs to import directly from the file,because namespace is not supported by vite-plugin-vue-type-imports
import type { IBaseInput } from "@/interfaces/IBaseInput";
import { InteractionMode } from "@/types";

defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<IBaseInput>(), {
  horizontal: false,
  showTitle: true,
  title: "Input",
  isExpanded: true,
  isNarrow: false,
  type: "text",
  mask: "",
  mode: InteractionMode.LAZY,
});

const { meta, value, errorMessage, handleChange, handleBlur } = useField(
  toRef(props, "name"),
  undefined,
  {
    validateOnValueUpdate: false,
    initialValue: props.initialValue,
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
</script>

<template>
  <div
    class="field"
    :class="{ 'is-horizontal': horizontal, 'is-narrow': isNarrow }"
  >
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
            'is-expanded': isExpanded,
          }"
        >
          <slot
            name="field"
            :value="value"
            :handlers="handlers"
            :errorMessage="errorMessage"
          >
            <input
              class="input"
              :type="type"
              :placeholder="title"
              :class="{ 'is-danger': errorMessage }"
              :value="value"
              v-mask="mask"
              @input="
                $emit(
                  'update:modelValue',
                  ($event.target as HTMLTextAreaElement).value
                )
              "
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
