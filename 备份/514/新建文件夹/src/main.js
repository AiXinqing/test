import Vue from 'vue'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import './icons'

import 'default-passive-events'

import ECharts from 'vue-echarts'
Vue.prototype.$echarts = ECharts
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/funnel'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/radar'
// import 'echarts/lib/chart/image'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

Vue.component('chart', ECharts)

Vue.use(Element, {
  size: 'medium'
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
