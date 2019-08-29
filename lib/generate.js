/*
 * @Author: SHEN
 * @Date: 2019-08-28 11:54:59
 * @Last Modified by: SHEN
 * @Last Modified time: 2019-08-30 00:24:17
 */
const path = require('path')
const chalk = require('chalk')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const getOptions = require('./options')
const ask = require('./ask')

/**
 * destDirName: 项目名字
 * templatePathName: 模版的路径
 */
module.exports = function generate(destDirName, templatePathName) {
  const options = getOptions(templatePathName)

  const metalsmith = Metalsmith(templatePathName)
  const data = Object.assign(metalsmith.metadata(), {
    destDirName: destDirName,
    inPlace: false // 是否在当前目录下进行
  })

  const dist = path.join(process.cwd(), destDirName) // 最终编译好的文件存放位置

  metalsmith.use(askQuestions(options.prompts)).use(renderTemplateFiles()) // 使用插件
  metalsmith
    .clean(true) // 先清空目标文件夹
    .source('./src')
    .destination(dist)
    .build(function(err) {
      if (err) throw err

      if (typeof options.complete === 'function') {
        const helpers = { chalk }
        options.complete(data, helpers)
      }
      console.log('Build finished!')
    })
}

/**
 * 使用 inquirer 来进行交互获取配置信息
 * @param {*} prompts 需要交互的配置
 */
function askQuestions(prompts) {
  return (fils, ms, done) => {
    ask(prompts, ms.metadata(), done)
  }
}

/**
 * 通过文件名后缀，来判断哪些文件需要由 handlerbar 编译
 * @param {*} filename 文件相对路径
 */
function shouldCompile(filename) {
  let whitelist = ['.html', '.json', '.js', '.vue', '.ts']
  let find = false
  for (let name of whitelist) {
    if (filename.indexOf(name) >= 0) {
      find = true
      break
    }
  }
  return find
}


/**
 * 根据模版文件和规则来创建新的项目
 */
function renderTemplateFiles() {
  return (files, ms, done) => {
    const keys = Object.keys(files)

    for (let key of keys) {
      if (!shouldCompile(key)) {
        continue
      }

      console.log(key)

      // 文件的文本内容
      const str = files[key].contents.toString()
      // 使用 handerbars 插件
      const t = Handlebars.compile(str)
      // 配置信息，可以通过 inquirer 来交互获取
      // const metadata = {
      //   useVuex: true,
      //   useRoute: true
      // }
      // 渲染
      const html = t(ms.metadata())
      files[key].contents = new Buffer.from(html)
    }
    done() // 移交给下个插件
  }
}
