import { constantRoutes, asyncRoutes } from '@/router'
import { getMdl } from '@/api/user'
import Layout from '@/layout'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
  const res = []
  routes.forEach(mdl => {
    const tmp = { ...mdl }
    var route = {
      name: tmp.mdlCode,
      meta: {
        title: tmp.mdlName,
        icon: tmp.picPath
      }
    }
    if (tmp.items && tmp.items.length > 0) {
      route.path = '/' + tmp.mdlCode
      if (tmp.lvl === 1) {
        route.alwaysShow = true
        route.redirect = 'noRedirect'
        route.component = Layout
      } else {
        route.redirect = 'noRedirect'
      }
      route.children = filterAsyncRoutes(tmp.items)
    } else {
      route.path = tmp.url === null ? '' : tmp.url
      route.component = asyncRoutes[tmp.mdlCode]
    }
    res.push(route)
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit, dispatch }, roles) {
    return new Promise((resolve, reject) => {
      let accessedRoutes
      getMdl({ tmlType: '001', entNo: '001' }).then(response => {
        const { result } = response
        accessedRoutes = filterAsyncRoutes(result)
        accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
