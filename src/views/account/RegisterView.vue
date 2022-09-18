<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import {
  CpfField,
  PasswordField,
  NameField,
  EmailField,
} from "@/components/fields";
import { useEventBus } from "@/modules";
import { useFormValidationStore } from "@/stores";

const { emit } = useEventBus();
const { hasErrors } = storeToRefs(useFormValidationStore());
const user = reactive({
  name: null,
  email: null,
  cpf: null,
  password: null,
});

const validateFields = async () => {
  emit("validateInput");
  // Since the listining part is asyncronous, needs to await a little to proceed
  await new Promise((r) => setTimeout(r, 1000));
};

const onLogin = async () => {
  await validateFields();

  if (!hasErrors.value) {
    // TODO: Register logic
  }
};
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <div class="column is-8 is-offset-2">
        <h3 class="title has-text-centered">Registro</h3>
        <hr class="login-hr" />
        <p class="subtitle has-text-centered">
          Crie uma conta para poder acessar o sistema
        </p>
        <form
          class="columns is-flex is-flex-direction-column box"
          @submit.prevent
        >
          <NameField v-model="user.name" :show-title="false" />
          <EmailField v-model="user.email" :show-title="false" />
          <CpfField v-model="user.cpf" :show-title="false" />
          <PasswordField v-model="user.password" :show-title="false" />
          <div class="has-text-right" style="margin-bottom: 0.75rem">
            Já possui uma conta?
            <RouterLink to="login"> Faça o login </RouterLink>
          </div>
          <button
            @click="onLogin"
            class="button is-danger"
            style="margin-bottom: 0.75rem"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
