import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import HomePage from '@/pages/Home.vue'
import AboutPage from '@/pages/About.vue'

const routes = [
  {
    path: '/', component: HomePage,
  },
  {
    path: '/about', component: AboutPage,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
