import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import "sweetalert2/dist/sweetalert2.min.css"
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  Swal,
  render: h => h(App)
}).$mount('#app')
