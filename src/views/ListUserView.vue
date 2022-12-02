<script setup lang="ts">
import { UserListTable } from "@/components";
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title has-text-centered">Usuários</h3>
      <!-- <hr class="hr" />
      <div class="buttons">
        <RouterLink class="button is-danger" to="/donation/new">
          Nova doação
        </RouterLink>
      </div> -->
      <hr class="hr" />
      <UserListTable />
    </div>
  </div>
</template>
