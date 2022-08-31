<script setup>
import { ref, watch } from "vue";
import useEventBus from "../../modules/eventBus";
import useFormValidation from "../../modules/formValidation";

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
    default: "Senha",
  },
  validateValue: {
    type: Boolean,
    default: true,
  },
});

watch(
  () => bus.value.get("validateInput"),
  () => validateInput()
);

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
      </div>
    </div>
  </div>
</template>
