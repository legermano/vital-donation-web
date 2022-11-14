import type IQuestion from "./IQuestion";

export default interface IForm {
  id: string;
  questions: Array<IQuestion>;
}
