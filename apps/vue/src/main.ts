import "./style.css";
import "primevue/resources/themes/lara-dark-teal/theme.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { clerkPlugin } from "vue-clerk";
import { router } from "./Routes";

const app = createApp(App);

app.use(PrimeVue);

app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
});

app.use(router);

app.use(VueQueryPlugin);

app.mount("#app");
