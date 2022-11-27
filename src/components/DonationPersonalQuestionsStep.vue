<script setup lang="ts">
import { UserQuestionsForm } from "@/components/forms";
import { LoaderSpinner } from "@/components";
import { useFormStore } from "@/stores";
import type { IUser } from "@/interfaces";
import type { PropType } from "vue";
import { storeToRefs } from "pinia";

defineProps({
  donor: {
    type: Object as PropType<IUser>,
    required: true,
  },
});

defineEmits(["previousStepDonation", "nextStepDonation"]);

const formStore = useFormStore();
const { userPersonalQuestionsForm } = storeToRefs(formStore);

await formStore.getAllForms();
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title has-text-centered">Perguntas pessoais</h3>
      <Suspense>
        <UserQuestionsForm
          v-if="userPersonalQuestionsForm != null"
          :user="donor"
          :form="userPersonalQuestionsForm"
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
