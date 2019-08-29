// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      unitPrecision: 8,
      propList: ['*height*', '*width*', 'font*', 'padding*', 'margin*', 'top', 'left', 'right', 'bottom', 'flex-basis', 'border-radius'], // 这里是需要转换的匹配项
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 1
    }
  }
}
