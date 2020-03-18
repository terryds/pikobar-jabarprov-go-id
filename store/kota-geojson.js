import axios from 'axios'

export const state = () => ({
  items: null
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

export const actions = {
  async getItems ({ commit }, options) {
    const { data } = await axios.get('http://localhost:8080/')
    commit('SET_KOTA', data)
  }
}
