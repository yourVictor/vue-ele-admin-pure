import request from '@/utils/request'

export function dashboard(data) {
  return request({
    url: '/dashboard',
    method: 'post',
    data
  })
}
