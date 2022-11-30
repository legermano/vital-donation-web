import { Constants } from "@/types";
import yup from "./yup";

export const useSchemas = () => {
  const name = yup
    .string()
    .required()
    .min(4)
    .max(255)
    .matches(/\w+\s+\w+/, "Preencha o nome completo")
    .label("nome");
  const email = yup.string().email().max(255).required();
  const cpf = yup.string().required().cpf();
  const password = yup.string().required().password().max(255).label("senha");
  const requiredString = yup.string().required();
  const phone = yup.string().phone().nullable();
  const birthDate = yup
    .date()
    .format(Constants.frontendDateFormat)
    .min(new Date(1900, 0, 1))
    .max(new Date())
    .nullable()
    .default(null)
    .label("Data de nascimento")
    .nullable();
  const datetime = yup
    .date()
    .format(Constants.frontendDateTimeFormat)
    .required();
  const bloodType = yup.string().bloodtype().nullable();
  const donationStatus = yup
    .string()
    .donationstatus()
    .label("Status da doação");
  const address = yup
    .string()
    .min(5)
    .max(255)
    .label("endereço")
    .matches(/([a-zA-Z])\w+/, "Endereço inválido")
    .nullable();
  const complement = yup
    .string()
    .min(5)
    .max(255)
    .label("complemento")
    .matches(/([a-zA-Z])\w+/, "Complemento inválido")
    .nullable();
  const weight = yup
    .number()
    .transform((_value, originalValue) =>
      Number(originalValue.replace(/,/, "."))
    )
    .min(0, "O peso mínimo é de 0 Kg")
    .max(200, "O peso máximo é de 200 Kg");
  const height = yup
    .number()
    .transform((_value, originalValue) =>
      Number(originalValue.replace(/,/, "."))
    )
    .min(0, "A altura mínima é de 0 m")
    .max(2.5, "A altura máxima é de 2,5 m");

  return {
    name,
    email,
    cpf,
    password,
    requiredString,
    phone,
    birthDate,
    datetime,
    bloodType,
    donationStatus,
    address,
    complement,
    weight,
    height,
  };
};
