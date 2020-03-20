require('dotenv').config()
export default {
  router: {
    prefetchLinks: false
  },
  generate: {
    fallback: true
  },
  server: {
    host: process.env.HOST,
    port: process.env.PORT
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'COVID-19 Jawa Barat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/stylesheet/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/service-worker.js', mode: 'client' },
    '~/plugins/vuex-router-sync.js',
    { src: '~/plugins/vue-leaflet.js', ssr: false },
    { src: '~/plugins/vue-lazyload.js', mode: 'client' },
    { src: '~/plugins/vue-carousel.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/fontawesome', {
      component: 'FontAwesomeIcon'
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-leaflet'
  ],
  pwa: {
    workbox: {
      dev: true,
      autoRegister: false,
      swURL: 'service-worker.js'
    },
    themeColor: '#399F4F',
    manifest: {
      name: 'Jabar COVID-19',
      background_color: '#399F4F',
      display: 'standalone',
      orientation: 'portrait'
    }
  },
  purgeCSS: {
    whitelistPatterns: [/(^|\.)fa-/, /-fa($|\.)/]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
