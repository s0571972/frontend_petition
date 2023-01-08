import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const vue = createApp(App).use(router)
vue.mount('#app')
