import {
  getCharts,
  getList
} from '@/api/chachart'

const state = {
  analysisCharts: [],
  titleList: []
}

const mutations = {
  ADD_ANALYSISCHARTS: (state, analysisChart) => {
    const oldAnalysisId = state.analysisCharts
    if (oldAnalysisId >= 0) {
      state.analysisCharts.splice(oldAnalysisId, 1, analysisChart)
    } else {
      state.analysisCharts.push(analysisChart)
    }
  },
  SET_TITLELIST: (state, list) => {
    state.titleList = list
  }
}

const actions = {
  async getCharts({ commit }, padata) {
    return getCharts(padata)
      .then(({ result }) => {
        commit('ADD_ANALYSISCHARTS', {
          ...result,
          chartOrder: padata.chartOrder
        })
      })
  },
  getList({ commit }, padata) {
    return new Promise((resolve, reject) => {
      getList(padata).then(response => {
        const { result } = response
        commit('SET_TITLELIST', result)
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
