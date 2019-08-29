/*
 * @Author: SHEN
 * @Date: 2019-08-28 12:04:11
 * @Last Modified by: SHEN
 * @Last Modified time: 2019-08-28 12:54:49
 *
 * 从 meta.js | meta.json 中获取配置信息
 */
const path = require('path')

module.exports = function getOptions(projPathName) {
  const metaPath = path.join(projPathName, 'meta.js')
  const options = require(metaPath)
  return options
}
