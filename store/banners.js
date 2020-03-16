import { get, getById } from '~/api/banner'

export const state = () => ({
  items: []
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  clearItems (state) {
    state.items = []
  },
  appendItems (state, items) {
    state.items = [...state.items, ...items]
  },
  prependItems (state, items) {
    state.items = [...items, ...state.items]
  }
}

export const actions = {
  getItems ({ commit }, options) {
    return get(options)
      .then((arr) => {
        commit('setItems', arr)
      })
  },
  getItemById ({ commit }, id) {
    return getById(id)
  }
}
