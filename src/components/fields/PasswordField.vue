<script setup>
import { ref } from "vue";
import useFormValidation from "../../modules/formValidation";
import BaseField from "./BaseField.vue";

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
    default: "Senha",
  },
  validateValue: {
    type: Boolean,
    default: true,
  },
});
const { errors, validatePasswordField, validateRequiredField } =
  useFormValidation();
const input = ref(null);
const validateInput = () => {
  if (props.validateValue) {
    validatePasswordField("senha", input.value);
  } else {
    validateRequiredField("senha", input.value);
  }
};
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
      :class="{ 'has-icons-right': errors.senha }"
    >
      <input
        class="input"
        type="password"
        :placeholder="title"
        :class="{ 'is-danger': errors.senha }"
        v-model="input"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span class="icon is-small is-left">
        <i class="fas fa-lock"></i>
      </span>
      <span v-if="errors.senha" class="icon is-small is-right">
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    </div>
    <p v-if="errors.senha" class="help is-danger">{{ errors.senha }}</p>
  </BaseField>
</template>
