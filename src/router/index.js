import { createRouter, createWebHistory } from 'vue-router'
import HandlePage from '../pages/HandlePage.vue';
import GetPage from '../pages/GetPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'rootPage',
      component: HandlePage,
    },
    {
      path: '/cqqy/handleOrder',
      name: 'handlePage',
      component: HandlePage,
    },
    {
      path: '/cqqy/receiveOrder',
      name: 'getPage',
      component: GetPage,
    },
  ],
});

export default router;
