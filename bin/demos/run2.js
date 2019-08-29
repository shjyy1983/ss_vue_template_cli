// 执行脚本命令执行
//

const { installDependencies } = require('../../lib/utils')

installDependencies('.', 'yarn', []).then(() => {
  console.log('安装完成')
})
