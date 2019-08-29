/*
 * @Author: SHJ
 * @Date: 2018-06-22 14:53:57
 * @Last Modified by: SHJ
 * @Last Modified time: 2018-11-27 16:00:18
 */
/**
 * 安卓4.4.3一下的手机还是不支持Promise的,需要引入npm install babel-polyfill和npm install babel-runtime，在入口文件上加上即可
 * import 'babel-polyfill';
 */
import Qs from 'qs'
import axios from 'axios'
import autoMatchBaseUrl from './autoMatchBaseUrl'

/**
 * 基于axios ajax请求
 * @param url
 * @param method
 * @param timeout
 * @param prefix 用来拼接url地址
 * @param data
 * @param headers
 * @param dataType
 * @returns {Promise.<T>}
 * @private
 */
axios.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default function _Axios(url, {
  method = 'post',
  timeout = 10000,
  prefix = '',
  data = {},
  headers = {},
  dataType = 'json',
  extraUrl = ''
}) {
  const baseURL = autoMatchBaseUrl(prefix)

  headers = Object.assign(method === 'get' ? {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  } : {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }, headers)

  url = url + extraUrl

  const defaultConfig = {
    baseURL,
    url,
    method,
    params: data,
    data,
    timeout,
    headers,
    responseType: dataType
  }

  if (method === 'get') {
    delete defaultConfig.data
  } else {
    delete defaultConfig.params
  }
  const contentType = headers['Content-Type']

  if (typeof contentType !== 'undefined') {
    if (~contentType.indexOf('multipart')) {
      // 类型 `multipart/form-data;`
      defaultConfig.data = data
    } else if (~contentType.indexOf('json')) {
      // 类型 `application/json`
      // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
      defaultConfig.data = JSON.stringify(data)
    } else if (~contentType.indexOf('xml')) {
      // 类型 `text/xml`
      defaultConfig.data = data
    } else {
      // 类型 `application/x-www-form-urlencoded`
      // 服务器收到的raw body(原始数据) name=homeway&key=nokey
      defaultConfig.data = Qs.stringify(data)
    }
  }
  return axios(defaultConfig)
}
