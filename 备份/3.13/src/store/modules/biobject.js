import { getroot, getsub } from '@/api/biobject'

const state = {
  resultList: [],
  objAttr: []
}

const mutations = {
  GET_RESULTLIST: (state, list) => {
    state.resultList = list
  },
  GET_ATTR: (state, objAtt) => {
    state.objAttr = objAtt
    console.log(objAtt)
  }
}

const actions = {
  getroot({ commit }) {
    return new Promise((resolve, reject) => {
      getroot().then(response => {
        const result = response.result.map(itme => ({
          ...itme,
          currentNode: 1,
          items: itme.items.map((row) => ({
            ...row,
            currentNode: 2,
            items: row.items.map((rowItem) => ({
              ...rowItem,
              currentNode: 3,
              items: [{
                name: '下级菜单',
                currentNode: 4,
                id: rowItem.objectId
              }]
            }))
          }))
        }))
        console.log(result)
        commit('GET_RESULTLIST', result)
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getsub({ commit }, padata) {
    return new Promise((resolve, reject) => {
      const { objectId } = padata
      getsub({ objectId }).then(response => {
        const { result } = response
        commit('GET_ATTR', result)
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
