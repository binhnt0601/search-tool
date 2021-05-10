import Vue from 'vue'
import DefaultPage from './pages/products/index.vue'
import axios from 'axios'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use({
    install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'https://run.mocky.io/v3/'
    })
  }
})

Vue.use(VueCurrencyFilter,
  {
    symbol : '$',
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: true
  })

Vue.config.productionTip = false

new Vue({
  render: h => h(DefaultPage),
}).$mount('#app')
