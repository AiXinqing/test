import { getChaicon } from '@/api/chaicon'

const state = {
  chaiconList: [],
  tableLoading: false
}

const mutations = {
  GET_CHAICONLIST: (state, list) => {
    state.tableList = list
  },
  GET_TABLELOADING: (state, pageSize) => {
    state.tableLoading = pageSize
  }
}

const actions = {
  getChaicon({ commit }, padata) {
    return new Promise((resolve, reject) => {
      const { attributeId, objectId } = padata
      getChaicon({ attributeId, objectId }).then(response => {
        const { result } = response
        commit('GET_CHAICONLIST', result)
        commit('GET_TABLELOADING', false)
        resolve({ result })
      }).catch(error => {
        commit('GET_TABLELOADING', true)
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
