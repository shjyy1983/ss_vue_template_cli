#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const glob = require('glob')

program.parse(process.argv)

if (program.args.length < 1) {
  console.log(chalk.red('没有参数'))
  return
}

const projectName = program.args[0]
if (!projectName) {
  console.log(chalk.red('需要指定项目名字'))
}

console.log(program.args)

/**
 * node ./bin/demos/run1.js test
 * 输出
 * [ 'test' ]
 */
