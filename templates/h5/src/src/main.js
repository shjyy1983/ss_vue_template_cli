import 'lib-flexible/flexible'
import 'core-js/es6/promise'
import 'core-js/es6/array'
import 'core-js/es6/object'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import * as filters from './filters'
import './mixins'
Vue.config.devtools = true

// 注册 filter
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// Vue.config.productionTip = false

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
