export default async function ({ app }) {
  await Promise.all([
    app.store.dispatch('remote-config/getConfig'),
    app.store.dispatch('statistics/getCases'),
    app.store.dispatch('hospitals/getItems')
  ])
  await Promise.all([
    app.store.dispatch('banners/getItems'),
    app.store.dispatch('news/getItems'),
    app.store.dispatch('infographics/getItems')
  ])
}
