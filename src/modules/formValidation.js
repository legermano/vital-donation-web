import { reactive } from "vue";
import useValidators from "./validators";

const errors = reactive({});

export default function useFormValidation() {
  const { isEmpty, isEmail, minLength, isCPF, isPassword } = useValidators();

  const validateRequiredField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : "";
  };

  const validateNameField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 4);
  };

  const validateEmailField = (fieldName, fieldValue) => {
    errors[fieldName] = fieldValue ? isEmail(fieldName, fieldValue) : "";
  };

  const validateCPFField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName.toUpperCase(), fieldValue)
      : isCPF(fieldName.toUpperCase(), fieldValue);
  };

  const validatePasswordField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isPassword(fieldName, fieldValue);
  };

  return {
    errors,
    validateNameField,
    validateEmailField,
    validateCPFField,
    validateRequiredField,
    validatePasswordField,
  };
}
