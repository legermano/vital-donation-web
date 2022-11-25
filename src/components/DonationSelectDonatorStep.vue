<script setup lang="ts">
import { useForm } from "vee-validate";
import { useNotificationStore, useUserStore } from "@/stores";
import { UserAutocomplete } from "@/components/fields";
import { yup } from "@/modules";
import { storeToRefs } from "pinia";
import { LoaderSpinner } from "@/components";

const emit = defineEmits(["nextStepSelectDonator"]);

const userStore = useUserStore();
const notificationStore = useNotificationStore();

const { users } = storeToRefs(userStore);

const schema = yup.object({
  userId: yup.string().label("Usuário"),
});

const { handleSubmit } = useForm<{ userId: string }>({
  validationSchema: schema,
});

const onSubmit = handleSubmit((data) => {
  if (data.userId === "") {
    notificationStore.warning(
      "Atenção!",
      "Necessário escolher um(a) doador(a)"
    );
    return;
  }

  const user = users.value.find((u) => u.id === data.userId);

  if (!user) {
    notificationStore.error(
      "Erro",
      "Não foi encontrado os dados do usuário selecionado"
    );
    return;
  }

  emit("nextStepSelectDonator", user);
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
          <button class="button is-danger is-right">Avançar</button>
        </div>
      </form>
    </div>
  </div>
</template>
