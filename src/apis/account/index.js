import request from '@/utils/request'
import { requestErrorControl } from '@/utils/index'

export function login (data) {
  return request({
    url: '/account/login',
    method: 'post',
    data
  }).catch(requestErrorControl)
}
