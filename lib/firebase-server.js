import * as admin from 'firebase-admin'

import SECRET from '../firebase-admin.config'
import firebaseConfig from '~/firebase.config'

const appConfig = {
  credential: admin.credential.cert(SECRET),
  databaseURL: firebaseConfig.databaseURL
}
let _app
if (!admin.apps.length) {
  _app = admin.initializeApp(appConfig)
}
const app = _app
const auth = admin.auth()
const db = admin.firestore()
const storage = admin.storage()
const { Timestamp, GeoPoint, FieldValue } = admin.firestore

export {
  app,
  auth,
  db,
  storage,
  Timestamp,
  GeoPoint,
  FieldValue
}
