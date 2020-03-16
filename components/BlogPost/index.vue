<template>
  <div>
    <header>
      <h5>
        {{ title }}
      </h5>
      <p>
        {{ subtitle }}
      </p>
    </header>
    <figure>
      <img :src="coverImage">
      <caption>
        {{ caption }}
      </caption>
    </figure>
    <section>
      <!-- eslint-disable-next-line -->
      <div class="content" v-html="truncatedContent" />
    </section>
  </div>
</template>

<script>
import _truncate from 'lodash/truncate'
export default {
  props: {
    coverImage: {
      type: String,
      default: null
    },
    coverImageCaption: {
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
    truncateLength: {
      type: [Boolean, Number],
      default: 300
    }
  },
  computed: {
    truncatedContent () {
      return _truncate(this.content, {
        length: this.truncateLength
      })
    }
  }
}
</script>

<style>

</style>
