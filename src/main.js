import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
router.push('/landing') // Explicitly navigate to the landing page
app.mount('#app')