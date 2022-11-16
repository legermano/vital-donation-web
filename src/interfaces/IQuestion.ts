import type IAnswer from "./IAnswer";

export default interface IQuestion {
  id: string;
  question: string;
  answers?: Array<IAnswer>;
}
