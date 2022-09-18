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
    default: "Nome",
  },
});
const { validateNameField } = useFormValidationStore();
const { errors } = storeToRefs(useFormValidationStore());
const input = ref(null);
const validateInput = () => validateNameField("nome", input.value);
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
      :class="{ 'has-icons-right': errors.nome }"
    >
      <input
        class="input"
        type="text"
        :placeholder="title"
        :class="{ 'is-danger': errors.nome }"
        v-model="input"
        @blur="validateInput"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <span class="icon is-small is-left">
        <i class="fas fa-user"></i>
      </span>
      <span v-if="errors.nome" class="icon is-small is-right">
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    </div>
    <p v-if="errors.nome" class="help is-danger">{{ errors.nome }}</p>
  </BaseField>
</template>
