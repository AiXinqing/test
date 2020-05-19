import { getlist } from '@/api/bicase'

const state = {
  bicaseList: []
}

const mutations = {
  SET_BICASELIST: (state, list) => {
    state.bicaseList = list
  },
  SET_ATTR: (state, objAtt) => {
    state.objAttr = objAtt
  }
}

const actions = {
  getlist({ commit }, padata) {
    return getlist(padata).then(({ result }) => {
      commit('SET_BICASELIST', result)
      return result
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
