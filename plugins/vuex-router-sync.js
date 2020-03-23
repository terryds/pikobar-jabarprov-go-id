import { sync } from 'vuex-router-sync'

export default function ({ app }) {
  if (!app.store.state.route) {
    sync(app.store, app.router)
  }
}
