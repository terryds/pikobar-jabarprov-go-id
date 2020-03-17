import { get } from '~/api/live-updates'

export const state = () => ({
  items: []
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

export const actions = {
  getItems ({ commit }, options) {
    return get(options)
      .then((items) => {
        commit('setItems', items)
      })
  }
}
