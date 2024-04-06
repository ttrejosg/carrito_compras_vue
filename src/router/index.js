import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { transition: "slide-left" },
    },
    {
      path: "/management",
      name: "management",
      component: () => import("../views/ManagementView.vue"),
      meta: { transition: "slide-right" },
    },
  ],
});

export default router;
