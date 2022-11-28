import { Constants } from "@/types";
import moment from "moment";
import * as yup from "yup";
import type { AnyObject, Maybe } from "yup/lib/types";
import { useValidators } from "@/modules";

const {
  validateCPF,
  validatePassword,
  validatePhone,
  validateBloodType,
  validateDonationStatus,
} = useValidators();

const formatDate = (date: string | Date, format: string) => {
  return moment(date).format(format);
};

yup.setLocale({
  mixed: {
    default: "${path} é inválido",
    required: "O campo ${path} é obrigatório",
  },
  string: {
    min: "O campo ${path} precisar ter pelo menos ${min} caracteres",
    max: "O campo ${path} deve ter no máximo ${max} caracteres",
    email: "Email inválido",
  },
  date: {
    min: ({ min, path }) => {
      const formattedDate = formatDate(min, Constants.frontendDateFormat);
      return `${path} deve ser depois de ${formattedDate}`;
    },
    max: ({ max, path }) => {
      const formattedDate = formatDate(max, Constants.frontendDateFormat);
      return `${path} deve ser antes de ${formattedDate}`;
    },
  },
});

yup.addMethod<yup.StringSchema>(yup.string, "cpf", function (message?: string) {
  const msg = message ?? "CPF inválido";
  return this.test("cpf", msg, function (cpf) {
    if (cpf == undefined) {
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
      if (password == undefined) {
        return true;
      }

      return validatePassword(password);
    });
  }
);

yup.addMethod<yup.StringSchema>(
  yup.string,
  "phone",
  function (message?: string) {
    const msg = message ?? "Número de telefone inválido";
    return this.test("phone", msg, function (phone) {
      if (phone == undefined) {
        return true;
      }

      return validatePhone(phone);
    });
  }
);

yup.addMethod<yup.StringSchema>(
  yup.string,
  "bloodtype",
  function (message?: string) {
    const msg = message ?? "Tipo sanguíneo inválido";
    return this.test("bloodtype", msg, function (bloodtype) {
      if (
        bloodtype == undefined ||
        bloodtype == Constants.bloodTypeDefaultOption
      ) {
        return true;
      }

      return validateBloodType(bloodtype);
    });
  }
);

yup.addMethod<yup.StringSchema>(
  yup.string,
  "donationstatus",
  function (message?: string) {
    const msg = message ?? "Status da doação inválido";
    return this.test("donationstatus", msg, function (donationStatus) {
      if (donationStatus == undefined) {
        return false;
      }

      return validateDonationStatus(donationStatus);
    });
  }
);

yup.addMethod<yup.DateSchema>(
  yup.date,
  "format",
  function (formats: string, parseStrict: boolean = true) {
    return this.transform((value, originalValue, ctx) => {
      if (value == undefined) return null;

      if (ctx.isType(value)) return value;

      value = moment(originalValue, formats, parseStrict);

      return value.isValid() ? value.toDate() : new Date("");
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
    phone(message?: string): StringSchema<TType, TContext>;
    bloodtype(message?: string): StringSchema<TType, TContext>;
    donationstatus(message?: string): StringSchema<TType, TContext>;
  }

  interface DateSchema<
    TType extends Maybe<Date> = Date | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    format(formats: string, parseStrict?: boolean): DateSchema<TType, TContext>;
  }
}

export default yup;
