<template>
  <header class="bg-white border-b border-solid border-gray-300">
    <div v-if="showPopupNotification" class="bg-brand-yellow-darkest">
      <div class="container mx-auto">
        <div class="flex flex-wrap px-6 py-4">
          <div class="text-sm w-full">
            Izinkan notifikasi mengirim pesan
            <button class="ml-2 bg-brand-blue text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="allowNotification">
              Allow
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto p-4">
      <a
        v-if="canGoBack"
        tag="a"
        class="cursor-pointer flex items-center"
        href="javascript:void(0)"
        @click.prevent="onGoBack"
      >
        <FontAwesomeIcon :icon="icon.faChevronLeft" />
        <div class="text-left px-4">
          <p class="text-lg">
            Kembali
          </p>
        </div>
      </a>
      <div
        v-else
        class="flex items-center"
      >
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
import { db, messaging, FieldValue } from '~/lib/firebase'
export default {
  data () {
    return {
      icon: {
        faChevronLeft
      },
      showPopupNotification: true
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
  mounted () {
    this.checkPermission()
  },
  methods: {
    onGoBack () {
      this.$router.back()
    },
    async checkPermission () {
      if (!messaging) {
        return
      }

      const permission = Notification.permission

      if (permission === 'default') {
        this.showPopupNotification = true
      }

      if (permission === 'granted') {
        const token = await messaging.getToken()

        this.saveToken(token)
      }
    },
    allowNotification () {
      if (!messaging) {
        return
      }
      Notification.requestPermission(async (permission) => {
        if (permission === 'granted') {
          const token = await messaging.getToken()
          this.saveToken(token)
        }
        messaging.onTokenRefresh(async () => {
          const token = await messaging.getToken()

          this.saveToken(token)
        })
        this.showPopupNotification = false
      })
    },
    async saveToken (token) {
      const tokenRef = await db.collection('tokens').doc(token)
      const record = await tokenRef.get()

      if (record.exists === false) {
        tokenRef.set({
          token,
          createdAt: FieldValue.serverTimestamp()
        })
      }
    }
  }
}
</script>

<style>

</style>
