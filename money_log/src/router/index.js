import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MainPage from "../pages/MainPage.vue";
import NotFound from "@/pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "StartPage",
      component: () => import("../pages/StartPage.vue"),
    },
    {
      path: "/MainPage",
      name: "MainPage",
      component: () => import("../pages/MainPage.vue"),
    },
    {
      path: "/LoginPage",
      name: "LoginPage",
      component: () => import("../pages/LoginPage.vue"),
    },
    {
      path: "/UserProfileEdit",
      name: "UserProfileEdit",
      component: () => import("../pages/UserProfileEdit.vue"),
    },
    {
      path: "/Money",
      name: "money",
      component: () => import("../pages/MoneyPage.vue"),
    },
    {
      path: "/LogDetail",
      name: "LogDetail",
      component: () => import("../pages/LogDetailPage.vue"),
    },
    {
      path: "/Spending",
      name: "spending",
      component: () => import("../pages/SpendingPage.vue"),
    },
    { path: "/:paths(.*)*", component: NotFound },
  ],
});

export default router;
