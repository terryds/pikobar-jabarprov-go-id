import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'
import 'firebase/analytics'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
    authDomain: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NUXT_ENV_FIREBASE_DB_URL,
    projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NUXT_ENV_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NUXT_ENV_FIREBASE_APP_ID,
    measurementId: process.env.NUXT_ENV_FIREBASE_MEASUREMENT_ID,
    publicVapidKey: process.env.NUXT_ENV_FIREBASE_PUBLIC_VAPID_KEY
  })
  firebase.firestore().enablePersistence().catch(() => {
    //
  })
}

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const analytics = firebase.analytics()
const { Timestamp, GeoPoint, FieldValue } = firebase.firestore

export default firebase
export {
  auth,
  db,
  storage,
  analytics,
  Timestamp,
  GeoPoint,
  FieldValue
}
