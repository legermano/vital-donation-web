<script setup lang="ts">
import { storeToRefs } from "pinia";
import { LoaderSpinner } from "@/components";
import { UserQuestionsForm } from "@/components/forms";
import { useFormStore } from "@/stores";
import type { IUser } from "@/interfaces";
import type { PropType } from "vue";

defineProps({
  donor: {
    type: Object as PropType<IUser>,
    required: true,
  },
});

defineEmits(["previousStepDonation", "nextStepDonation"]);

const formStore = useFormStore();
const { donationRecurrentForm } = storeToRefs(formStore);

await formStore.getAllForms();
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title has-text-centered">Perguntas recorrentes</h3>
      <Suspense>
        <UserQuestionsForm
          v-if="donationRecurrentForm != null"
          :user="donor"
          :form="donationRecurrentForm"
          @completed-form-updated="$emit('nextStepDonation')"
        >
          <template #buttons>
            <hr class="hr" />
            <div class="buttons is-right">
              <button
                class="button is-danger is-light"
                @click.prevent="$emit('previousStepDonation')"
              >
                Retornar
              </button>
              <button class="button is-danger">Avançar</button>
            </div>
          </template>
        </UserQuestionsForm>
        <template #fallback> <LoaderSpinner /> </template>
      </Suspense>
    </div>
  </div>
</template>
