<script setup lang="ts">
import { BaseAutocomplete } from "@/components/fields";
import type { IBaseAutocompleteItem } from "@/interfaces";

const options: IBaseAutocompleteItem[] = [
  {
    key: "1",
    value: "Foo",
  },
  {
    key: "2",
    value: "Bar",
  },
  {
    key: "3",
    value: "Foo Bar",
  },
  {
    key: "4",
    value: "Bar Foo",
  },
];
</script>
<template>
  <div class="container">
    <h3 class="title has-text-centered">Selecione o(a) doador(a)</h3>
    <form>
      <BaseAutocomplete
        name="usuario"
        :options="options"
        title="Pesquisar doador(a)"
      />
    </form>
  </div>
</template>
