<template>
  <dialog
    class="fixed top-0 left-0 w-screen h-24 bg-brand-yellow-darkest"
    :open="show">
    <!--  -->
  </dialog>
</template>

<script>
export default {
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
</style>
