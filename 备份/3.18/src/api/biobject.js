import request from '@/utils/request'

export function getroot(data) {
  return request({
    url: '/user/biobject/getroot',
    method: 'get'
  })
}

export function getsub(objectId) {
  return request({
    url: '/user/biobject/getsub',
    method: 'get',
    params: objectId
  })
}

