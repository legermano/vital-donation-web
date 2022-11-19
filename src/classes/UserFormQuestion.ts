import type { IAnswer, IUserFormQuestion } from "@/interfaces";

export default class UserFormQuestion implements IUserFormQuestion {
  id: string;
  question: string;
  answers: IAnswer[];
  userAnswer?: string | undefined;
  userObservation?: string | undefined;

  constructor(
    id: string,
    question: string,
    answers: IAnswer[],
    userAnswer?: string,
    userObservation?: string
  ) {
    this.id = id;
    this.question = question;
    this.answers = answers;
    this.userAnswer = userAnswer;
    this.userObservation = userObservation;
  }
}
