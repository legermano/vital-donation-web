<script setup lang="ts">
import { UserEditForm } from "@/components/forms";
import type { IUser } from "@/interfaces";
import type { PropType } from "vue";

defineProps({
  donor: {
    type: Object as PropType<IUser>,
    required: true,
  },
});

defineEmits(["previousStepDonation", "nextStepDonation"]);
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title has-text-centered">Dados do(a) doador(a)</h3>
      <UserEditForm :user="donor" @user-updated="$emit('nextStepDonation')">
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
      </UserEditForm>
    </div>
  </div>
</template>
