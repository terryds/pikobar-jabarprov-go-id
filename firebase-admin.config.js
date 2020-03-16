module.exports = {
  type: process.env.NUXT_ENV_FIREBASE_ADMIN_TYPE,
  project_id: process.env.NUXT_ENV_FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.NUXT_ENV_FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.NUXT_ENV_FIREBASE_ADMIN_PRIVATE_KEY,
  client_email: process.env.NUXT_ENV_FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.NUXT_ENV_FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.NUXT_ENV_FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.NUXT_ENV_FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.NUXT_ENV_FIREBASE_ADMIN_AUTH_PROVIDER_X509,
  client_x509_cert_url: process.env.NUXT_ENV_FIREBASE_ADMIN_CLIENT_X509
}
