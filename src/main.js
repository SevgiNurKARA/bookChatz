import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

const app = createApp(App)
app.use(router)
router.push('/landing') // Explicitly navigate to the landing page
app.mount('#app')