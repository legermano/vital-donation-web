<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { CpfField, PasswordField } from "@/components/fields";
import { useAuthStore, useFormValidationStore } from "@/stores";
import { useEventBus } from "@/modules";

const { login } = useAuthStore();
const { emit } = useEventBus();
const { hasErrors } = storeToRefs(useFormValidationStore());
const user = reactive({
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
    login(user.cpf, user.password);
  }
};
</script>

<template>
  <div class="hero-body">
    <div class="container">
      <div class="column is-8 is-offset-2">
        <h3 class="title has-text-centered">Login</h3>
        <hr class="login-hr" />
        <p class="subtitle has-text-centered">
          Realize o login para ter acesso ao sistema
        </p>
        <form
          class="columns is-flex is-flex-direction-column box"
          @submit.prevent
        >
          <CpfField v-model="user.cpf" :show-title="false" />
          <PasswordField
            v-model="user.password"
            :show-title="false"
            :validate-value="false"
          />
          <div class="has-text-right" style="margin-bottom: 0.75rem">
            Ainda não possui uma conta?
            <RouterLink to="register"> Crie uma nova </RouterLink>
          </div>
          <button @click="onLogin" class="button is-danger">Entrar</button>
        </form>
      </div>
    </div>
  </div>
</template>
