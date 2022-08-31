<script setup>
import { reactive } from "vue";
import useEventBus from "../modules/eventBus";
import CpfField from "../components/fields/CpfField.vue";
import useFormValidation from "../modules/formValidation";
import PasswordField from "../components/fields/PasswordField.vue";

const { emit } = useEventBus();
const { errors } = useFormValidation();
const user = reactive({
  cpf: null,
  password: null,
});

const validateFields = () => {
  emit("validateInput");
};

const isValid = () => {
  let valid = true;
  for (let field in errors) {
    if (errors[field].length > 0) {
      valid = false;
      break;
    }
  }

  return valid;
};

const onLogin = () => {
  validateFields();
  if (isValid()) {
    //TODO: Login logic
  }
};
</script>

<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="column is-8 is-offset-2">
          <h3 class="title has-text-centered">Login</h3>
          <hr class="login-hr" />
          <p class="subtitle has-text-centered">
            Realize o login para ter acesso aos dados do sistema
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
            <button @click="onLogin" class="button is-danger">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
