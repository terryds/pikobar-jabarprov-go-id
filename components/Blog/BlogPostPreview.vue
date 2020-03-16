<template>
  <div>
    <header>
      <nuxt-link
        tag="a"
        :to="to"
        class="text-xl font-bold hover:underline">
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
    <section>
      <!-- eslint-disable-next-line -->
      <div class="content" v-html="truncatedContent" />
    </section>
    <div class="clearfix my-2">
      <nuxt-link
        class="float-right text-brand-blue hover:text-brand-blue-lighter font-bold"
        :to="to">
        <span class="mr-2 align-middle uppercase">
          Baca
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
