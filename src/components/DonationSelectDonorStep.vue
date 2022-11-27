<script setup lang="ts">
import { useForm } from "vee-validate";
import { useUserStore } from "@/stores";
import { UserAutocomplete } from "@/components/fields";
import { yup, useToast } from "@/modules";
import { storeToRefs } from "pinia";
import { LoaderSpinner } from "@/components";

const emit = defineEmits(["nextStepDonation"]);

const userStore = useUserStore();
const { error, warning } = useToast();

const { users } = storeToRefs(userStore);

const schema = yup.object({
  userId: yup.string().label("Usuário"),
});

const { handleSubmit } = useForm<{ userId: string }>({
  validationSchema: schema,
});

const onSubmit = handleSubmit((data) => {
  if (data.userId === "") {
    warning("Necessário escolher um(a) doador(a)");
    return;
  }

  const user = users.value.find((u) => u.id === data.userId);

  if (!user) {
    error("Não foi encontrado os dados do usuário selecionado");
    return;
  }

  emit("nextStepDonation", user);
});
</script>
<template>
  <div class="hero-body">
    <div class="container">
      <h3 class="title has-text-centered">Selecione o(a) doador(a)</h3>
      <form @submit="onSubmit">
        <Suspense>
          <UserAutocomplete name="userId" :show-title="false" />
          <template #fallback> <LoaderSpinner /> </template>
        </Suspense>
        <div class="buttons is-right">
          <button class="button is-danger">Avançar</button>
        </div>
      </form>
    </div>
  </div>
</template>
