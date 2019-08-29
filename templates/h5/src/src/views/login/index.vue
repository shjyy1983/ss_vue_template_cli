<template>
  <div class="page login">
    <div class="page-content">
      <div class="title">{{msg}}</div>
      <div class="btn" @click="navigateTo('/home')">go to home page</div>
      <div class="login" @click="login">登陆</div>
      <div class="info">Name:{{name}}</div>
      <div class="info">Age:{{age}}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { CHANGE_NAME, INCREMENT_AGE } from '@store/mutation-types'
import bridge from '@util/bridgeTool'

export default {
  name: 'login',
  data () {
    return {
      msg: 'Login',
      info: ''
    }
  },
  computed: {
    ...mapState({
      name: state => state.user.name
    }),
    ...mapGetters({
      age: 'getAge'
    })
  },
  mounted () {

  },
  methods: {
    ...mapMutations({
      incrementAge: INCREMENT_AGE
    }),
    ...mapActions({
      changeName: CHANGE_NAME
    }),
    navigateTo(path) {
      bridge.navigateTo(path)
    },
    login() {
      let newName = 'Tom_' + this.age
      this.changeName({ name: newName })
      this.incrementAge()
    }
  },
  components: {

  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "./style";
</style>
