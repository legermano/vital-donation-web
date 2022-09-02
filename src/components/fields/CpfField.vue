<script setup>
import { ref } from "vue";
import useFormValidation from "../../modules/formValidation";
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
    default: "CPF",
  },
});

const { errors, validateCPFField } = useFormValidation();
const input = ref(null);
const validateInput = () => validateCPFField("cpf", input.value);
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
      :class="{ 'has-icons-right': errors.cpf }"
    >
      <input
        class="input"
        type="text"
        :placeholder="title"
        :class="{ 'is-danger': errors.cpf }"
        v-model="input"
        v-mask="'###.###.###-##'"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span class="icon is-small is-left">
        <i class="fas fa-id-card"></i>
      </span>
      <span v-if="errors.cpf" class="icon is-small is-right">
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    </div>
    <p v-if="errors.cpf" class="help is-danger">{{ errors.cpf }}</p>
  </BaseField>
</template>
