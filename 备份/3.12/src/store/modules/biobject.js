import { getroot, getsub } from '@/api/biobject'

const state = {
  resultList: []
}

const mutations = {
  GET_RESULTLIST: (state, list) => {
    state.resultList = list
    console.log(state.resultList)
  }
}

const actions = {
  getroot({ commit, state }) {
    return new Promise((resolve, reject) => {
      getroot().then(response => {
        const { result } = response
        commit('GET_RESULTLIST', result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getsub({ commit, state }) {
    return new Promise((resolve, reject) => {
      getsub().then(response => {
        const { result } = response
        commit('GET_RESULTLIST', result)
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
