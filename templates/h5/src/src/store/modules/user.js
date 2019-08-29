/**
 * Created by hs on 2018/5/8.
 */

import {
  CHANGE_NAME,
  INCREMENT_AGE
} from '../mutation-types'

const StorageIDs = {
  Name: 'Name'
}

let state = {
  name: localStorage.getItem(StorageIDs.Name) || 'default',
  age: 10
}

let getters = {
  getName: state => state.name,
  getAge: state => state.age
}

// mutation 必须是同步函数
let mutations = {
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  [CHANGE_NAME](state, newName) {
    state.name = newName
    localStorage.setItem(StorageIDs.Name, newName)
  },
  [INCREMENT_AGE](state) {
    state.age++
  }
}

// 异步提交更改
let actions = {
  [CHANGE_NAME]({ commit, state }, param) {
    // 可以在 action 内部执行异步操作
    setTimeout(() => {
      commit(CHANGE_NAME, param.name)
    }, 500)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
