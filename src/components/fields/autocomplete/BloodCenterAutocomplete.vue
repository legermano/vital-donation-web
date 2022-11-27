<script setup lang="ts">
import { useBloodCenterStore } from "@/stores";
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
  title: "Pesquisar homocentro",
  initialValue: "",
});

const emit = defineEmits(["bloodDonationSelected"]);

const bloodCenterStore = useBloodCenterStore();
const { bloodCenters } = storeToRefs(bloodCenterStore);
await bloodCenterStore.getAllBloodCenters();

const options: IBaseAutocompleteItem[] = bloodCenters.value.map((b) => {
  return {
    key: b.id,
    value: b.name,
  };
});

const bloodCenterSelected = (bloodCenterId: string): void => {
  const bloodCenter = bloodCenters.value.find((b) => b.id === bloodCenterId);

  if (bloodCenter == undefined) return;

  emit("bloodDonationSelected", bloodCenter.schedules);
};
</script>

<template>
  <BaseAutocomplete
    @option-selected="bloodCenterSelected"
    name="bloodCenterId"
    :horizontal="horizontal"
    :show-title="showTitle"
    :title="title"
    :options="options"
    :initial-value="initialValue"
  />
</template>
