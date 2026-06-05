import { createRouter, createWebHistory } from 'vue-router'
import HandlePage from '../pages/HandlePage.vue';
import GetPage from '../pages/GetPage.vue';
import GetPageTelegram from '../pages/GetPageTelegram.vue';
import GetPageTelegramGMDX from '../pages/GetPageTelegramGMDX.vue';
import BenefitReport from '../pages/BenefitReport.vue';
import HbltPage from '../pages/hblt/index.vue';
import page5G from '../pages/5G/index.vue';
import HandlePage5G from "../pages/5GHandlePage/index.vue";
import Handle30Page5G from "../pages/5GHandlePage/handle30Order.vue";
import gx from "../pages/gx/index.vue";
import gxyd from "../pages/gxyd/index.vue";
import hbyd from "../pages/hbyd/index.vue";
import qylq from "../pages/qylq/index.vue";
import hbyd20260605 from "../pages/hbyd20260605/index.vue";

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
    {
      path: '/cqqy/5g',
      name: '5g',
      component: page5G,
    },
    {
      path: '/cqqy/5g/handleOrder',
      name: '5gHandlePage',
      component: HandlePage5G,
    },
    {
      path: '/cqqy/5g/handle30Order',
      name: 'handle30Order',
      component: Handle30Page5G,
    },
    {
      path: '/gx',
      name: 'gx',
      component: gx,
    },
    {
      path: '/gxyd',
      name: 'gxyd',
      component: gxyd,
    },
    {
      path: '/hbyd',
      name: 'hbyd',
      component: hbyd,
    },
    {
      path: '/qylq',
      name: 'qylq',
      component: qylq,
    },
    {
      path: '/gmdx',
      name: 'getPageTelegramGMDX',
      component: GetPageTelegramGMDX,
    },
    {
      path: '/bjhbyd',
      name: 'bjhbyd',
      component: hbyd20260605,
    }
  ],
});

export default router;
