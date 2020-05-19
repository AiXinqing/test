import { getChaicon } from '@/api/chaicon'

const state = {
  attributes: []
}

const mutations = {
  ADD_ATTRIBUTE: (state, attribute) => {
    const oldAttrIndex = state.attributes
      .findIndex(item => item.caseId === attribute.caseId)
    if (oldAttrIndex >= 0) {
      state.attributes.splice(oldAttrIndex, 1, attribute)
    } else {
      state.attributes.push(attribute)
    }
  }
}

const actions = {
  async getChaicon({ commit }, padata) {
    return getChaicon(padata)
      .then(({ result }) => {
        commit('ADD_ATTRIBUTE', {
          ...result,
          caseId: padata.attributeId
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
