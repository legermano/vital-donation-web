<script setup lang="ts">
import { QuestionCheckRadio } from "@/components/fields";
import type { IForm, IUser } from "@/interfaces";
import { router } from "@/router";
import { useFormStore } from "@/stores";
import { useForm } from "vee-validate";
import type { PropType } from "vue";

const props = defineProps({
  user: {
    type: Object as PropType<IUser>,
    required: true,
  },
  form: {
    type: Object as PropType<IForm>,
    required: true,
  },
});

const emit = defineEmits(["completedFormUpdated"]);

const formStore = useFormStore();
const { saveCompledForm, getAnswaredFormQuestions } = formStore;

const questions = await getAnswaredFormQuestions(props.user, props.form);

const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async (data: Record<string, string>) => {
  await saveCompledForm(data, props.user, props.form);
  emit("completedFormUpdated");
});
</script>

<template>
  <form class="columns is-flex is-flex-direction-column" @submit="onSubmit">
    <div class="level questions">
      <div v-for="question in questions" :key="question.id" class="level-item">
        <QuestionCheckRadio
          :name="question.id"
          :title="question.question"
          :question="question"
        />
      </div>
    </div>
    <slot name="buttons">
      <hr class="hr" />
      <div class="buttons">
        <button class="button is-danger">Salvar</button>
        <button
          class="button is-danger is-light"
          @click.prevent="router.back()"
        >
          Cancelar
        </button>
      </div>
    </slot>
  </form>
</template>

<style scoped lang="scss">
.questions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-end;

  .level-item {
    justify-content: flex-start;
    margin-bottom: 1.5rem;
    padding-right: 1rem;
  }

  @include touch {
    display: block;
  }
}
</style>
