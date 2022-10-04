<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef, computed } from "vue";
import { InteractionModes } from "@/modules";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "Input",
  },
  iconClass: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  mask: {
    type: String,
    default: "",
  },
  mode: {
    type: String,
    default: "lazy",
  },
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
          <input
            class="input"
            :type="type"
            :placeholder="title"
            :class="{ 'is-danger': errorMessage }"
            v-mask="mask"
            v-model="value"
            v-on="handlers"
          />
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
