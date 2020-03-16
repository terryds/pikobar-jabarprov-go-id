<template>
  <div class="relative" style="top: -2px;">
    <div class="bg-white border-b border-solid border-gray-300">
      <div class="container mx-auto max-w-3xl">
        <ul class="h-20 flex flex-row justify-center items-end">
          <li class="flex-1 px-4">
            <button
              :class="['relative w-full focus:outline-none', currentTab === 'live' && 'text-brand-green-light font-bold']"
              @click="currentTab = 'live'">
              <span class="inline-block align-middle w-3 h-3 rounded-full bg-brand-green mb-4 mr-2" />
              <span class="inline-block align-middle mb-4">
                Live Updates
              </span>
              <br>
              <i v-if="currentTab === 'live'" class="absolute bottom-0 block w-full h-1 bg-brand-green"/>
            </button>
          </li>
          <li class="flex-1 px-4">
            <button
              :class="['relative w-full focus:outline-none', currentTab === 'press' && 'text-brand-green-light font-bold']"
              @click="currentTab = 'press'">
              <span class="block mb-4">
                Rilis Pers
              </span>
              <i v-if="currentTab === 'press'" class="absolute bottom-0 block w-full h-1 bg-brand-green"/>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <br>
    <div
      v-show="currentTab === 'live'"
      class="container mx-4 p-5 max-w-3xl mx-auto">
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none">
        Live Updates
      </h3>
      <br>
    </div>
    <div
      v-show="currentTab === 'press'"
      class="container mx-4 p-5 max-w-3xl mx-auto">
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none">
        Rilis Pers
      </h3>
      <br>
      <div>
        <template v-if="items === null">
          <div
            v-for="i in 6"
            :key="i"
            class="mb-8 rounded-lg p-6 bg-white">
            <ContentLoader
              :width="320"
              :height="60"
              :speed="3"
              primary-color="#eee"
              secondary-color="#fafafa">
              <rect
                x="0"
                y="0"
                width="33%"
                height="10"
                rx="5"
                ry="5" />
              <rect
                x="0"
                y="16"
                width="100%"
                height="10"
                rx="5"
                ry="5" />
              <rect
                x="0"
                y="32"
                width="100%"
                height="10"
                rx="5"
                ry="5" />
              <rect
                x="0"
                y="48"
                width="100%"
                height="10"
                rx="5"
                ry="5" />
            </ContentLoader>
          </div>
        </template>
        <template v-if="items && items.length">
          <BlogPostPreview
            v-for="item in items"
            :key="item.id"
            :title="item.title"
            :content="item.content"
            :to="`/articles/${item.id}`"
            :date="formatDateTimeShort(item.published_at)"
            class="bg-white rounded-lg mb-8 p-6 shadow-lg"/>
        </template>
        <template v-if="isLoadingMore">
          <div class="mb-8 rounded-lg p-6 bg-white">
            <ContentLoader
              :width="320"
              :height="60"
              :speed="3"
              primary-color="#eee"
              secondary-color="#fafafa">
              <rect
                x="0"
                y="0"
                width="33%"
                height="10"
                rx="5"
                ry="5"/>
              <rect
                x="0"
                y="16"
                width="100%"
                height="10"
                rx="5"
                ry="5"/>
              <rect
                x="0"
                y="32"
                width="100%"
                height="10"
                rx="5"
                ry="5"/>
              <rect
                x="0"
                y="48"
                width="100%"
                height="10"
                rx="5"
                ry="5" />
            </ContentLoader>
          </div>
        </template>
        <template v-if="!isLoadingMore && !hasReachedEnd">
          <button
            class="w-full px-6 py-2 rounded-lg bg-brand-blue hover:bg-blue-400 text-white font-bold uppercase tracking-wider"
            @click="onLoadMore">
            Load More
          </button>
        </template>
        <template v-if="!isLoadingMore && hasReachedEnd">
          <button
            class="cursor-not-allowed w-full px-6 py-2 rounded-lg bg-gray-400 text-white font-bold uppercase tracking-wider"
            disabled
            @click="onLoadMore">
            Tidak ada berita lainnya
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { db } from '~/lib/firebase'
import { formatDateTimeShort } from '~/lib/date'
// import { mapState, mapGetters, mapActions } from 'vuex'

import BlogPostPreview from '~/components/Blog/BlogPostPreview'

export default {
  components: {
    ContentLoader,
    BlogPostPreview
  },
  data () {
    return {
      isLoadingMore: false,
      hasReachedEnd: false,
      items: null,
      lastDocumentSnapshot: null,
      currentPage: 0,
      perPage: 5
    }
  },
  computed: {
    currentTab: {
      get () {
        return this.$route.query.tab || 'press'
      },
      set (tab) {
        if (tab === this.$route.query.tab) {
          return
        }
        this.$router.replace({
          path: this.$route.path,
          query: {
            tab
          }
        })
      }
    }
  },
  mounted () {
    this.fetchItems(false)
  },
  methods: {
    formatDateTimeShort,
    onLoadMore () {
      this.isLoadingMore = true
      this.fetchItems(true)
        .then(() => {
          this.isLoadingMore = false
        })
    },
    fetchItems (append = true) {
      if (!append) {
        this.items = null
      }
      let querySnapshot = db
        .collection('articles')
        .orderBy('published_at', 'desc')
        .limit(this.perPage)
      if (this.lastDocumentSnapshot) {
        querySnapshot = querySnapshot.startAfter(this.lastDocumentSnapshot)
      }
      return querySnapshot
        .get()
        .then((snapshot) => {
          const docs = []
          if (!snapshot.empty) {
            this.lastDocumentSnapshot = snapshot.docs[snapshot.docs.length - 1]
            snapshot.docs.forEach((doc) => {
              const data = doc.data()
              docs.push({
                ...data,
                id: doc.id,
                published_at: data.published_at.toDate()
              })
            })
          }
          return docs
        }).then((docs) => {
          if (append) {
            this.items = this.items ? [...this.items, ...docs] : [...docs]
          } else {
            this.items = docs
          }
          if (!docs.length) {
            this.hasReachedEnd = true
          }
        }).catch((e) => {
          return null
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!['live', 'press'].includes(to.query.tab)) {
      next({
        path: to.path,
        query: {
          tab: 'press'
        }
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
.faq-list {
  &__item {
    > header::before {
      align-self: flex-start;
      content: '-';
      @apply mr-4;
    }
  }
}
</style>
