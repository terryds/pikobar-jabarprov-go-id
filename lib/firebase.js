let firebase
if (process.server) {
  firebase = require('./firebase-server')
} else if (process.client || process.browser) {
  firebase = require('./firebase-client')
}

const {
  auth,
  db,
  storage,
  analytics,
  messaging,
  Timestamp,
  GeoPoint,
  FieldValue
} = firebase

export {
  auth,
  db,
  storage,
  analytics,
  messaging,
  Timestamp,
  GeoPoint,
  FieldValue
}
