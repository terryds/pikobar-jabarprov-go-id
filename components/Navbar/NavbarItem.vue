<template>
  <router-link
    #default="$slotProps"
    :to="to"
    :exact="exact"
  >
    <a
      :class="['block px-2 py-1 text-center text-gray-600 hover:text-gray-700 no-underline', $slotProps.isActive && 'text-brand-blue hover:text-brand-blue']"
      :href="$slotProps.href"
      @click="$slotProps.navigate"
    >
      <slot name="icon" v-bind="$slotProps" />
      <label :class="['pointer-events-none block text-sm', $slotProps.isActive && 'font-bold']">
        {{ title }}
      </label>
    </a>
  </router-link>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
</style>
