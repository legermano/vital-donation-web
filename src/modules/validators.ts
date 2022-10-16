export default function useValidators() {
  const validateCPF = (cpf: string): boolean => {
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

  const validatePassword = (pass: string): boolean => {
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
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    if (!regex.test(pass)) {
      return false;
    }

    return true;
  };

  const validateCellphone = (cellphone: string): boolean => {
    // Remove non-numeric characters
    cellphone = cellphone.replace(/[^\d]+/g, "");

    const regex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
    if (!regex.test(cellphone)) {
      return false;
    }

    return true;
  };

  return { validateCPF, validatePassword, validateCellphone };
}
