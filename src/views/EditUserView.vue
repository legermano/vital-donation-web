<script setup lang="ts">
import { UserEditForm, UserQuestionsForm } from "@/components/forms";
import { ref } from "vue";
import { useUserStore, useFormStore } from "@/stores";
import { storeToRefs } from "pinia";

// Load user data
const userStore = useUserStore();
const formStore = useFormStore();
userStore.getUserInfo();
formStore.getAllForms();

const { user } = storeToRefs(userStore);

const PERSONAL_DATA_STEP = 1;
const PERSONAL_QUESTIONS_STEP = 2;
const step = ref<Number>(PERSONAL_DATA_STEP);

const setPersonalDataStep = () => (step.value = PERSONAL_DATA_STEP);
const setPersonalQuestionsStep = () => (step.value = PERSONAL_QUESTIONS_STEP);
</script>

<template>
  <nav class="pagination is-centered" role="navigation" aria-label="form steps">
    <ul class="pagination-list">
      <li>
        <a
          class="pagination-link"
          :class="{
            'is-current': step == PERSONAL_DATA_STEP,
          }"
          @click="setPersonalDataStep"
        >
          Dados pessoais
        </a>
      </li>
      <li>
        <a
          class="pagination-link"
          :class="{
            'is-current': step == PERSONAL_QUESTIONS_STEP,
          }"
          @click="setPersonalQuestionsStep"
        >
          Perguntas pessoais
        </a>
      </li>
    </ul>
  </nav>
  <div class="hero-body" v-if="step == PERSONAL_DATA_STEP">
    <div class="container">
      <h3 class="title has-text-centered">Dados pessoais</h3>
      <hr class="hr" />
      <UserEditForm v-if="user != null" :user="user" class="box" />
    </div>
  </div>
  <div class="hero-body" v-if="step == PERSONAL_QUESTIONS_STEP">
    <div class="container">
      <h3 class="title has-text-centered">Peguntas pessoais</h3>
      <hr class="hr" />
      <UserQuestionsForm class="box" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "bulma/sass/utilities/initial-variables.sass";
$pagination-current-background-color: $red !default;
$pagination-current-border-color: $red !default;

@import "bulma/bulma.sass";

.pagination {
  padding: 3rem 0 0 0;
}
</style>
