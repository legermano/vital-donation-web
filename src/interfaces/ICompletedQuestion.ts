import type IAnswer from "./IAnswer";
import type IQuestion from "./IQuestion";

export default interface ICompletedQuestion {
  id: string;
  question: IQuestion;
  answer: IAnswer;
  observation: string;
}
