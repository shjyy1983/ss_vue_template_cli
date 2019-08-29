const program = require('commander')
const path = require('path')
const chalk = require('chalk') // 终端字体颜色
const inquirer = require('inquirer')
const exists = require('fs').existsSync // 判断 路径是否存在
const generate = require('../lib/generate')

program.version('1.0.0')

/**
 * 注册一个help的命令
 * 当在终端输入 dg --help 或者没有跟参数的话
 * 会输出提示
 */
program.on('--help', () => {
  {
    console.log('\n使用命令来创建项目:')
    console.log(chalk.blue('\n\tnode bin/ss_cli.js template my-project \n'))
  }
})

/**
 * 判断参数是否为空
 * 如果为空调用上面注册的 help命令
 * 输出提示
 */
function help () {
  program.parse(process.argv) // commander 用来处理 命令行里面的参数， 这边的process是node的一个全局变量不明白的可以查一下资料
  if (program.args.length < 1) return program.help()
}
help()

/**
 * 获取命令行参数
 * 目前只有一个参数：项目名字
 */
const templateName = program.args[0] // 命令行第一个参数 模版的名字
const destDirName = program.args[1] // 第二个参数 项目目录

const rootPath = path.resolve(destDirName) // 以当前目录为项目的目录
const templatePathName = path.join(process.cwd(), templateName) // 项目的绝对路径

console.log(rootPath)
if (exists(templatePathName)) {
  inquirer.prompt([ // 这边就用到了与终端交互的inquirer了
    {
      type: 'confirm',
      message: 'Continue?',
      name: 'ok'
    }
  ]).then(answers => {
    if (answers.ok) {
      run()
    }
  })
}

function run() {
  generate(destDirName, templatePathName)
}
