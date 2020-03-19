import axios from 'axios'

export const actions = {
  async nuxtServerInit ({ commit }) {
    await axios.get('https://coredata.jabarprov.go.id/analytics/covid19/aggregation.json')
      .then((res) => {
        commit('corona/updateAggregation', res.data)
      }).catch(() => {

      })

    await axios.get('https://coredata.jabarprov.go.id/analytics/covid19/longlat.json')
      .then((res) => {
        commit('corona/updateLongLat', res.data)
      }).catch(() => {

      })
  }
}
