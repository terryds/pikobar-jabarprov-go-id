<template>
  <div
    class="cursor-pointer px-3 py-5 flex flex-row justify-start items-center bg-green-100 hover:bg-green-400"
    style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
    @click.capture="onClick">
    <FontAwesomeIcon
      class="mr-3 text-xl text-green-800 pointer-events-none"
      :icon="icon.faPhone"/>
    <div class="pointer-events-none text-green-700">
      <label class="block text-base" v-text="title" />
      <small
        v-if="subtitle"
        class="block text-sm opacity-75"
        v-text="subtitle" />
    </div>
  </div>
</template>

<script>
import { faPhone } from '@fortawesome/free-solid-svg-icons'
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
    number: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      icon: {
        faPhone
      }
    }
  },
  methods: {
    onClick () {
      window.open(`tel:${this.number}`, '_blank')
    }
  }
}
</script>

<style>

</style>
