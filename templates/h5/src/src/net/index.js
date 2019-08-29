/*
 * @Author: SHJ
 * @Date: 2018-06-22 14:56:36
 * @Last Modified by: SHJ
 * @Last Modified time: 2018-11-27 16:00:30
 */

import _Axios from './_axios'
import urls from './RESTFULLURL'

let FUNS = {}

Object.keys(urls).forEach((key) => {
  FUNS[key] = (options = {}) => {
    return _Axios(urls[key], options)
  }
})

export default FUNS
