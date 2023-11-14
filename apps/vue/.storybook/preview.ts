import "../src/style.css";
import "primevue/resources/themes/lara-dark-teal/theme.css";
import "primeicons/primeicons.css";

import type { Preview } from "@storybook/vue3";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { clerkPlugin } from "vue-clerk";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import { setup } from "@storybook/vue3";

setup((app) => {
  app.use(PrimeVue);
  app.use(ToastService);

  app.use(clerkPlugin, {
    // @ts-ignore
    publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  });

  app.use(VueQueryPlugin);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
