import { Message } from 'element-ui'
import { login, logout, getInfo, usergetpage, usercreate, userdelete, userupdate } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  entNo: '',
  idntNo: '',
  entName: '',
  userList: [],
  recordCount: 0,
  pageCount: 0,
  pageSize: 20,
  pageIndex: 1,
  userloading: false
}

const mutations = {
  SET_USERLIST: (state, list) => {
    const { recordCount, pageCount, pageSize, pageIndex, datas } = list
    state.userList = datas
    state.recordCount = recordCount
    state.pageCount = pageCount
    state.pageSize = pageSize
    state.pageIndex = pageIndex
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ENTNO: (state, entNo) => {
    state.entNo = entNo
  },
  SET_ENTNAME: (state, entName) => {
    state.entName = entName
  },
  SET_USERLOADING: (state, val) => {
    state.userloading = val
  },
  SET_IDNTNO: (state, val) => {
    state.idntNo = val
  }
}
const actions = {
  usergetpage({ commit }, pdata) {
    commit('SET_USERLOADING', true)
    const { userNo, nickName, authTel, chkFlag, keyWord, pageIndex, pageSize } = pdata
    return new Promise((resolve, reject) => {
      usergetpage({ userNo: userNo, nickName: nickName, authTel: authTel, chkFlag: chkFlag, keyWord: keyWord, pageIndex: pageIndex, pageSize: pageSize }).then(response => {
        const { result } = response
        commit('SET_USERLIST', result)
        commit('SET_USERLOADING', false)
        resolve()
      }).catch(error => {
        commit('SET_USERLOADING', false)
        reject(error)
      })
    })
  },
  usercreate({ commit }, pdata) {
    const { nickName, authTel, lgnPwd } = pdata
    return new Promise((resolve, reject) => {
      usercreate({ nickName: nickName, authTel: authTel, lgnPwd: lgnPwd }).then(response => {
        const { message } = response
        Message({
          message: message !== null ? message : '添加成功',
          type: 'success',
          duration: 2 * 1000
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  userupdate({ commit }, pdata) {
    const { userNo, nickName, authTel } = pdata
    return new Promise((resolve, reject) => {
      userupdate({ userNo: userNo, nickName: nickName, authTel: authTel }).then(response => {
        const { message } = response
        Message({
          message: message !== null ? message : '修改成功',
          type: 'success',
          duration: 2 * 1000
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  userdelete({ commit }, pdata) {
    const { userNo } = pdata
    return new Promise((resolve, reject) => {
      userdelete({ userNo: userNo }).then(response => {
        const { message } = response
        Message({
          message: message !== null ? message : '删除成功',
          type: 'success',
          duration: 2 * 1000
        })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ lgnName: username.trim(), pwd: password }).then(response => {
        const { result } = response
        commit('SET_TOKEN', result.accessToken)
        setToken(result.accessToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { result } = response

        if (!result) {
          reject('当前用户无平台身份，请重新登录！')
        }

        const data = {
          roles: [],
          name: '',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          introduction: '',
          entNo: '',
          entName: ''
        }
        result.userMaps.forEach((item, i) => {
          if (item.idntNo === '010') {
            data.name = item.idntValName
            data.roles.push(item.idntNo)
            data.entNo = item.entNo
            data.idntNo = item.idntNo
            data.entName = item.entName
          }
        })
        if (!data.roles || data.roles.length <= 0) {
          reject('当前用户无平台身份，请重新登录！')
        }

        commit('SET_ROLES', data.roles)
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        commit('SET_INTRODUCTION', data.introduction)
        commit('SET_ENTNO', data.entNo)
        commit('SET_ENTNAME', data.entName)
        commit('SET_IDNTNO', data.idntNo)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
