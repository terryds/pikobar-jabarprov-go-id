<template>
  <div class="container mx-auto">
    <div class="container mx-4 p-5 max-w-3xl mx-auto">
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none">
        Pertanyaan yang Sering Ditanyakan
      </h3>
      <br>
      <div v-show="!items">
        <div
          v-for="i in 6"
          :key="i"
          class="mb-4 rounded-lg p-4 bg-white"
        >
          <ContentLoader
            :width="320"
            :height="32"
            :speed="3"
            primary-color="#eee"
            secondary-color="#fafafa"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="4"
              ry="4"
            />
          </ContentLoader>
        </div>
      </div>
      <div v-show="items && items.length > 0">
        <ul class="faq-list my-4">
          <li
            v-for="(faq, index) in items"
            :key="index"
            class="faq-list__item mb-4 rounded-lg overflow-hidden"
          >
            <header
              class="cursor-pointer relative flex justify-start items-center p-4 pr-16 text-white text-lg font-bold bg-brand-blue shadow-lg clearfix"
              @click.capture="toggleItem(index)"
            >
              <span>
                {{ faq.title }}
              </span>
              <button
                class="appearance-none text-white absolute"
                style="right: 2rem;"
              >
                <FontAwesomeIcon :icon="isItemOpen(index) ? icon.faChevronUp : icon.faChevronDown" />
              </button>
            </header>
            <main
              v-show="isItemOpen(index)"
              class="html-content p-4 md:p-8 text-base bg-white"
              v-html="faq.content"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { analytics } from '~/lib/firebase'

export default {
  components: {
    ContentLoader
  },
  data () {
    return {
      openedItems: [],
      icon: {
        faChevronUp,
        faChevronDown
      }
    }
  },
  computed: {
    ...mapState('faqs', {
      items: 'items'
    })
  },
  mounted () {
    this.getItems()
      .then(() => {
        if (process.browser) {
          analytics.logEvent('faqs_view')
        }
      })
  },
  methods: {
    ...mapActions('faqs', {
      getItems: 'getItems'
    }),
    isItemOpen (index) {
      return this.openedItems.includes(index)
    },
    openItem (index) {
      this.openedItems.push(index)
    },
    closeItem (index) {
      this.openedItems = this.openedItems.filter(x => x !== index)
    },
    toggleItem (index) {
      if (this.isItemOpen(index)) {
        this.closeItem(index)
      } else {
        this.openItem(index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.faq-list {
  counter-reset: faq-number 0;
  &__item {
    counter-increment: faq-number 1;
    > header::before {
      align-self: flex-start;
      content: counter(faq-number) '.';
      @apply mr-4;
    }
  }
}
</style>
