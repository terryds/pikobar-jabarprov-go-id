<template>
  <div class="messages">
    <div class="container mx-auto">
      <div class="w-full lg:flex px-4 mb-4 mt-4">
        <p class="text-leading text-grey-darker">
          Notifications
        </p>
      </div>

      <div class="bg-white shadow p-4">
        <template v-if="!isPending && item">
          <div class="flex">
            <div class="flex items-center block mx-auto mr-4">
              <i class="fas fa-envelope text-brand-green text-lg" />
            </div>
            <div class="text-left flex-grow">
              <p class="text-sm leading-normal">
                {{ item['title'] }}
              </p>
              <p class="text-sm text-gray-600">
                {{ formatDateTimeShort(item['published_at']) }}
              </p>
            </div>
          </div>

          <div class="text-sm leading-normal mt-5 body-content" v-html="formatContent(item['content'])" />

          <template v-if="item['action_url']">
            <div class="my-2">
              <a :href="item['action_url']" class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded" @click="clickAction">{{ item['action_title'] }}</a>
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
import { mapActions } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import { formatDateTimeShort } from '~/lib/date'
// import { analytics } from '@/lib/firebase'

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
      item: null
    }
  },
  mounted () {
    this.isPending = true
    this.getItemById(this.$route.params.id)
      .then((notification) => {
        this.item = notification
      })
      .finally(() => {
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

    }
  }
}
</script>
