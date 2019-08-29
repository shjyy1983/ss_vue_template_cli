/*
 * @Author: SHEN
 * @Date: 2019-08-28 13:02:29
 * @Last Modified by: SHEN
 * @Last Modified time: 2019-08-29 23:33:03
 */
const path = require('path')
const { installDependencies } = require('../../lib/utils')

module.exports = {
  prompts: {
    title: {
      name: 'title',
      type: 'string',
      message: '项目标题',
      default: 'demo'
    },
    useVuex: {
      name: 'useVuex',
      type: 'confirm',
      message: '使用 vuex?',
      default: true
    },
    useRoute: {
      name: 'useRoute',
      type: 'confirm',
      message: '使用 router?',
      default: false
    },
    installDependency: {
      name: 'installDependency',
      type: 'confirm',
      message: '是否自动执行npm install 安装依赖？'
    }
  },
  complete: function(data, { chalk }) {
    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)
    if (data.installDependency) {
      installDependencies(cwd, 'yarn', [])
    }
  }
}
