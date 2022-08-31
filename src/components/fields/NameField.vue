<script setup>
import { ref } from "vue";
import useFormValidation from "../../modules/formValidation";

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

const { errors, validateNameField } = useFormValidation();
const input = ref(null);
const validateInput = () => {
  validateNameField("nome", input.value);
};

defineExpose({
  validateInput,
});
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
      </div>
    </div>
  </div>
</template>
