<script setup lang="ts">
import {
  CPFInput,
  PasswordInput,
  NameInput,
  EmailInput,
} from "@/components/fields";
import { Form } from "vee-validate";
import { yup } from "@/modules";

const schema = yup.object({
  name: yup.string().required().min(4).label("nome"),
  email: yup.string().required().email(),
  cpf: yup.string().required().cpf().label("CPF"),
  password: yup.string().required().password().label("senha"),
});

const onSubmit = (values: Record<string, any>) => {
  console.log("register", values);
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
