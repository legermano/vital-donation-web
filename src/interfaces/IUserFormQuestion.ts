import type IAnswer from "./IAnswer";

export default interface IUserFormQuestion {
  id: string;
  question: string;
  answers: Array<IAnswer>;
  userAnswer?: string;
  userObservation?: string;
}
