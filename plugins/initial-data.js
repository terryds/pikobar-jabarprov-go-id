import { remoteConfig } from '~/lib/firebase-client'

export default async function ({ app }) {
  let retry = 0
  const fetch = () => {
    if (retry >= 5) {
      return
    }
    remoteConfig.fetchAndActivate()
      .then(() => {
        const selfDiagnoseURL = remoteConfig.getValue('selfdiagnose_url')._value
        app.store.commit('corona/setSelfDiagnoreURL', selfDiagnoseURL)
      }).catch((e) => {
        retry += 1
        fetch()
      })
  }
  remoteConfig.activate()
    .then((isActivated) => {
      if (!isActivated) {
        fetch()
      }
    })
  await Promise.all([
    app.store.dispatch('statistics/getCases'),
    app.store.dispatch('statistics/getCases'),
    app.store.dispatch('corona/getAggregationJSON'),
    app.store.dispatch('corona/getLongLatJSON'),
    app.store.dispatch('hospitals/getItems')
  ])
  await Promise.all([
    app.store.dispatch('banners/getItems'),
    app.store.dispatch('news/getItems'),
    app.store.dispatch('infographics/getItems')
  ])
}
