<script setup>
import { watch } from "vue";
import { useEventBus } from "@/modules";

const { bus } = useEventBus();

const props = defineProps({
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
  validateFunction: {
    type: Function,
    default: null,
  },
});

const validateInput = () => {
  if (props.validateFunction != null) {
    props.validateFunction();
  }
};

watch(
  () => bus.value.get("validateInput"),
  () => validateInput()
);
</script>

<template>
  <div class="field" :class="{ 'is-horizontal': horizontal }">
    <div
      v-if="showTitle"
      :class="{ 'field-label': horizontal, 'is-normal': horizontal }"
    >
      <label class="label">{{ title }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
