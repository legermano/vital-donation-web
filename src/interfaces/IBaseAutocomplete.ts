import type { IBaseInput, IBaseAutocompleteItem } from "@/interfaces";

export interface IBaseAutocomplete extends IBaseInput {
  options: IBaseAutocompleteItem[];
  defaultOption?: IBaseAutocompleteItem;
}
