import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/shared/assets/styles/normalize.css'
import '@/shared/assets/fonts/avenir/stylesheet.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(router).mount('#app')
