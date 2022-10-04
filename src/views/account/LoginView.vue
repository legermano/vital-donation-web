<script setup lang="ts">
import { useAuthStore } from "@/stores";
import { Form } from "vee-validate";
import { CPFInput, PasswordInput } from "@/components/fields";
import { yup } from "@/modules";

const { login } = useAuthStore();

// TODO: Use correct type ?
const onSubmit = (values: Record<string, any>) => {
  login(values.cpf, values.password);
};

const schema = yup.object({
  cpf: yup.string().cpf().required().label("CPF"),
  password: yup.string().required().label("senha"),
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
          <CPFInput name="cpf" :show-title="false" />
          <PasswordInput name="password" :show-title="false" />
          <div class="has-text-right" style="margin-bottom: 0.75rem">
            Ainda não possui uma conta?
            <RouterLink to="register"> Crie uma nova </RouterLink>
          </div>
          <button class="button is-danger" type="submit">Entrar</button>
        </Form>
      </div>
    </div>
  </div>
</template>
