<script setup lang="ts">
import { DonationListTable } from "@/components";
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title has-text-centered">Doações</h3>
      <hr class="hr" />
      <div class="buttons">
        <RouterLink class="button is-danger" to="/donation/new">
          Nova doação
        </RouterLink>
      </div>
      <hr class="hr" />
      <DonationListTable />
    </div>
  </div>
</template>
