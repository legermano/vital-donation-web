<script setup>
import { ref } from "vue";

defineProps({
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
    default: "Email",
  },
});

const invalid = ref(false);
</script>

<template>
  <div class="field" :class="{ 'is-horizontal': horizontal }">
    <div
      v-if="showTitle"
      :class="{ 'field-label': horizontal, 'is-normal': horizontal }"
    >
      <label class="label">{{ title }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div
          class="control has-icons-left"
          :class="{ 'has-icons-right': invalid }"
        >
          <input
            class="input"
            type="email"
            placeholder="Email"
            :class="{ 'is-danger': invalid }"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span v-if="invalid" class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p v-if="invalid" class="help is-danger">Esse email é inválido</p>
      </div>
    </div>
  </div>
</template>
