<script setup lang="ts">
import { useUserStore } from "@/stores";
import { BaseAutocomplete } from "@/components/fields";
import type { IBaseInput } from "@/interfaces/IBaseInput";
import { storeToRefs } from "pinia";

interface IBaseAutocompleteItem {
  key: string;
  value: string;
}

withDefaults(defineProps<IBaseInput>(), {
  horizontal: false,
  showTitle: true,
  title: "Pesquisar doador(a)",
  initialValue: "",
});

const userStore = useUserStore();
const { users } = storeToRefs(userStore);
await userStore.getAllUsers();

const options: IBaseAutocompleteItem[] = users.value.map((u) => {
  return {
    key: u.id,
    value: `${u.name} (${u.cpf})`,
  };
});
</script>

<template>
  <BaseAutocomplete
    name="userId"
    :horizontal="horizontal"
    :show-title="showTitle"
    :title="title"
    :options="options"
    :initial-value="initialValue"
  />
</template>
