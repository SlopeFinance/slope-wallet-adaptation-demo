import Vue from 'vue'
import App from './App.vue'
import Mui from '@/components/_mui'

Vue.config.productionTip = false
Vue.use(Mui)

new Vue({
  render: h => h(App)
}).$mount('#app')
