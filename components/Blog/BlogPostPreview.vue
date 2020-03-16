<template>
  <div>
    <div class="md:flex flex-row justify-start items-start">
      <section class="md:w-2/3 flex-shrink flex-grow-0 mr-6">
        <header>
          <nuxt-link
            tag="a"
            :to="to"
            class="text-lg font-bold hover:underline">
            {{ title }}
          </nuxt-link>
          <p class="text-base">
            {{ subtitle }}
          </p>
        </header>
        <p class="opacity-75">
          {{ date }}
        </p>
        <br>
        <!-- eslint-disable-next-line -->
        <div class="content flex-1" v-html="truncatedContent" />
      </section>
      <img
        v-if="image"
        class="hidden md:block w-1/3 self-stretch rounded-lg overflow-hidden object-cover object-center flex-none"
        :src="image">
    </div>
    <div class="clearfix my-2">
      <nuxt-link
        class="float-right md:float-left md:mt-4 text-brand-blue hover:text-brand-blue-lighter font-bold"
        :to="to">
        <span class="mr-2 align-middle uppercase">
          Selengkapnya
        </span>
        <FontAwesomeIcon class="align-middle" :icon="icon.faChevronRight" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
export default {
  props: {
    image: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: '#'
    }
  },
  data () {
    return {
      icon: {
        faChevronRight
      }
    }
  },
  computed: {
    truncatedContent () {
      if (typeof this.content === 'string') {
        return this.content.slice(0, this.content.indexOf('.') + 1)
      }
      return ''
    }
  }
}
</script>

<style>

</style>
