import {
  getCharts
} from '@/api/chachart'

const state = {
  categoryList: [],
  regionList: [],
  popComparisonList: [],
  pieList: [],
  pieTwoList: []
}

const mutations = {
  SET_CATEGORYLIST: (state, list) => {
    state.categoryList = list
  },
  SET_REGIONLIST: (state, list) => {
    state.regionList = list
  },
  SET_POPCOMPARISON: (state, list) => {
    state.popComparisonList = list
  },
  SET_PIELIST: (state, list) => {
    state.pieList = list
  },
  SET_PIETWOLIST: (state, list) => {
    state.pieTwoList = list
  }
}

const actions = {
  getCharts({ commit }, padata) {
    return new Promise((resolve, reject) => {
      getCharts(padata).then(({ result }) => {
        switch (padata.chartOrder) {
          case 5:
            commit('SET_CATEGORYLIST', {
              ...result,
              caseId: padata.attributeId
            })
            break
          case 4:
            commit('SET_REGIONLIST', {
              ...result,
              caseId: padata.attributeId
            })
            break
          case 3:
            commit('SET_POPCOMPARISON', {
              ...result,
              caseId: padata.attributeId
            })
            break
          case 2:
            commit('SET_PIELIST', {
              ...result,
              caseId: padata.attributeId
            })
            break
          default:
            commit('SET_PIETWOLIST', {
              ...result,
              caseId: padata.attributeId
            })
        }
        resolve({
          result
        })
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
