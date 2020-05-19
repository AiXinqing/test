import request from '@/utils/request'

export function getlist({ objectId, attributeId }) {
  return request({
    url: '/user/bicase/getlist',
    method: 'get',
    params: { objectId, attributeId }
  })
}
