<script setup lang="ts">
import { ref } from "vue";
import { DonationUserSelection } from "@/components";

const SELECT_DONATOR_STEP = 1;
const FILL_PERSONAL_QUESTIONS_STEP = 2;
const FILL_RECURRENT_QUESTIONS_STEP = 3;
const currentStep = ref<number>(1);
</script>
<template>
  <ul class="steps is-narrow is-medium is-centered has-content-centered">
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
  <DonationUserSelection />
</template>
