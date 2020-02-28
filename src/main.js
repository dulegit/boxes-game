import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'

Vue.config.productionTip = process.env.VUE_APP_PRODUCTION_CONFIG

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
