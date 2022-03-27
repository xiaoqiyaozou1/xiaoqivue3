

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { store, key } from '../src/store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(store, key)
app.use(router)
app.mount('#app')

