import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
  observer: 'IntersectionObserver' in window,
  preLoad: 1.3,
  error: 'logo.jpg',
  loading: 'logo.jpg',
  attempt: 1
})
