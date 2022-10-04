<script setup lang="ts">
import BaseInput from "./BaseInput.vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "Nome",
  },
});
</script>

<template>
  <BaseInput
    :name="name"
    :horizontal="horizontal"
    :showTitle="showTitle"
    :title="title"
    iconClass="fas fa-user"
  />
</template>
