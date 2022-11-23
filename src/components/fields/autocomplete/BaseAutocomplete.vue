<script setup lang="ts">
import { computed, ref } from "vue";
import { BaseInput } from "@/components/fields";
import type { IBaseAutocomplete } from "@/interfaces/IBaseAutocomplete";

const props = withDefaults(defineProps<IBaseAutocomplete>(), {
  horizontal: false,
  showTitle: true,
  title: "Selecione",
});

const search = ref("");
const selectedOption = ref();

let selectOptions = ref(props.options);

if (props.defaultOption != undefined) {
  selectOptions.value = [props.defaultOption, ...selectOptions.value];
}

const searchOptions = computed(() => {
  if (search.value === "") {
    return [];
  }

  return props.options?.filter((option) => {
    if (option.value.toLowerCase().includes(search.value.toLowerCase())) {
      return option;
    }
  });
});

const selectOption = (key: string) => {
  selectedOption.value = props.options.find((o) => o.key === key);
  search.value = "";
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
          'is-active': searchOptions.length,
        }"
      >
        <input
          class="input dropdown-trigger"
          type="text"
          placeholder="Digite aqui..."
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
              @click="selectOption(option.key)"
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
