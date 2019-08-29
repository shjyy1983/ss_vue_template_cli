/*
 * @Author: SHJ
 * @Date: 2018-06-25 12:42:42
 * @Last Modified by: S
 * @Last Modified time: 2019-02-10 17:26:31
 */
'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require("compression-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // uglifyJs 混淆js插件
const CleanWebpackPlugin = require('clean-webpack-plugin') // 删除文件操作
const baseWebpackConfig = require('./webpack.base.conf')

// 需要先删除 dll 文件夹
const libs = [
  'vue',
  'vue-router',
  'vuex',
  'axios'
];

// dll的名字，后带上版本，修改版本后，需要同时修改 index.html 中的 script
let dllName = 'libs_v1_0'

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    [dllName]: libs
  },
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: '[name].js',
    library: '[name]',
  },
  devtool: '#source-map',
  plugins: [
    //  删除旧的文件
    new CleanWebpackPlugin(['dll'], {
      // An absolute path for the root
      root: path.resolve(__dirname, '..'),
      // Write logs to console.
      verbose: true,
      // Use boolean "true" to test/emulate delete. (will not remove files).
      // Default: "false", remove files
      dry: false
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }),
    // 压缩zip
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]',
      path: path.resolve(__dirname, '../dll/manifest.json')
    }),
    // 包大小分析工具
    // new BundleAnalyzerPlugin(),
  ],
})
