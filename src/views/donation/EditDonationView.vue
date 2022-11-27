<script setup lang="ts">
defineProps({
  donationId: {
    type: String,
    required: true,
  },
});
</script>

<template>
  {{ donationId }}
</template>
