import { getlist } from '@/api/bicase'

const state = {
  bicaseList: []
}

const mutations = {
  GET_BICASELIST: (state, list) => {
    state.bicaseList = list
    console.log(list)
  },
  GET_ATTR: (state, objAtt) => {
    state.objAttr = objAtt
    console.log(objAtt)
  }
}

const actions = {
  getlist({ commit }, padata) {
    return new Promise((resolve, reject) => {
      const { objectId, attributeId } = padata
      getlist({ objectId, attributeId }).then(response => {
        const { result } = response
        commit('GET_BICASELIST', result)
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
