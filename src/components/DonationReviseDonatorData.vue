<script setup lang="ts">
import { UserEditForm } from "@/components/forms";
import type { IUser } from "@/interfaces";
import type { PropType } from "vue";

defineProps({
  donator: {
    type: Object as PropType<IUser>,
    required: true,
  },
});

defineEmits(["previousStepDonation"]);
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <UserEditForm :user="donator">
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
