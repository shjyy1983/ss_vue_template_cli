/**
 * Created by hs on 2018/5/8.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

Vue.config.devtools = true
let store = new Vuex.Store({
  modules: {
    user
  }
})

export default store
