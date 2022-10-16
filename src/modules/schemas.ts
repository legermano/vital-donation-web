import yup from "./yup";

export default function useSchemas() {
  const name = yup.string().required().min(4);
  const email = yup.string().required().email();
  const cpf = yup.string().required().cpf();
  const password = yup.string().required().password();
  const requiredString = yup.string().required();
  const phone = yup.string().cellphone();
  const birthDate = yup
    .date()
    .format("DD/MM/YYYY")
    .min(new Date(1900, 0, 1))
    .max(new Date())
    .nullable()
    .default(null);

  return {
    name,
    email,
    cpf,
    password,
    requiredString,
    phone,
    birthDate,
  };
}
