import request from '@/utils/request'

export function getQiNiuToken (params) {
  return request({
    url: '/api/qiniu/upload-token',
    method: 'get'
  })
}
