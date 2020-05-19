import { getChaicon } from '@/api/chaicon'

const state = {
  stuChaiconList: []
}

const mutations = {
  SET_CHAICONLIST: (state, list) => {
    state.stuChaiconList = list
  }
}

const actions = {
  getChaicon({ commit }, padata) {
    return new Promise((resolve, reject) => {
      const { attributeId, objectId } = padata
      getChaicon({ attributeId, objectId }).then(response => {
        const { result } = response
        commit('SET_CHAICONLIST', { ...result, caseId: attributeId })
        resolve({ result })
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
