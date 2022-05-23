import { createApp } from 'vue'

import { router } from '@/router'
import { pinia } from '@/stores'

import App from '@/App.vue'

import '@/styles/index.css'

const app = createApp(App)

app
  .use(pinia)
  .use(router)

app.mount('div#app')
