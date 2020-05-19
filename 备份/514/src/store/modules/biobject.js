import { getroot, getsub } from '@/api/biobject'

const state = {
  resultList: [],
  objAttr: [],
  lastAttr: []
}

const mutations = {
  SET_RESULTLIST: (state, list) => {
    state.resultList = list
  },
  SET_ATTR: (state, objAtt) => {
    state.objAttr = objAtt
  },
  SET_LASTATTR: (state, objAtt) => {
    state.lastAttr = objAtt
  }
}

const actions = {
  getroot({ commit }) {
    return new Promise((resolve, reject) => {
      getroot().then(response => {
        const result = response.result.map(itme => ({
          ...itme,
          currentNode: 1,
          id: itme.objectId,
          items: itme.items.map((row) => ({
            ...row,
            currentNode: 2,
            id: row.objectId,
            items: row.items.map((rowItem) => ({
              ...rowItem,
              currentNode: 3,
              items: rowItem.jumper === -1 ? [] : [{
                name: '下级菜单',
                currentNode: 4,
                id: rowItem.objectId,
                jumper: rowItem.jumper,
                lves: 2
              }]
            }))
          }))
        }))
        commit('SET_RESULTLIST', result)
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
        const result = response.result.map(itme => ({
          ...itme,
          currentNode: 1,
          id: itme.objectId,
          items: itme.items.map((row) => ({
            ...row,
            currentNode: 2,
            id: row.objectId,
            items: row.items.map((rowItem) => ({
              ...rowItem,
              currentNode: 3,
              id: rowItem.objectId,
              items: rowItem.jumper === -1 ? [] : [{
                name: '下级菜单',
                currentNode: 4,
                id: rowItem.objectId,
                jumper: rowItem.jumper,
                lves: 3
              }]
            }))
          }))
        }))
        commit('SET_ATTR', result)
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getLastSub({ commit }, padata) {
    return new Promise((resolve, reject) => {
      const { objectId } = padata
      getsub({ objectId }).then(response => {
        const result = response.result.map(itme => ({
          ...itme,
          currentNode: 1,
          items: itme.items.map((row) => ({
            ...row,
            currentNode: 2,
            items: row.items.map((rowItem) => ({
              ...rowItem,
              currentNode: 3
            }))
          }))
        }))
        commit('SET_LASTATTR', result)
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
