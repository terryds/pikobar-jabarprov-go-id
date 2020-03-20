<template>
  <div
    class="call-card cursor-pointer px-4 p-5
    flex flex-row flex-wrap justify-start items-center
    rounded-lg
    lg:flex-col lg:items-start lg:p-6 bg-white
    hover:bg-green-200"
    style="box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
    @click.capture="onClick"
  >
    <div class="hidden sm:block lg:order-2 lg:w-auto inline-block flex items-center text-green-500">
      <FontAwesomeIcon
        class="mr-3 text-2xl pointer-events-none"
        :icon="icon.faPhoneAlt"
      />
      <label class="hidden text-xl lg:inline-block font-bold ml-2">
        {{ number }}
      </label>
    </div>
    <div class="pointer-events-none text-gray-900 lg:order-1 sm:ml-2 lg:ml-0 lg:mb-4">
      <label class="block text-base" v-text="title" />
      <small
        v-if="subtitle"
        class="block text-sm opacity-75"
        v-text="subtitle"
      />
      <label class="hidden sm:block lg:hidden text-xl lg:inline-block font-bold text-green-500">
        {{ number }}
      </label>
    </div>
    <label class="flex-none w-full sm:hidden text-xl font-bold text-green-500">
      {{ number }}
    </label>
    <!-- <svg
      class="absolute hidden sm:inline-block"
      style="top: 1.5rem; right: 1.5rem;"
      width="24"
      height="24"
      viewBox="0 0 24 24  "
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.3181 0H8.8636C8.48705 0 8.18178 0.305273 8.18178 0.681826C8.18178 1.05838 8.48705 1.36365 8.8636 1.36365H12.6721L5.65425 8.38154C5.38803 8.64776 5.38803 9.07948 5.65425 9.34576C5.78735 9.47886 5.96184 9.54545 6.13633 9.54545C6.31083 9.54545 6.48535 9.47886 6.61841 9.34573L13.6363 2.32787V6.13638C13.6363 6.51293 13.9416 6.8182 14.3182 6.8182C14.6947 6.8182 15 6.51293 15 6.13638V0.681826C15 0.305273 14.6947 0 14.3181 0Z" fill="#828282" />
      <path d="M11.5909 6.81816C11.2143 6.81816 10.9091 7.12344 10.9091 7.49999V13.6364H1.36362V4.09089H7.5C7.87655 4.09089 8.18183 3.78561 8.18183 3.40906C8.18183 3.03251 7.87655 2.72726 7.5 2.72726H0.681826C0.305273 2.72726 0 3.03254 0 3.40909V14.3182C0 14.6947 0.305273 15 0.681826 15H11.5909C11.9675 15 12.2728 14.6947 12.2728 14.3182V7.49999C12.2727 7.12344 11.9675 6.81816 11.5909 6.81816Z" fill="#828282" />
    </svg> -->
  </div>
</template>

<script>
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
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
        faPhoneAlt
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
    left: 0;
    background: rgba(51, 204, 84, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform-origin: 50% 50%;
    animation: ripple 1.2s ease-out infinite;
    animation-delay: 1s;
  }
}
</style>
