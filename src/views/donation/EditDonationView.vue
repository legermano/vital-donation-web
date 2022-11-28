<script setup lang="ts">
import { useDonationStore } from "@/stores";
import { DonationEditForm } from "@/components/forms";
import type { IDonation } from "@/interfaces";
import { ref } from "vue";

const props = defineProps({
  donationId: {
    type: String,
    required: true,
  },
});

let donation = ref<IDonation | null>(null);

useDonationStore()
  .getDonation(props.donationId)
  .then((response) => {
    if (response) {
      donation.value = response;
    }
  });
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title-has-text-centered">Editar dados da doação</h3>
      <hr class="hr" />
      <DonationEditForm v-if="donation" :donation="donation" />
    </div>
  </div>
</template>
