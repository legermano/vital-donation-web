<script setup lang="ts">
import { ref } from "vue";
import { BaseInput } from "@/components/fields";
import type { IBaseAutocomplete } from "@/interfaces/IBaseAutocomplete";
import { Field } from "vee-validate";

interface IBaseAutocompleteItem {
  key: string;
  value: string;
}

const props = withDefaults(defineProps<IBaseAutocomplete>(), {
  horizontal: false,
  showTitle: true,
  title: "Selecione",
});

const search = ref("");
const showOptions = ref<boolean>(false);
const searchOptions = ref<IBaseAutocompleteItem[]>([]);
const selectedOption = ref();

let selectOptions = ref(props.options);

if (props.defaultOption != undefined) {
  selectOptions.value = [props.defaultOption, ...selectOptions.value];
}

const onChangeInput = (search: string) => {
  if (search === "") {
    showOptions.value = false;
    searchOptions.value = [];
    return;
  }

  showOptions.value = true;

  searchOptions.value = props.options?.filter((option) => {
    if (option.value.toLowerCase().includes(search.toLowerCase())) {
      return option;
    }
  });
};

const selectOption = (option: { key: string; value: string }) => {
  search.value = option.value;
  showOptions.value = false;
  selectedOption.value = option.key;
};
</script>

<template>
  <BaseInput
    :name="name"
    :horizontal="horizontal"
    :show-title="showTitle"
    :title="title"
    :initial-value="initialValue"
    :icon-class="iconClass"
  >
    <template #field>
      <div
        class="dropdown is-fullwidth"
        :class="{
          'is-active': showOptions,
        }"
      >
        <Field :name="name" style="display: none" v-model="selectedOption" />
        <input
          class="input dropdown-trigger"
          type="text"
          placeholder="Digite aqui..."
          @input="onChangeInput(($event.target as HTMLTextAreaElement).value)"
          v-model="search"
        />

        <div class="dropdown-menu">
          <div class="dropdown-content">
            <div class="dropdown-item has-text-centered">
              <strong>
                Mostrando {{ searchOptions.length }} de
                {{ options.length }} resultados
              </strong>
            </div>
            <hr class="dropdown-divider" />
            <a
              v-for="option in searchOptions"
              :key="option.key"
              class="dropdown-item"
              @click="selectOption({ key: option.key, value: option.value })"
            >
              {{ option.value }}
            </a>
          </div>
        </div>
      </div>
    </template>
  </BaseInput>
</template>

<style scoped lang="scss">
.dropdown {
  &.is-fullwidth {
    display: flex;

    .dropdown-trigger,
    .dropdown-menu {
      width: 100%;
    }
  }
}
</style>
