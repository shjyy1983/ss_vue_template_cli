import Vue from 'vue'

Vue.mixin({
  methods: {
    isEmpty(o) {
      return o === null || o === undefined || o === ''
    }
  }
})
