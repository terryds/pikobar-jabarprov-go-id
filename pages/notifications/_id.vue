<template>
  <div>
    <div class="container mx-auto">
      <div class="m-4 px-5 max-w-3xl mx-auto">
        <h3 class="text-3xl text-gray-900 font-bold text-left leading-none">
          Notifikasi
        </h3>
        <br>
      </div>

      <div class="max-w-3xl  mx-auto bg-white shadow p-4">
        <template v-if="!isPending && item">
          <div class="flex justify-start items-center block">
            <FontAwesomeIcon
              :icon="icon.faEnvelope"
              class="text-brand-green text-2xl mr-4"/>
            <div>
              <h3 class="text-lg leading-normal">
                {{ item.title }}
              </h3>
              <p class="text-base text-gray-600">
                {{ formatDateTimeShort(item.published_at) }}
              </p>
            </div>
          </div>
          <br>
          <br>
          <div
            class="text-base html-content"
            v-html="item.content" />
          <template v-if="item['action_url']">
            <div class="my-2">
              <a
                :href="item['action_url']"
                class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded"
                @click="clickAction">{{ item['action_title'] }}
              </a>
            </div>
          </template>
        </template>

        <template v-else>
          <content-loader
            :speed="2"
            primary-color="#f3f3f3"
            secondary-color="#ecebeb">
            <rect
              x="0"
              y="15"
              rx="0"
              ry="0"
              width="100%"
              height="15"/>
            <rect
              x="0"
              y="45"
              rx="0"
              ry="0"
              width="100%"
              height="75"/>
          </content-loader>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { mapActions } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import { formatDateTimeShort } from '~/lib/date'
import { analytics } from '~/lib/firebase'

export default {
  components: {
    ContentLoader
  },
  metaInfo: {
    title: 'Message Detail'
  },
  data () {
    return {
      isPending: true,
      item: null,
      icon: {
        faEnvelope
      }
    }
  },
  mounted () {
    this.isPending = true
    this.getItemById(this.$route.params.id)
      .then((notification) => {
        this.item = notification
      }).then(() => {
        if (process.browser) {
          analytics.logEvent('message_detail_view', { id: this.$route.params.id })
        }
      }).finally(() => {
        this.isPending = false
      })
  },
  methods: {
    formatDateTimeShort,
    ...mapActions('notifications', {
      getItemById: 'getItemById'
    }),

    formatContent (content) {
      return content
    },

    clickAction () {
      if (process.client || process.browser) {
        analytics.logEvent('message_detail_click_action', { id: this.item.action_url })
      }
    }
  }
}
</script>
