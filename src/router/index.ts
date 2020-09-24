import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('@/views/download.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
