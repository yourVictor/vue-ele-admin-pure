import request from '@/utils/request'
import { requestErrorControl } from '@/utils/index'

export function dashboard (data) {
  return request({
    url: '/dashboard555',
    method: 'post',
    data
  }).catch(requestErrorControl)
}
