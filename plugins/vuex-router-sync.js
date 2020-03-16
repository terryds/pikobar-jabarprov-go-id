import { sync } from 'vuex-router-sync'

export default function ({ app }) {
  sync(app.store, app.router)
}
