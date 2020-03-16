module.exports = {
  apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
  authDomain: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NUXT_ENV_FIREBASE_DB_URL,
  projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NUXT_ENV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NUXT_ENV_FIREBASE_APP_ID,
  measurementId: process.env.NUXT_ENV_FIREBASE_MEASUREMENT_ID,
  publicVapidKey: process.env.NUXT_ENV_FIREBASE_PUBLIC_VAPID_KEY
}
