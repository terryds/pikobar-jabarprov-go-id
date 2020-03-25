import { get } from '~/api/faqs'

export const state = () => ({
  items: null
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

export const actions = {
  getItems ({ state, commit }, options) {
    if (!state.items || !state.items.length) {
      return get()
        .then((faqs) => {
          commit('setItems', faqs)
          return state.items
        })
    }
    return state.items
  }
}
