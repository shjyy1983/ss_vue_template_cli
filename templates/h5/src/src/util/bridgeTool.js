/**
 * Created by shj on 2018/5/30.
 */

let bridgeTool = {
  bridge: null,
  setup() {
  },
  // OC 调用 JS的方法
  registerHandlers() {
    let bridge = this.bridge
    // OC 调用 JS的方法，必须在这个代码块里
    bridge.registerHandler('navigateTo', (path, responseCallback) => {
      window.vm.$router.push({ path: path })
    })
  },
  navigateTo(path) {
    let bridge = this.bridge
    if (bridge) {
      bridge.callHandler('h5_navigateTo', { path }, (response) => {
      })
    } else {
      window.vm.$router.push({ path: path })
    }
  }
}

export default bridgeTool
