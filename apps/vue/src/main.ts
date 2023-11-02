import { createApp } from "vue";
import "./style.css";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-dark-teal/theme.css";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { clerkPlugin } from "vue-clerk";

const app = createApp(App);

app.use(PrimeVue);

app.use(clerkPlugin, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
});

app.use(VueQueryPlugin);

app.mount("#app");
