import { getpage } from '@/api/tab'

const state = {
  tableList: [],
  tablecolumn: [],
  recordCount: 0,
  pageCount: 0,
  pageIndex: 1,
  pageSize: 20,
  tableLoading: false
}

const mutations = {
  GET_TABLELIST: (state, list) => {
    state.tableList = list
  },
  GET_TABLECOLUMN: (state, list) => {
    state.tablecolumn = list
  },
  GET_RECORDCOUNT: (state, recordCount) => {
    state.recordCount = recordCount
  },
  GET_PAGECOUNT: (state, pageCount) => {
    state.pageCount = pageCount
  },
  GET_PAGEINDEX: (state, pageIndex) => {
    state.pageIndex = pageIndex
  },
  GET_PAGESIZE: (state, pageSize) => {
    state.pageSize = pageSize
  },
  GET_TABLELOADING: (state, pageSize) => {
    state.tableLoading = pageSize
  }
}

const actions = {
  getpage({ commit }, padata) {
    return new Promise((resolve, reject) => {
      const { attributeId, objectId, cases, pageIndex, pageSize } = padata
      getpage({ attributeId, objectId, cases, pageIndex, pageSize }).then(response => {
        const { result, columns } = response
        const columnsList = columns.map((item, i) => ({
          label: item.name,
          minWidth: item.width,
          prop: 'tab' + i
        }))
        const Arr = []
        result.datas.forEach((element) => {
          const obj = {}
          for (var key in element.itemArray) {
            obj['tab' + key] = element.itemArray[key]
          }

          Arr.push(obj)
        })
        commit('GET_TABLELIST', Arr)
        commit('GET_TABLECOLUMN', columnsList)
        commit('GET_RECORDCOUNT', result.recordCount)
        commit('GET_PAGECOUNT', result.pageCount)
        commit('GET_PAGEINDEX', result.pageIndex)
        commit('GET_PAGESIZE', result.pageSize)
        commit('GET_TABLELOADING', false)
        resolve({ result, columnsList })
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
