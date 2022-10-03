export default function useValidators() {
  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? `O campo ${fieldName} é obrigatório` : "";
  };

  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min
      ? `O campo ${fieldName} precisa ter pelo menos ${min} caracteres`
      : "";
  };

  const isEmail = (fieldName, fieldValue) => {
    let regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !regex.test(fieldValue) ? `O ${fieldName} digitado é inválido` : "";
  };

  const isCPF = (fieldName, fieldValue) => {
    return !validateCPF(fieldValue) ? `O ${fieldName} digitado é inválido` : "";
  };

  const isPassword = (fieldName, fieldValue) => {
    return !validatePassword(fieldValue)
      ? `A ${fieldName} deve ter pelo menos 10 caracteres contendo pelo menos 1 letra maiúscula, 1 minúscula, 1 número e um simbolo especial (!@#$%^&*)`
      : "";
  };

  const validateCPF = (cpf) => {
    let add = 0;
    let rev = 0;
    // Remove non-numeric characters
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf == "") {
      return false;
    }

    // Eliminate know false values
    if (
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      return false;
    }

    // Validate the first digit
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }

    rev = 11 - (add % 11);

    if (rev == 10 || rev == 1) {
      rev = 0;
    }

    if (rev != parseInt(cpf.charAt(9))) {
      return false;
    }

    // Validate the second digit
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }

    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) {
      rev = 0;
    }

    if (rev != parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  };

  const validatePassword = (pass) => {
    // Validate minimun length
    if (pass.length < 10) {
      return false;
    }

    /**
     * Validate if the passoword contains atleast :
     * - 1 lowercase character
     * - 1 uppercase character
     * - 1 number
     * - 1 special character
     */
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    if (!regex.test(pass)) {
      return false;
    }
  };

  return { isEmpty, minLength, isEmail, isCPF, isPassword };
}
