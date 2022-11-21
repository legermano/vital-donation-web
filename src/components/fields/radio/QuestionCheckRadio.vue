<script setup lang="ts">
import { BaseInput } from "@/components/fields";
import type { IBaseQuestionRadio } from "@/interfaces";
import { Field } from "vee-validate";

withDefaults(defineProps<IBaseQuestionRadio>(), {
  horizontal: false,
  showTitle: true,
  title: "Question",
  useFieldType: "radio",
});
</script>
<template>
  <BaseInput
    :name="name"
    :horizontal="horizontal"
    :showTitle="showTitle"
    :title="title"
    :initial-value="initialValue"
    class="is-flex-grow-1"
  >
    <template #field>
      <div class="field is-flex options">
        <div class="is-flex">
          <template v-for="answer in question?.answers" :key="answer.id">
            <Field
              class="is-checkradio is-danger"
              type="radio"
              :name="name"
              :id="answer.id"
              :value="answer.id"
              v-model="question.userAnswer"
            />
            <label :for="answer.id">{{ answer.answer }}</label>
          </template>
        </div>
        <div
          class="is-flex is-align-items-center is-flex-grow-1 pl-2 observation"
        >
          <label class="mr-1" :for="`${name}_observation`">
            <strong>Obs: </strong>
          </label>
          <Field
            class="input"
            type="text"
            :name="`${name}_observation`"
            :value="question.userObservation"
          />
        </div>
      </div>
    </template>
  </BaseInput>
</template>

<style scoped lang="scss">
@include until(576px) {
  .options {
    flex-direction: column;

    .observation {
      padding-left: 0 !important;
    }
  }
}
</style>
