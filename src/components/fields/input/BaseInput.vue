<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef } from "vue";

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
});

const { value, errorMessage } = useField(toRef(props, "name"), undefined);
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
