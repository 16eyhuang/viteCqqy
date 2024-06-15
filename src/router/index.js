import { createRouter, createWebHistory } from 'vue-router'
import HandlePage from '../pages/HandlePage.vue';
import GetPage from '../pages/GetPage.vue';
import GetPageTelegram from '../pages/GetPageTelegram.vue';
import BenefitReport from '../pages/BenefitReport.vue';
import HbltPage from '../pages/hblt/index.vue';

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
    {
      path: '/benefitReport',
      name: 'benefitReport',
      component: BenefitReport,
    },
    {
      path: '/hblt',
      name: 'hblt',
      component: HbltPage,
    },
  ],
});

export default router;
