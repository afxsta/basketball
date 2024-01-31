import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import { initStyles } from '@/shared'
initStyles()

const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
