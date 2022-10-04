import * as yup from "yup";
import type { AnyObject, Maybe } from "yup/lib/types";
import useValidators from "./validators";

const { validateCPF, validatePassword } = useValidators();

yup.setLocale({
  mixed: {
    default: "${path} é inválido",
    required: "O campo ${path} é obrigatório",
  },
  string: {
    min: "O campo ${path} precisar ter pelo menos ${min} caracteres",
    email: "Email inválido",
  },
});

yup.addMethod<yup.StringSchema>(yup.string, "cpf", function (message?: string) {
  const msg = message ?? "CPF inválido";
  return this.test("cpf", msg, function (cpf) {
    if (cpf === undefined) {
      return true;
    }

    return validateCPF(cpf);
  });
});

yup.addMethod<yup.StringSchema>(
  yup.string,
  "password",
  function (message?: string) {
    const msg =
      message ??
      "A senha deve ter pelo menos 10 caracteres contendo pelo menos 1 letra maiúscula, 1 minúscula, 1 número e um simbolo especial (!@#$%^&*)";
    return this.test("password", msg, function (password) {
      if (password === undefined) {
        return true;
      }

      return validatePassword(password);
    });
  }
);

declare module "yup" {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    cpf(message?: string): StringSchema<TType, TContext>;
    password(message?: string): StringSchema<TType, TContext>;
  }
}

export default yup;
