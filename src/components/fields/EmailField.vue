<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useFormValidationStore } from "@/stores";
import BaseField from "./BaseField.vue";

defineProps({
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
    default: "Email",
  },
});
const { validateEmailField } = useFormValidationStore();
const { errors } = storeToRefs(useFormValidationStore());
const input = ref(null);
const validateInput = () => validateEmailField("email", input.value);
</script>

<template>
  <BaseField
    :horizontal="horizontal"
    :show-title="showTitle"
    :title="title"
    :validate-function="validateInput"
  >
    <div
      class="control has-icons-left"
      :class="{ 'has-icons-right': errors.email }"
    >
      <input
        class="input"
        type="email"
        :placeholder="title"
        :class="{ 'is-danger': errors.email }"
        v-model="input"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span class="icon is-small is-left">
        <i class="fas fa-envelope"></i>
      </span>
      <span v-if="errors.email" class="icon is-small is-right">
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    </div>
    <p v-if="errors.email" class="help is-danger">{{ errors.email }}</p>
  </BaseField>
</template>
