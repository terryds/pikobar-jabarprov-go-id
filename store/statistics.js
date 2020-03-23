import { getCases } from '~/api/statistics'

export const state = () => ({
  cases: null
})

export const mutations = {
  setCasesData (state, cases) {
    state.cases = cases
  }
}

export const actions = {
  getCases ({ state, commit }) {
    if (!state.cases) {
      return getCases()
        .then((cases) => {
          commit('setCasesData', cases)
          return state.cases
        })
    }
    return state.cases
  }
}
