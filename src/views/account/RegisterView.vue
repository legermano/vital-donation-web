<script setup lang="ts">
import {
  CPFInput,
  PasswordInput,
  NameInput,
  EmailInput,
} from "@/components/fields";
import { Form } from "vee-validate";
import { yup, useSchemas } from "@/modules";
import { useUserStore } from "@/stores";

const { createUser } = useUserStore();
const { name, email, cpf, password } = useSchemas();
const schema = yup.object({
  name: name.label("nome"),
  email: email,
  cpf: cpf.label("CPF"),
  password: password.label("senha"),
});

const onSubmit = (values: Record<string, any>): void =>
  createUser(values.name, values.cpf, values.email, values.password);
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
        <Form
          class="columns is-flex is-flex-direction-column box"
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <NameInput name="name" :show-title="false" />
          <EmailInput name="email" :show-title="false" />
          <CPFInput name="cpf" :show-title="false" />
          <PasswordInput name="password" :show-title="false" />
          <div class="has-text-right" style="margin-bottom: 0.75rem">
            Já possui uma conta?
            <RouterLink to="login"> Faça o login </RouterLink>
          </div>
          <button
            class="button is-danger"
            style="margin-bottom: 0.75rem"
            type="submit"
          >
            Registrar
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>
