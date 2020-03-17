<template>
  <div>
    <div class="md:flex flex-row justify-start items-start">
      <section class="w-full">
        <div class="flex flex-col items-start sm:justify-between sm:items-center sm:flex-row">
          <div>
            <span class="inline-block px-3 leading-normal border border-solid border-green-300 bg-green-200 text-green-700 rounded">Nasional</span>
          </div>
          <span class="mt-2 sm:mt-0 float-left opacity-50">
            {{ date }}
          </span>
        </div>
        <br>
        <header>
          <nuxt-link
            tag="a"
            :to="to"
            class="text-lg font-bold hover:underline"
          >
            {{ title }}
          </nuxt-link>
          <p class="text-base">
            {{ subtitle }}
          </p>
        </header>
      </section>
      <!-- <img
        v-if="image"
        class="hidden md:block w-1/3 self-stretch rounded-lg overflow-hidden object-cover object-center flex-none"
        :src="image"
      > -->
    </div>
    <div class="clearfix my-2">
      <nuxt-link
        class="float-left md:float-left md:mt-4 text-brand-blue hover:text-brand-blue-lighter font-bold"
        :to="to"
      >
        <span class="mr-2 align-middle">
          Baca Selanjutnya: {{ to }}
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    },
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
