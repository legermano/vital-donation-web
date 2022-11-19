import { axios } from "@/modules";
import { useUserStore, useNotificationStore } from "@/stores";
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import type { ICompletedForm, IForm, IUserFormQuestion } from "@/interfaces";

export const useFormStore = defineStore("form", () => {
  const forms = ref<Array<IForm>>();

  const userPersonalQuestionsForm = computed(() => forms.value?.[0]);

  const getAllForms = async (): Promise<void> => {
    axios.get("/forms").then(({ data }) => {
      forms.value = data;
    });
  };

  const getUserFormQuestions = (): Array<IUserFormQuestion> => {
    const userStore = useUserStore();
    const { completedForms } = userStore;
    const questions: Array<IUserFormQuestion> = [];
    let completedForm: ICompletedForm | null | undefined = null;

    userStore.getUserCompletedForms();
    getAllForms();

    // Find the completed user form for personal questions
    completedForm = completedForms?.find(
      (f) => f.form.id == userPersonalQuestionsForm.value?.id
    );

    userPersonalQuestionsForm.value?.questions?.forEach((question) => {
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

  const setUserPersonalAnswer = async (answers: Record<string, string>) => {
    const userStore = useUserStore();
    const notificationStore = useNotificationStore();

    const { user, completedForms } = storeToRefs(userStore);

    // Get the id from all the answerd questions
    const answerdQuestionsId = (Object.keys(answers) as Array<string>).filter(
      (k) => !k.includes("_observation") && answers[k] != undefined
    );

    if (answerdQuestionsId.length <= 0) {
      notificationStore.warning("Aviso", "Nenhum pergunta foi respondida!");
      return;
    }

    // Verify if the user already has a completed form
    let completedForm: ICompletedForm | undefined = completedForms.value?.find(
      (f) => f.form.id == userPersonalQuestionsForm.value?.id
    );

    // Register the completed form for the user if it does not exits yet
    if (completedForm == undefined) {
      await axios
        .post("/forms/completed/forms", {
          formId: userPersonalQuestionsForm.value?.id,
          userId: user.value?.id,
        })
        .then(({ data }) => (completedForm = data));
    }

    if (completedForm == undefined) {
      notificationStore.error(
        "Erro",
        "Ocorreu um erro ao tentar salvar as perguntas"
      );
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
            notificationStore.error(
              "Erro",
              `Ocorreu um erro ao tentar gravar a pergunta ${key}`
            );
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
            notificationStore.error(
              "Erro",
              `Ocorreu um erro ao tentar atualizar a pergunta ${key}`
            );
          });
      }
    });

    Promise.all(questionsCall).then(() => {
      // Update user completed forms
      userStore.getUserCompletedForms();

      notificationStore.success(
        "Sucesso",
        "As perguntas foram atualizadas com sucesso"
      );
    });
  };

  return {
    forms,
    userPersonalQuestionsForm,
    getAllForms,
    getUserFormQuestions,
    setUserPersonalAnswer,
  };
});
