<script setup lang="ts">
import { ref } from "vue";
import {
  DonationPersonalQuestionsStep,
  DonationReviseDonorDataStep,
  DonationSelectDonorStep,
  DonationRecurrentQuestionsStep,
  DonationSelectBloodCenterStep,
} from "@/components";
import type { IUser } from "@/interfaces";
import { useUserStore } from "@/stores";

const SELECT_DONOR_STEP = 1;
const REVISE_DONOR_DATA = 2;
const FILL_PERSONAL_QUESTIONS_STEP = 3;
const FILL_RECURRENT_QUESTIONS_STEP = 4;
const SELECT_BLOOD_CENTER = 5;

const userStore = useUserStore();

const currentStep = ref<number>(SELECT_DONOR_STEP);
const donor = ref<IUser | null>(null);

const goToReviseDonorStep = (user: IUser) => {
  donor.value = user;
  currentStep.value = REVISE_DONOR_DATA;
};

const backToReviseDonorStep = async () => {
  if (donor.value != null) {
    donor.value = await userStore.getUser(donor.value.id);
  }
  currentStep.value = REVISE_DONOR_DATA;
};
</script>
<template>
  <ul class="steps is-narrow is-medium is-centered has-content-centered mt-5">
    <li
      class="steps-segment"
      :class="{
        'is-active': currentStep == SELECT_DONOR_STEP,
      }"
    >
      <span class="steps-marker">
        <span class="icon">
          <i class="fa fa-user"></i>
        </span>
      </span>
      <div class="steps-content">
        <p class="heading">Selecione o(a) doador(a)</p>
      </div>
    </li>
    <li
      class="steps-segment"
      :class="{
        'is-active': currentStep == REVISE_DONOR_DATA,
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
    <li
      class="steps-segment"
      :class="{ 'is-active': currentStep == FILL_RECURRENT_QUESTIONS_STEP }"
    >
      <span class="steps-marker">
        <span class="icon">
          <i class="fa-solid fa-clipboard-question"></i>
        </span>
      </span>
      <div class="steps-content">
        <p class="heading">Perguntas recorrentes</p>
      </div>
    </li>
    <li
      class="steps-segment"
      :class="{
        'is-active': currentStep == SELECT_BLOOD_CENTER,
      }"
    >
      <span class="steps-marker">
        <span class="icon">
          <i class="fa-solid fa-hospital"></i>
        </span>
      </span>
      <div class="steps-content">
        <p class="heading">Escolha o hemocentro e o horário</p>
      </div>
    </li>
  </ul>
  <hr class="hr" />
  <DonationSelectDonorStep
    v-if="currentStep == SELECT_DONOR_STEP"
    @next-step-donation="goToReviseDonorStep"
  />
  <DonationReviseDonorDataStep
    v-if="currentStep == REVISE_DONOR_DATA && donor != null"
    :donor="donor"
    @previous-step-donation="currentStep = SELECT_DONOR_STEP"
    @next-step-donation="currentStep = FILL_PERSONAL_QUESTIONS_STEP"
  />
  <DonationPersonalQuestionsStep
    v-if="currentStep == FILL_PERSONAL_QUESTIONS_STEP && donor != null"
    :donor="donor"
    @previous-step-donation="backToReviseDonorStep"
    @next-step-donation="currentStep = FILL_RECURRENT_QUESTIONS_STEP"
  />
  <DonationRecurrentQuestionsStep
    v-if="currentStep == FILL_RECURRENT_QUESTIONS_STEP && donor != null"
    :donor="donor"
    @previous-step-donation="currentStep = FILL_PERSONAL_QUESTIONS_STEP"
    @next-step-donation="currentStep = SELECT_BLOOD_CENTER"
  />
  <DonationSelectBloodCenterStep
    v-if="currentStep == SELECT_BLOOD_CENTER && donor != null"
    :donor="donor"
    @previous-step-donation="currentStep = FILL_RECURRENT_QUESTIONS_STEP"
  />
</template>
