import { createRouter, createWebHistory } from "vue-router";

// Pages
import { Home, Create, NotFound, Dashboard } from "@/pages";

const routes = [
  {
    path: "/",
    component: Home,
  },
  { path: "/new", component: Create },
  { path: "/dashboard", component: Dashboard },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
