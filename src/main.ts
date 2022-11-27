import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueMaskDirective } from "v-mask";
import { UidPlugin } from "@shimyshack/uid";
import { setDefaults } from "bulma-toast";

import App from "@/App.vue";
import { router } from "@/router";

import "@/assets/main.scss";

// Workaround for Vue 3 while the lib is not fully compatible
const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
  beforeMount: vMaskV2.bind,
  updated: vMaskV2.componentUpdated,
  unmounted: vMaskV2.unbind,
};

// Set default options for bulma toast
setDefaults({
  dismissible: true,
  position: "top-right",
  closeOnClick: true,
  pauseOnHover: true,
  animate: {
    in: "fadeIn",
    out: "fadeOut",
  },
  duration: 5000,
});

const app = createApp(App).directive("mask", vMaskV3);

app.use(createPinia());
app.use(router);
app.use(UidPlugin);

app.mount("#app");
