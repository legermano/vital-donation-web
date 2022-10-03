<script setup lang="ts">
import { reactive } from "vue";
import { NameField, EmailField, CpfField } from "@/components/fields";
import { router } from "@/router";

// const user = reactive({
//   name: ,
//   email: ,
//   cpf :,

// })
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title has-text-centered">Editar dados</h3>
      <hr class="hr" />
      <form
        @submit.prevent
        class="columns is-flex is-flex-direction-column box"
      >
        <NameField />
        <EmailField />
        <CpfField />
        <hr class="hr" />
        <div class="buttons">
          <button class="button is-danger">Salvar</button>
          <button class="button is-danger is-light" @click="router.back()">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
