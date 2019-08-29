/*
 * @Author: SHJ
 * @Date: 2018-06-22 14:38:16
 * @Last Modified by: S
 * @Last Modified time: 2019-02-13 10:04:09
 */

import net from '@net'
const { userListAll } = net

let service = {
  getListAll() {
    return userListAll()
  }
}

export default service
