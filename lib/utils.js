const chalk = require('chalk') // 终端字体颜色
const spawn = require('child_process').spawn

/**
 * 执行脚本
 * @param {*} cmd 命令
 * @param {*} args 参数
 * @param {*} options 选项
 */
function runCommand(cmd, args, options = []) {
  return new Promise((resolve, reject) => {
    /**
     * 如果不清楚spaw的话可以上网查一下
     * 这里就是 在项目目录下执行 npm install
     */
    const spwan = spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: true // 在shell下执行
        },
        options
      )
    )
    spwan.on('exit', () => {
      resolve()
    })
  })
}

/**
 * 执行 npm 安装
 * @param {*} cwd 目录
 * @param {*} executable 命令
 */
function installDependencies(cwd, cmd = 'npm', args = ['install']) {
  console.log(`${chalk.blue('正在安装项目依赖 ...')}`)
  console.log('========================\n')
  return runCommand(cmd, args, {
    cwd
  })
}

exports.installDependencies = installDependencies
