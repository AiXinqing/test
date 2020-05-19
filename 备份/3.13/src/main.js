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
