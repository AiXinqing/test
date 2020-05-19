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

export function getMdl(data) {
  return request({
    url: '/user/mdl/get',
    method: 'get',
    params: data
  })
}

export function logout() {
  return request({
    url: '/common/user/logout',
    method: 'post'
  })
}
export function usergetpage(data) {
  return request({
    url: '/ecb/user/getpage',
    method: 'get',
    params: data
  })
}
export function usercreate(data) {
  return request({
    url: '/ecb/user/create',
    method: 'post',
    data: { data }
  })
}
export function userupdate(data) {
  return request({
    url: '/ecb/user/update',
    method: 'post',
    data: { data }
  })
}
export function userdelete(data) {
  return request({
    url: '/ecb/user/delete',
    method: 'post',
    data: { data }
  })
}
