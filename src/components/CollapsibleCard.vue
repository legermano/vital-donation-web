<script setup lang="ts">
import { ref, onMounted } from "vue";

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

const card = ref<null | HTMLElement>(null);
const isActive = ref<boolean>(props.active);

onMounted(() => {
  if (card.value == null) {
    return;
  }

  if (props.active == false) {
    card.value.style.height = "0";
  }
});

const toogleCard = () => {
  if (props.expandable == false || card.value == null) {
    return;
  }

  if (card.value.classList.contains("is-active")) {
    card.value.style.height = "0";
    card.value.classList.remove("is-active");
    card.value.setAttribute("aria-expanded", "false");
    isActive.value = false;
  } else {
    card.value.style.height = card.value.scrollHeight + "px";
    card.value.classList.add("is-active");
    card.value.setAttribute("aria-expanded", "true");
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

<style scoped lang="scss">
.is-collapsible {
  overflow-y: hidden;
  transition: height 0.2s cubic-bezier(0.4, 0, 1, 1);
}
</style>
