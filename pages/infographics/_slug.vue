<template>
  <div
    class="container sm:p-5 mx-auto"
  >
    <div class="p-5 bg-white border-solid border-gray-300">
      <section>
        <template v-if="isPending">
          <ContentLoader
            :speed="2"
            width="400"
            height="200"
          >
            <rect
              x="0"
              y="0"
              rx="0"
              ry="0"
              width="100%"
              height="100%"
            />
          </ContentLoader>
        </template>
        <template v-else-if="infographic">
          <h2 class="text-xl font-bold leading-tight">
            {{ infographic.title }}
          </h2>
          <br>
          <img
            :src="infographic.images[0] || null"
            class="cursor-pointer w-full h-full object-contain object-center"
          >
        </template>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import { analytics } from '~/lib/firebase'

const regex = /(?:(-inf\.))(.*)$/
export default {
  components: {
    ContentLoader
  },
  data () {
    return {
      isPending: true,
      infographic: null
    }
  },
  computed: {
    itemId () {
      const slug = this.$route.params.slug
      if (slug) {
        const matched = regex.exec(slug)
        if (matched && matched.length) {
          return matched[2] || null
        }
      }
      return null
    }
  },
  watch: {
    itemId: {
      immediate: true,
      handler (v) {
        if (v) {
          this.isPending = true
          this.getItemById(v)
            .then((item) => {
              this.infographic = item
            })
            .then(() => {
              if (process.client || process.browser) {
                analytics.logEvent('infographic_detail_view', { id: this.$route.params.slug })
              }
            })
            .finally(() => {
              this.isPending = false
            })
        }
      }
    }
  },
  methods: {
    encodeURI (string) {
      return encodeURI(string)
    },
    getItemURL (item) {
      return `/infographics/${this.encodeURI(item.title)}-inf.${item.id}`
    },
    ...mapActions('infographics', {
      getItemById: 'getItemById'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
