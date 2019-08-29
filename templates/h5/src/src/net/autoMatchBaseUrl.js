/*
 * @Author: SHJ
 * @Date: 2018-06-22 14:56:40
 * @Last Modified by: SHJ
 * @Last Modified time: 2018-11-27 16:00:27
 */

export default function autoMatchBaseUrl(prefix) {
  let baseUrl = ''
  switch (prefix) {
  case '':
    baseUrl = window.LOCAL_CONFIG.API_HOME
    break
  default:
    baseUrl = window.LOCAL_CONFIG.API_HOME
  }
  return `${baseUrl}${prefix}`
}
