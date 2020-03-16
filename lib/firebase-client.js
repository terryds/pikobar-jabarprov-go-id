import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'
import 'firebase/analytics'
import config from '../firebase.config'

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  firebase.firestore().enablePersistence().catch(() => {
    //
  })
}

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const analytics = firebase.analytics()
const { Timestamp, GeoPoint, FieldValue } = firebase.firestore

let _msg = null
if (firebase.messaging.isSupported()) {
  _msg = firebase.messaging()
  _msg.usePublicVapidKey(config.publicVapidKey)
}
const messaging = _msg

export default firebase
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
