import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import AboutPage from '@/pages/About.vue'
import HomePage from '@/pages/Home.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home',
  },
  {
    path: '/about',
    component: AboutPage,
    name: 'about',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
