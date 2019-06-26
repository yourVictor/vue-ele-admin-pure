import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/account/login',
    method: 'post',
    data
  })
}
