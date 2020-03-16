<template>
  <div class="w-full bg-gray-100">
    <Appbar />
    <div
      class="container mx-auto pb-32"
      style="min-height: 75vh;">
      <nuxt />
    </div>
    <Navbar/>
  </div>
</template>

<script>
import Appbar from '~/components/Appbar'
import Navbar from '~/components/Navbar'
export default {
  components: {
    Appbar,
    Navbar
  }
}
</script>
