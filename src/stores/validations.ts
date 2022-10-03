import { defineStore } from "pinia";
import { useValidators } from "@/modules";

const { isEmpty, isEmail, minLength, isCPF, isPassword } = useValidators();

export const useFormValidationStore = defineStore({
  id: "formValidation",
  state: () => ({
    errors: {},
  }),
  getters: {
    hasErrors: (state) => {
      let hasErrors = false;
      for (let field in state.errors) {
        if (state.errors[field].length > 0) {
          hasErrors = true;
          break;
        }
      }

      return hasErrors;
    },
  },
  actions: {
    validateRequiredField(fieldName, fieldValue) {
      this.errors[fieldName] = !fieldValue
        ? isEmpty(fieldName, fieldValue)
        : "";
    },
    validateNameField(fieldName, fieldValue) {
      this.errors[fieldName] = !fieldValue
        ? isEmpty(fieldName, fieldValue)
        : minLength(fieldName, fieldValue, 4);
    },
    validateEmailField(fieldName, fieldValue) {
      this.errors[fieldName] = fieldValue ? isEmail(fieldName, fieldValue) : "";
    },
    validateCPFField(fieldName, fieldValue) {
      this.errors[fieldName] = !fieldValue
        ? isEmpty(fieldName.toUpperCase(), fieldValue)
        : isCPF(fieldName.toUpperCase(), fieldValue);
    },
    validatePasswordField(fieldName, fieldValue) {
      this.errors[fieldName] = !fieldValue
        ? isEmpty(fieldName, fieldValue)
        : isPassword(fieldName, fieldValue);
    },
    clear() {
      this.errors = {};
    },
  },
});
