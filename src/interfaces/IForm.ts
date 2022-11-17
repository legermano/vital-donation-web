import type IQuestion from "./IQuestion";

export default interface IForm {
  id: string;
  name: string;
  questions?: Array<IQuestion>;
}
