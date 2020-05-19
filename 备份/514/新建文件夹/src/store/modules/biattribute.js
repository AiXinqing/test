import { getlist } from '@/api/biattribute'

const state = {
  attrsList: []
}

const mutations = {
  GET_ATTRSLIST: (state, list) => {
    state.attrsList = list
  }
}

const actions = {
  getlist({ commit }, padata) {
    return new Promise((resolve, reject) => {
      const { objectId } = padata
      getlist({ objectId }).then(response => {
        const { result } = response
        commit('GET_ATTRSLIST', result)
        resolve(result)
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
