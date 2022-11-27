<script setup lang="ts">
import { useUserStore } from "@/stores";
import { storeToRefs } from "pinia";
import { DonationListTable } from "@/components";

const userStore = useUserStore();

const { user } = storeToRefs(userStore);
</script>
<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title has-text-centered">Suas doações</h3>
      <hr class="hr" />
      <DonationListTable
        v-if="user != null"
        :user="user"
        :enable-edit="false"
        :show-donor="false"
      />
    </div>
  </div>
</template>
