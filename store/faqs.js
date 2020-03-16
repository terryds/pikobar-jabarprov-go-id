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
  getItems ({ commit }, options) {
    return get()
      .then((faqs) => {
        commit('setItems', faqs)
      })
  }
}
