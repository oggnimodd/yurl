import { createRouter, createWebHistory } from "vue-router";

// Pages
import { Home, Create, NotFound, Dashboard } from "@/pages";

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      isPublic: true,
    },
  },
  { path: "/new", component: Create },
  { path: "/dashboard", component: Dashboard },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    meta: {
      isPublic: true,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
