import { axios } from "@/modules";
import { useUserStore } from "@/stores";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { ICompletedForm, IForm, IUserFormQuestion } from "@/interfaces";

export const useFormStore = defineStore("form", () => {
  const forms = ref<Array<IForm>>();

  const userQuestionForm = computed(() => forms.value?.[0]);

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
      (f) => f.form.id == userQuestionForm.value?.id
    );

    userQuestionForm.value?.questions?.forEach((question) => {
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

  return {
    forms,
    userQuestionForm,
    getAllForms,
    getUserFormQuestions,
  };
});
