<template>
  <div class="page home">
    <div class="page-content">
      <div class="box">
        <span class="title">box</span>
      </div>
      <img class="logo" :src="url" />
      <div class="logo2" :style="{bac}"></div>
      <BlueBox></BlueBox>
    </div>
  </div>
</template>

<script>
import BlueBox from './cmp/BlueBox'
import bridge from '@util/bridgeTool'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Home',
      url: './static/images/2.png', // 本地静态图片的处理
      userList: []
    }
  },
  mounted () {
  },
  methods: {
    navigateTo(path) {
      bridge.navigateTo(path)
    },
    changeAvatar() {
      this.url = './static/images/box.png'
    }
  },
  components: {
    BlueBox
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "./style";
</style>
