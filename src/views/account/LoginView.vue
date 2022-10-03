<script setup lang="ts">
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { CpfField, PasswordField } from "@/components/fields";
import { useAuthStore, useFormValidationStore } from "@/stores";
import { useEventBus } from "@/modules";
import { Form } from "vee-validate";
import BaseInput from "../../components/fields/input/BaseInput.vue";
import * as yup from "yup";

interface Login {
  cpf: string;
  password: string;
}

const { login } = useAuthStore();
const { emit } = useEventBus();
const { hasErrors } = storeToRefs(useFormValidationStore());
const loginInput: Login = reactive({ cpf: "", password: "" });

const validateFields = async () => {
  emit("validateInput");
  // Since the listining part is asyncronous, needs to await a little to proceed
  await new Promise((r) => setTimeout(r, 1000));
};

const onLogin = async () => {
  await validateFields();

  if (!hasErrors.value) {
    login(loginInput.cpf, loginInput.password);
  }
};

const onSubmit = (values: any) => {
  console.log("Submitted with", values);
};

const schema = yup.object({
  cpf: yup.string().required().label("CPF"),
});
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
        <Form
          class="columns is-flex is-flex-direction-column box"
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <BaseInput
            name="cpf"
            :show-title="false"
            title="CPF"
            iconClass="fas fa-id-card"
          />
          <!-- <CpfField v-model="loginInput.cpf" :show-title="false" />
            <PasswordField
              v-model="loginInput.password"
              :show-title="false"
              :validate-value="false"
            /> -->
          <div class="has-text-right" style="margin-bottom: 0.75rem">
            Ainda não possui uma conta?
            <RouterLink to="register"> Crie uma nova </RouterLink>
          </div>
          <!-- <button @click="onLogin" class="button is-danger">Entrar</button> -->
          <button class="button is-danger" type="submit">Entrar</button>
        </Form>
      </div>
    </div>
  </div>
</template>
