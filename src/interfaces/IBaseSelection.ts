import type { IBaseInput } from "@/interfaces";

export interface IBaseSelect extends IBaseInput {
  options?: string[];
  useDefaultOption?: boolean;
  defaultOption?: string;
}
