/** @format */

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/HomeView.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('./views/SettingsView.vue')
  },
  {
    path: '/comm',
    name: 'Comm',
    component: () => import('./views/CommView.vue')
  },
  {
    path: '/gpio',
    name: 'GPIO',
    component: () => import('./views/GPIOView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
