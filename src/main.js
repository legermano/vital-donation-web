import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { VueMaskDirective } from "v-mask";

import "@fortawesome/fontawesome-free/css/all.css";
// import "./assets/main.css";

// Workaround for Vue 3 while the lib is not fully compatible
const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
  beforeMount: vMaskV2.bind,
  updated: vMaskV2.componentUpdated,
  unmounted: vMaskV2.unbind,
};

const app = createApp(App).directive("mask", vMaskV3);

app.use(createPinia());
app.use(router);

app.mount("#app");
