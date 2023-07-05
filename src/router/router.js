import { createRouter, createWebHistory } from "vue-router";

import homeView from "../views/homeView.vue";
import aboutView from "../views/aboutView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: homeView,
  },
  {
    path: "/about",
    name: "About",
    component: aboutView,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});
export default router;
