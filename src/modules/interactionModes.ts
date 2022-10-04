import type { FieldContext } from "vee-validate";

type InteractionEventGetter = (ctx: FieldContext) => string[];

// Validates on submit only
const passive = () => [];

// Validates on submit and blur
const lazy: InteractionEventGetter = () => {
  return ["change"];
};

// Validates on submit, blur and input change
const aggressive: InteractionEventGetter = () => ["input"];

// Validates on submit and blur, but if theres an error also validates on input change
const eager: InteractionEventGetter = ({ errorMessage }) => {
  if (errorMessage.value) {
    return ["input"];
  }

  return ["change"];
};

export const InteractionModes: Record<string, Function> = {
  passive,
  lazy,
  aggressive,
  eager,
};
