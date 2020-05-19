import request from '@/utils/request'

export function getpage({ attributeId, objectId, cases, pageIndex, pageSize }) {
  return request({
    url: '/user/tab/getpage',
    method: 'get',
    params: { attributeId, objectId, cases, pageIndex, pageSize }
  })
}
