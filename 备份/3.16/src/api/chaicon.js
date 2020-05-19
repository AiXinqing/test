import request from '@/utils/request'

export function getChaicon({ attributeId, objectId }) {
  return request({
    url: '/user/chaicon/get',
    method: 'get',
    params: { attributeId, objectId }
  })
}
