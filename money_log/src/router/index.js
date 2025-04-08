import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MainPage from '../pages/MainPage.vue';

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
      name: 'MainPage',
      component: () => import('../pages/MainPage.vue'),
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
