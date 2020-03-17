<template>
  <div
    class="call-card cursor-pointer px-3 py-5 flex flex-row justify-start items-center bg-white hover:bg-green-200"
    style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
    @click.capture="onClick"
  >
    <FontAwesomeIcon
      class="mr-3 text-xl text-green-900 pointer-events-none"
      :icon="icon.faPhone"
    />
    <div class="pointer-events-none text-green-700">
      <label class="block text-base" v-text="title" />
      <small
        v-if="subtitle"
        class="block text-sm opacity-75"
        v-text="subtitle"
      />
    </div>
  </div>
</template>

<script>
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { analytics } from '~/lib/firebase'

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
    },
    logOnClick: {
      type: Boolean,
      default: false
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
      if ((process.client || process.browser) && this.logOnClick) {
        analytics.logEvent('click_call_action', {
          to: this.number
        })
      }
      window.open(`tel:${this.number}`, '_blank')
    }
  }
}
</script>

<style lang="scss">
@keyframes ripple {
  0%, 35% {
    transform: scale(0);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: scale(4);
  }
}

.call-card {
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    mix-blend-mode: screen;
    position: absolute;
    width: 4rem;
    height: 4rem;
    left: -1rem;
    background: rgba(51, 204, 84, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform-origin: 50% 50%;
    animation: ripple 1.2s ease-out infinite;
    animation-delay: 1s;
  }
}
</style>
