/*
 * @Author: SHJ
 * @Date: 2018-06-22 10:10:37
 * @Last Modified by: S
 * @Last Modified time: 2019-02-13 10:04:02
 */

/**
 * 基础的 webpack 配置文件主要根据模式定义了入口出口，以及处理 vue, babel等的各种模块。
 */
'use strict'
const utils = require('./utils')
const config = require('./config')
const vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 定义代码检测的规则
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [utils.resolve('src'), utils.resolve('test')],
  options: {
    // 指定错误报告的格式规范
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  // 基础目录，绝对路径，用于从配置中解析入口起点，以下配置为项目根目录
  context: utils.resolve('.'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 创建别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
      '@assets': utils.resolve('src/assets'),
      '@components': utils.resolve('src/components'),
      '@util': utils.resolve('src/util'),
      '@views': utils.resolve('src/views'),
      '@store': utils.resolve('src/store'),
      '@net': utils.resolve('src/net')
    }
  },
  // 不同类型模块的处理规则，用不同的loader处理不同的文件
  module: {
    rules: [
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
      // 对所有.vue文件使用vue-loader进行编译
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      //  对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src'), utils.resolve('test'), utils.resolve('node_modules/webpack-dev-server/client')]
      },
      // 对图片资源文件使用url-loader
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 小于10K的图片转成base64编码的dataURL字符串写到代码中
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 其他的图片转移到静态资源文件夹，hash:7 代表 7 位数的 hash
        }
      },
      // 对多媒体资源文件使用url-loader
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      // 对字体资源文件使用url-loader
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
