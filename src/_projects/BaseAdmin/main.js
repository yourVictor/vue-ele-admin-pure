import Vue from 'vue'
import App from '@/App.vue'
import i18n from '@/__common/plugins/i18n'
import '@/__common/plugins'

new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')
