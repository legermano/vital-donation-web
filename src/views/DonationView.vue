<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores";
import { DonationUserSelection } from "@/components";
import type { IUser } from "@/interfaces";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { users } = storeToRefs(userStore);
const currentStep = ref<number>(1);
const donator = ref<IUser | null>(null);

const SELECT_DONATOR_STEP = 1;
const REVISE_DONATOR_DATA = 2;
const FILL_PERSONAL_QUESTIONS_STEP = 3;
const FILL_RECURRENT_QUESTIONS_STEP = 4;

const nextStepSelectDonator = (user: IUser) => {
  donator.value = user;
};
</script>
<template>
  <ul class="steps is-narrow is-medium is-centered has-content-centered mt-5">
    <li
      class="steps-segment"
      :class="{
        'is-active': currentStep == SELECT_DONATOR_STEP,
      }"
    >
      <span class="steps-marker">
        <span class="icon">
          <i class="fa fa-user"></i>
        </span>
      </span>
      <div class="steps-content">
        <p class="heading">Escolha o(a) doador(a)</p>
      </div>
    </li>
    <li
      class="steps-segment"
      :class="{
        'is-active': currentStep == REVISE_DONATOR_DATA,
      }"
    >
      <span class="steps-marker">
        <span class="icon">
          <i class="fa fa-user-pen"></i>
        </span>
      </span>
      <div class="steps-content">
        <p class="heading">Dados do(a) doador(a)</p>
      </div>
    </li>
    <li
      class="steps-segment"
      :class="{
        'is-active': currentStep == FILL_PERSONAL_QUESTIONS_STEP,
      }"
    >
      <span class="steps-marker">
        <span class="icon">
          <i class="fa-solid fa-person-circle-question"></i>
        </span>
      </span>
      <div class="steps-content">
        <p class="heading">Perguntas pessoais</p>
      </div>
    </li>
    <li class="steps-segment">
      <span
        class="steps-marker"
        :class="{
          'is-active': currentStep == FILL_RECURRENT_QUESTIONS_STEP,
        }"
      >
        <span class="icon">
          <i class="fa-solid fa-clipboard-question"></i>
        </span>
      </span>
      <div class="steps-content">
        <p class="heading">Perguntas recorrentes</p>
      </div>
    </li>
  </ul>
  <hr class="hr" />
  <DonationUserSelection
    v-if="currentStep == SELECT_DONATOR_STEP"
    @next-step-select-donator="nextStepSelectDonator"
  />
</template>
