const inquirer = require('inquirer')
const async = require('async') // 这是node下一个异步处理的工具

module.exports = function ask(prompts, metadate, done) {
  async.eachSeries(Object.keys(prompts), (key, next) => {
    inquirer.prompt([
      {
        type: prompts[key].type,
        name: prompts[key].name,
        message: prompts[key].message,
        choices: prompts[key].choices || [],
        default: prompts[key].default
      }
    ]).then(answers => {
      if (typeof answers[key] === 'string') {
        metadate[key] = answers[key].replace(/"/g, '\\"')
      } else {
        metadate[key] = answers[key]
      }
      next()
    }).catch(done)
  }, done)
}
