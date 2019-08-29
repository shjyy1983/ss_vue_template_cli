/*
 * @Author: SHJ
 * @Date: 2018-06-22 10:19:17
 * @Last Modified by: SHJ
 * @Last Modified time: 2018-11-27 15:20:50
 */

/**
 * 生产模式配置文件
 */
'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('./config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin') // copy-webpack-plugin，用于将static中的静态文件复制到产品文件夹dist
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // optimize-css-assets-webpack-plugin，用于优化和最小化css资源
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // uglifyJs 混淆js插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const entries = require('./entry')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: entries,

  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  // webpack输出路径和命名规则
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[id].[chunkhash].js')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      chunkFilename: utils.assetsPath('css/[id].[contenthash].css')
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': require('./config/prod.env')
    }),
    // webpack 的 dll功能
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(path.resolve(__dirname, '../dll/manifest.json')),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),

    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
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

//  如果开启了产品gzip压缩，则利用插件将构建后的产品文件进行压缩
if (config.build.productionGzip) {
  // 一个用于压缩的webpack插件
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

// 如果启动了report，则通过插件给出webpack构建打包后的产品文件分析报告
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
