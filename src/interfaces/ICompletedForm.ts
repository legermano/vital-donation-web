import type ICompletedQuestion from "./ICompletedQuestion";

export default interface ICompletedForm {
  id: string;
  form: {
    id: string;
  };
  user: {
    id: string;
    name: string;
  };
  completedQuestions: Array<ICompletedQuestion>;
}
