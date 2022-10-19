import { Constants } from "@/types";
import yup from "./yup";

export default function useSchemas() {
  const name = yup.string().required().min(4).max(255).label("nome");
  const email = yup.string().required().email().max(255);
  const cpf = yup.string().required().cpf();
  const password = yup.string().required().password().max(255).label("senha");
  const requiredString = yup.string().required();
  const phone = yup.string().phone();
  const birthDate = yup
    .date()
    .format(Constants.frontendDateFormat)
    .min(new Date(1900, 0, 1))
    .max(new Date())
    .nullable()
    .default(null)
    .label("Data de nascimento");
  const bloodType = yup.string().bloodtype();
  const address = yup.string().max(255).label("endereço");
  const complement = yup.string().max(255).label("complemento");

  return {
    name,
    email,
    cpf,
    password,
    requiredString,
    phone,
    birthDate,
    bloodType,
    address,
    complement,
  };
}
