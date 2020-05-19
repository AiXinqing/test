import request from '@/utils/request'

export function getCharts({ attributeId, objectId, chartOrder, caseSelectids }) {
  return request({
    url: '/user/chachart/get',
    method: 'get',
    params: { attributeId, objectId, chartOrder, caseSelectids }
  })
}
export function getList({ attributeId }) {
  return request({
    url: '/user/chachart/getlist',
    method: 'get',
    params: { attributeId }
  })
}
