import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/StartPage',
      name: 'StartPage',
      component: () => import('../views/StartPage.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/Money',
      name: 'money',
      component: () => import('../pages/MoneyPage.vue'),
    },
    {
      path: '/Spending',
      name: 'spending',
      component: () => import('../pages/SpendingPage.vue'),
    },
  ],
});

export default router;
