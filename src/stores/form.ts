import type { IForm } from "@/interfaces";
import { axios } from "@/modules";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useFormStore = defineStore("form", () => {
  const forms = ref<Array<IForm>>();

  const userInfoForm = computed(() => forms.value?.[0]);

  const getAllForms = async (): Promise<void> => {
    axios.get("/forms").then(({ data }) => {
      forms.value = data;
    });
  };

  return {
    forms,
    userInfoForm,
    getAllForms,
  };
});
