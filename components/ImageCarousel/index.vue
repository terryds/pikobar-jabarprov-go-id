<template>
  <client-only>
    <div>
      <template v-if="!isPending">
        <VueCarousel v-bind="carouselConfig">
          <VueCarouselSlide
            v-for="(item, index) in carouselItems"
            :key="index"
            class="banner-slide">
            <img role="bg" :src="item.url">
            <img role="main" :src="item.url">
          </VueCarouselSlide>
        </VueCarousel>
      </template>
      <template v-else>
        <slot name="pending">
          <div class="bg-white">
            <content-loader
              :speed="2"
              width="400"
              height="200">
              <rect
                x="0"
                y="0"
                rx="0"
                ry="0"
                width="100%"
                height="100%" />
            </content-loader>
          </div>
        </slot>
      </template>
    </div>
  </client-only>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  name: 'ImageCarousel',
  components: {
    ContentLoader
  },
  props: {
    items: {
      type: [Array, Function, Promise],
      default: null
    }
  },
  data () {
    return {
      carouselConfig: {
        autoplay: true,
        autoplayTimeout: 4000,
        paginationEnabled: true,
        paginationColor: '#90a4ae',
        paginationActiveColor: '#00b0ff',
        paginationSize: 12,
        perPage: 1,
        mouseDrag: true,
        loop: true
      },

      isPending: true,
      error: null,
      carouselItems: null
    }
  },
  watch: {
    items: {
      immediate: true,
      handler (v) {
        let promise
        if (Array.isArray(this.items)) {
          promise = Promise.resolve(this.items)
        } else if (typeof this.items === 'function') {
          promise = this.items()
        } else if (this.items instanceof Promise) {
          promise = this.items
        } else {
          promise = Promise.resolve([])
        }
        this.isPending = true
        this.error = null
        this.carouselItems = null
        promise
          .then((carouselItems) => {
            this.carouselItems = JSON.parse(JSON.stringify(carouselItems))
          }).catch((e) => {
            this.error = e
          }).finally(() => {
            this.isPending = false
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-slide {
  // padding: 28.125%;
  padding-top: 55%;
  @apply relative flex flex-row justify-center items-center;

  @screen lg {
    padding: 0;
    height: 400px;
  }

  > img[role="bg"] {
    @supports (filter: blur(4px)) {
      filter: blur(4px) grayscale(33%) opacity(0.2);
    }
    @supports not(filter: blur(4px)) {
      opacity: 0.2;
    }
    @apply absolute inset-0 w-full h-full
    object-cover object-top;
  }

  > img[role="main"] {
    @apply absolute top-0 w-full h-full
    object-cover;

    @screen lg {
      @apply object-contain;
    }
  }
}
</style>

<style lang="scss">
// @screen sm {
//   .VueCarousel-wrapper {
//     @apply rounded-lg overflow-hidden shadow;
//   }
// }
// .VueCarousel-pagination {
//   background-color: transparent !important;
// }
// .VueCarousel-dot-container {
//   margin-top: 0 !important;
//   margin-bottom: 1rem !important;
// }
</style>
