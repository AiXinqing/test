import request from '@/utils/request'

export function getImageCode() {
  return request({
    url: '/common/code/getimagecode',
    method: 'get'
  })
}
