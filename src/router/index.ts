import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { SNAKE_GAME } from './routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/snake',
    name: SNAKE_GAME,
    component: () => import('@/views/Snake.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
