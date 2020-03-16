<template>
  <header class="bg-white border-b border-solid border-gray-300">
    <div class="container mx-auto p-4">
      <a
        v-if="canGoBack"
        tag="a"
        class="cursor-pointer flex items-center"
        href="javascript:void(0)"
        @click.prevent="onGoBack">
        <FontAwesomeIcon :icon="icon.faChevronLeft" />
        <div class="text-left px-4">
          <p class="text-lg">
            Kembali
          </p>
        </div>
      </a>
      <div
        v-else
        class="flex items-center">
        <nuxt-link to="/">
          <img class="block h-10 mx-auto mr-4" src="logo.jpg" alt>
        </nuxt-link>
        <nuxt-link to="/">
          <div class="text-left">
            <p class="text-base">
              Pusat Informasi &amp; Koordinasi COVID-19
            </p>
            <p class="text-sm text-gray-700">
              Provinsi Jawa Barat
            </p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
export default {
  data () {
    return {
      icon: {
        faChevronLeft
      }
    }
  },
  computed: {
    canGoBack () {
      return this.$route.path !== '/'
    },
    pathToGoBack () {
      return this.$store.state.route.from.path
    }
  },
  methods: {
    onGoBack () {
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
