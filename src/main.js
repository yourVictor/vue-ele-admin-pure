import Vue from 'vue'
import 'animate.css'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from '@/plugins/i18n/index'
import '@/plugins/registerServiceWorker'
import '@/plugins/element.js'
import '@/plugins/filter'
import '@/plugins/common'
import '@/styles/js/_fontIcon' // 多色图标支持
import '@/plugins/permission'
import '@/styles/index.scss'
// 需调试导出功能（下载文件）时，需把MOCK关闭
process.env.VUE_APP_MOCK === 'true' && import('@/plugins/mockjs/index.js') // 开发环境使用 mockjs

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
