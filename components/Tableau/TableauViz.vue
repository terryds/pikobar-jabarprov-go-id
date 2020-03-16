<template>
  <div id="vizContainer" />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  mounted () {
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
</script>

<style>

</style>
