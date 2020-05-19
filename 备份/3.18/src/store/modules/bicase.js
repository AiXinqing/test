import { getlist } from '@/api/bicase'

const state = {
  bicaseList: []
}

const mutations = {
  GET_BICASELIST: (state, list) => {
    state.bicaseList = list
  },
  GET_ATTR: (state, objAtt) => {
    state.objAttr = objAtt
  }
}

const actions = {
  getlist({ commit }, padata) {
    return new Promise((resolve, reject) => {
      const { objectId, attributeId } = padata
      getlist({ objectId, attributeId }).then(response => {
        const result = response.result.map(itme => ({
          ...itme,
          caseSelects: itme.caseSelects.map(row => ({
            ...row,
            caseId: itme.caseId
          }))
        }))
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
