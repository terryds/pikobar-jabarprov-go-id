import axios from 'axios'
import { formatDateTimeShort } from '~/lib/date'

export const state = () => ({
  items: [
    {
      ObjectID: 1,
      status: 'positif',
      usia: '27',
      city: 'Bandung',
      location: [-6.900778, 107.631127]
    },
    {
      ObjectID: 2,
      status: 'positif',
      usia: '27',
      city: 'Bandung',
      location: [-6.900778, 107.631127]
    },
    {
      ObjectID: 3,
      status: 'positif',
      usia: '27',
      city: 'Bandung',
      location: [-6.899239, 107.622505]
    },
    {
      ObjectID: 4,
      status: 'odp',
      usia: '27',
      city: 'Bandung',
      location: [-6.901502, 107.625906]
    },
    {
      ObjectID: 5,
      status: 'odp',
      usia: '27',
      city: 'Bandung',
      location: [-6.900890, 107.629711]
    },
    {
      ObjectID: 6,
      status: 'odp',
      usia: '27',
      city: 'Bandung',
      location: [-6.900546, 107.626841]
    },
    {
      ObjectID: 7,
      status: 'pdp',
      usia: '27',
      city: 'Bandung',
      location: [-6.901829, 107.623202]
    },
    {
      ObjectID: 8,
      status: 'pdp',
      usia: '27',
      city: 'Bandung',
      location: [-6.902319, 107.624929]
    }
  ],
  aggregation: null,
  longlat: null
})

export const getters = {
  lastUpdate (state) {
    if (!state.longlat || !state.longlat.last_update) { return '' }
    const [ymd, hms] = state.longlat.last_update.split(', ')
    const datestring = `${ymd}T${hms}`
    return formatDateTimeShort(new Date(datestring))
  }
}

export const mutations = {
  updateAggregation (state, data) {
    state.aggregation = data
  },
  updateLongLat (state, data) {
    state.longlat = data
  }
}

export const actions = {
  getAggregrationJSON ({ state, commit }) {
    return axios.get('https://coredata.jabarprov.go.id/analytics/covid19/aggregation.json')
      .then((res) => {
        commit('corona/updateAggregation', res.data)
        return state.aggregation
      })
  },
  getLongLatJSON ({ state, commit }) {
    return axios.get('https://coredata.jabarprov.go.id/analytics/covid19/longlat.json')
      .then((res) => {
        commit('corona/updateLongLat', res.data)
        return state.longlat
      })
  }
}
