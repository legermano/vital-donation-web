import { BloodType, DonationStatus } from "@/types";

export const useValidators = () => {
  const validateCPF = (cpf: string): boolean => {
    if (typeof cpf !== "string") {
      return false;
    }

    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      return false;
    }

    if (
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

    const values = cpf.split("").map((el) => +el);
    const rest = (count: number) =>
      ((values
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10;

    return rest(10) === values[9] && rest(11) === values[10];
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

  const validatePhone = (cellphone: string): boolean => {
    // Remove non-numeric characters
    cellphone = cellphone.replace(/[^\d]+/g, "");

    const regex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
    if (!regex.test(cellphone)) {
      return false;
    }

    return true;
  };

  const validateBloodType = (bloodType: string): boolean => {
    return bloodType in BloodType;
  };

  const validateDonationStatus = (donationStatus: string): boolean => {
    const values: string[] = Object.values(DonationStatus);
    return values.includes(donationStatus);
  };

  return {
    validateCPF,
    validatePassword,
    validatePhone,
    validateBloodType,
    validateDonationStatus,
  };
};
