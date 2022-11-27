import { axios, useToast } from "@/modules";
import { useUserStore } from "@/stores";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type {
  ICompletedForm,
  IForm,
  IUser,
  IUserFormQuestion,
} from "@/interfaces";

export const useFormStore = defineStore("form", () => {
  const { success, warning, error } = useToast();
  const forms = ref<IForm[]>([]);

  const userPersonalQuestionsForm = computed(() =>
    forms.value?.find((f) => f.name == "Formulário básico")
  );

  const donationRecurrentForm = computed(() =>
    forms.value?.find((f) => f.name == "Formulário básico")
  );

  const getAllForms = async (): Promise<void> => {
    await axios.get("/forms").then(({ data }) => {
      forms.value = data;
    });
  };

  /**
   * Takes a user and an form and fill the question with the user answers
   *
   * @param user User to be search to find the answers
   * @param form Form to be search to find the questions
   *
   * @returns Form questions with the user answers
   */
  const getAnswaredFormQuestions = async (
    user: IUser,
    form: IForm
  ): Promise<IUserFormQuestion[]> => {
    const userStore = useUserStore();
    const { getUserCompletedForms } = userStore;

    const questions: Array<IUserFormQuestion> = [];
    let completedForm: ICompletedForm | null | undefined = null;

    const userCompletedForms = await getUserCompletedForms(user);

    await getAllForms();

    // Find the completed user form for personal questions
    completedForm = userCompletedForms?.find((f) => f.form.id == form.id);

    form.questions?.forEach((question) => {
      const formQuestion: IUserFormQuestion = {
        id: question.id,
        question: question.question,
        answers: question.answers,
      };

      const completedQuestion = completedForm?.completedQuestions.find(
        (c) => c.question.id == question.id
      );

      if (completedQuestion) {
        formQuestion.userAnswer = completedQuestion.answer.id;
        formQuestion.userObservation = completedQuestion.observation;
      }

      questions.push(formQuestion);
    });

    return questions;
  };

  const saveCompledForm = async (
    answers: Record<string, string>,
    user: IUser,
    form: IForm
  ): Promise<void> => {
    const userStore = useUserStore();
    const { getUserCompletedForms } = userStore;

    const userCompletedForms = await getUserCompletedForms(user);

    // Get the id from all the answerd questions
    const answerdQuestionsId = (Object.keys(answers) as Array<string>).filter(
      (k) => !k.includes("_observation") && answers[k] != undefined
    );

    if (answerdQuestionsId.length <= 0) {
      warning("Nenhum pergunta foi respondida!");
      return;
    }

    // Verify if the user already has a completed form
    let completedForm: ICompletedForm | undefined = userCompletedForms.find(
      (f) => f.form.id == form.id
    );

    // Register the completed form for the user if it does not exits yet
    if (completedForm == undefined) {
      await axios
        .post("/forms/completed/forms", {
          formId: form.id,
          userId: user.id,
        })
        .then(({ data }) => (completedForm = data));
    }

    if (completedForm == undefined) {
      error("Ocorreu um erro ao tentar salvar as perguntas");
      return;
    }

    const questionsCall = answerdQuestionsId.flatMap(async (key) => {
      // Get already answered question
      const completedQuestion = completedForm?.completedQuestions.find(
        (q) => q.question.id == key
      );

      // If question is not answerd yet
      if (completedQuestion == undefined) {
        return axios
          .post("/forms/completed/questions", {
            completedFormId: completedForm?.id,
            questionId: key,
            answerId: answers[key],
            observation: answers[`${key}_observation`],
          })
          .catch(() => {
            error(`Ocorreu um erro ao tentar gravar a pergunta ${key}`);
          });
      }

      if (
        completedQuestion.answer.id != answers[key] ||
        completedQuestion.observation != answers[`${key}_observation`]
      ) {
        return axios
          .put(`/forms/completed/questions/${completedQuestion.id}`, {
            id: completedQuestion.id,
            completedFormId: completedForm?.id,
            questionId: key,
            answerId: answers[key],
            observation: answers[`${key}_observation`],
          })
          .catch(() => {
            error(`Ocorreu um erro ao tentar atualizar a pergunta ${key}`);
          });
      }
    });

    Promise.all(questionsCall).then(() => {
      success("As perguntas foram atualizadas com sucesso");
    });
  };

  return {
    forms,
    userPersonalQuestionsForm,
    donationRecurrentForm,
    getAllForms,
    getAnswaredFormQuestions,
    saveCompledForm,
  };
});
