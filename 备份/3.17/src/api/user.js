import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/common/user/login',
    method: 'post',
    data: { data }
  })
}

export function getInfo() {
  return request({
    url: '/user/user/get',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/common/user/logout',
    method: 'post'
  })
}
