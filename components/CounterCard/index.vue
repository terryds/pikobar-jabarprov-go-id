<template>
  <div
    class="p-5 flex flex-row justify-start items-center bg-white"
    style="border-radius: 1rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);">
    <figure class="mr-4">
      <slot name="icon"></slot>
    </figure>
    <section>
      <label
        class="block"
        v-text="label" />
      <h4 class="text-2xl">
        {{ count }}
        <small class="text-lg">{{ unit }}</small>
      </h4>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: '-'
    }
  }
}
</script>

<style>

</style>
