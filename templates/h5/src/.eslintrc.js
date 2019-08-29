// https://eslint.org/docs/user-guide/configuring
// https://cn.eslint.org/docs/user-guide/configuring
// https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md

/**
 * ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 */
module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  rules: {
    'indent': ['warn', 2], // 缩紧为2个空格，如果不是则显示 warn
    // allow async-await
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 不要使用 debugger，开发关闭，生产报错
    'space-before-function-paren': 'off', // 函数声明时括号与函数名间加空格，关闭，不进行检查
    'semi': 'warn' // 不建议使用逗号，如果有则 warn
  }
}
