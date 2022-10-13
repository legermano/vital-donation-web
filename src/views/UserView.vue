<script setup lang="ts">
import {
  NameInput,
  EmailInput,
  CPFInput,
  DatePicker,
} from "@/components/fields";
import { router } from "@/router";
import { useUserStore } from "@/stores";

const { user, formattedBirthDate } = useUserStore();
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
        <NameInput name="name" :initial-value="user?.name" />
        <EmailInput name="email" :initial-value="user?.email" />
        <div class="field-body">
          <CPFInput name="cpf" :initial-value="user?.cpf" />
          <DatePicker
            name="date"
            title="Data de nascimento"
            :initial-value="formattedBirthDate"
          />
        </div>
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
