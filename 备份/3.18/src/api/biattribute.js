import request from '@/utils/request'

export function getlist(objectId) {
  return request({
    url: '/user/biattribute/getlist',
    method: 'get',
    params: objectId
  })
}

