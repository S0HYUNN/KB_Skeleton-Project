import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MainPage from "../pages/MainPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: () => import("../pages/MainPage.vue"),
    },
    {
      path: "/Money",
      name: "money",
      component: () => import("../pages/MoneyPage.vue"),
    },
  ],
});

export default router;
