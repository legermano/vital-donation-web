<script setup lang="ts">
import { ref, onMounted } from "vue";
import bulmaCollapsible from "@creativebulma/bulma-collapsible";
import type { IHTMLElementCollapsible } from "@/interfaces";

const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  content: {
    type: String,
    default: "Content",
  },
  active: {
    type: Boolean,
    default: false,
  },
  expandable: {
    type: Boolean,
    default: true,
  },
});

const card = ref<null | IHTMLElementCollapsible>(null);
const isActive = ref<boolean>(props.active);

onMounted(() => {
  if (card.value != null) {
    new bulmaCollapsible(card.value);
  }
});

const toogleCard = () => {
  if (props.expandable == false) {
    return;
  }

  if (card.value == null) {
    return;
  }

  if (card.value.classList.contains("is-active")) {
    card.value.bulmaCollapsible("collapse");
    isActive.value = false;
  } else {
    card.value.bulmaCollapsible("expand");
    isActive.value = true;
  }
};
</script>

<template>
  <div class="card">
    <header
      class="card-header"
      :class="{
        'is-clickable': expandable,
      }"
      @click="toogleCard"
    >
      <p class="card-header-title">{{ title }}</p>
      <a
        v-if="expandable"
        data-action="collapse"
        class="card-header-icon is-hidden-fullscreen"
        aria-label="more options"
      >
        <span class="icon">
          <i
            :class="{
              'fas fa-angle-down': !isActive,
              'fas fa-angle-up': isActive,
            }"
            aria-hidden="true"
          ></i>
        </span>
      </a>
    </header>
    <div
      v-uid
      ref="card"
      class="is-collapsible"
      :class="{
        'is-active': isActive,
      }"
    >
      <div class="card-content">
        <slot name="component">
          {{ content }}
        </slot>
      </div>
    </div>
  </div>
</template>
