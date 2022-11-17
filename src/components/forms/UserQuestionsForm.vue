<script setup lang="ts">
import { QuestionCheckRadio } from "@/components/fields";
import { router } from "@/router";
import { useFormStore } from "@/stores";
import { useForm } from "vee-validate";

const questions = useFormStore().getUserFormQuestions();

const { handleSubmit } = useForm();

const onSubmit = handleSubmit((data) => {
  console.log(data);
});
</script>
<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title has-text-centered">Peguntas pessoais</h3>
      <hr class="hr" />
      <form
        class="columns is-flex is-flex-direction-column box"
        @submit="onSubmit"
      >
        <div class="level questions">
          <div
            v-for="question in questions"
            :key="question.id"
            class="level-item"
          >
            <QuestionCheckRadio
              :name="question.id"
              :title="question.question"
              :question="question"
            />
          </div>
        </div>
        <hr class="hr" />
        <div class="buttons">
          <button class="button is-danger">Salvar</button>
          <button class="button is-danger is-light" @click="router.back()">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "bulma/sass/utilities/mixins.sass";

.questions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: flex-end;

  .level-item {
    justify-content: flex-start;
    margin-bottom: 1rem;
    padding-right: 1rem;
  }

  @include touch {
    display: block;
  }
}
</style>
