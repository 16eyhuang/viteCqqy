import { createRouter, createWebHistory } from 'vue-router'
import HandlePage from '../pages/HandlePage.vue';
import GetPage from '../pages/GetPage.vue';
import GetPageTelegram from '../pages/GetPageTelegram.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'rootPage',
      component: HandlePage,
    },
    {
      // path: '/cqqyH',
      path: '/cqqy/handleOrder',
      name: 'handlePage',
      component: HandlePage,
    },
    {
      // path: '/cqqyR',
      path: '/cqqy/receiveOrder',
      name: 'getPage',
      component: GetPage,
    },
    {
      path: '/scqy',
      name: 'getPageTelegram',
      component: GetPageTelegram,
    },
  ],
});

export default router;
