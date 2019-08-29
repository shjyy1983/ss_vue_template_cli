/*
 * @Author: SHJ
 * @Date: 2018-06-22 10:14:37
 * @Last Modified by: SHJ
 * @Last Modified time: 2018-11-27 15:20:41
 */

/**
 * 开发环境配置文件
 */
'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config') // 基本配置的参数
const merge = require('webpack-merge') // webpack-merge是一个可以合并数组和对象的插件
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf') // webpack基本配置文件（开发和生产环境公用部分）
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // html-webpack-plugin用于将webpack编译打包后的产品文件注入到html模板中， 即在index.html里面加上<link>和<script>标签引用webpack打包后的文件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
const portfinder = require('portfinder') // 自动检索下一个可用端口
const entries = require('./entry')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT) // 读取系统环境变量的port

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  // webpack的入口文件
  entry: entries,
  // webpack输出路径和命名规则
  output: {
    chunkFilename: utils.assetsPath('js/[name].[id].js')
  },

  module: {
    // 对一些独立的css文件以及它的预处理文件做一个编译
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  // webpack-dev-server服务器配置
  devServer: {
    clientLogLevel: 'warning', // console 控制台显示的消息，可能的值有 none, error, warning 或者 info
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true, // 开启热模块加载
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable, // 代理设置
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: { //  启用 Watch 模式。这意味着在初始构建之后，webpack 将继续监听任何已解析文件的更改
      poll: config.dev.poll, // 通过传递 true 开启 polling，或者指定毫秒为单位进行轮询。默认为false
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('./config/dev.env')
    }),
    /* 模块热替换它允许在运行时更新各种模块，而无需进行完全刷新 */
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(), // 跳过编译时出错的代码并记录下来，主要作用是使编译后运行时的包不出错

    // webpack 的 dll功能
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(path.resolve(__dirname, '../dll/manifest.json')),
    }),

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html', // 指定编译后生成的html文件名
      template: 'index.html', // 需要处理的模板
      // 打包过程中输出的js、css的路径添加到html文件中
      // css文件插入到head中
      // js文件插入到body中，可能的选项有 true, 'head', 'body', false
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../src/config.js'),
        to: 'config.js'
      },
      {
        from: path.resolve(__dirname, '../dll/libs*.*'),
        to: './static'
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
