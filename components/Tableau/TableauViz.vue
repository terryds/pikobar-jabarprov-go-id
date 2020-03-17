<template>
  <div class="relative overflow-hidden">
    <div id="vizContainer" />
  </div>
</template>

<script>
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
    disclaimer: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.renderTableauViz()
    })
  },
  methods: {
    renderTableauViz () {
      const placeholderDiv = document.getElementById('vizContainer')
      const options = {
        showTabs: false,
        hideToolbar: true,
        hideTabs: true
      }
      // eslint-disable-next-line
      this.viz = new tableau.Viz(placeholderDiv, this.url, options)
    }
  }
}
</script>

<style lang="scss" scoped>
/* purgecss start ignore */
.vizOverlay {
  padding-top: 100%;
  background-color: rgba(0,0,0,0.75);
  backdrop-filter: blur(10px);
}
/* purgecss end ignore */
</style>
