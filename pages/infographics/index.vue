<template>
  <div>
    <div class="p-5 bg-white border-solid border-gray-300">
      <section>
        <h2 class="text-xl font-bold leading-tight">
          Infografis Terkait COVID-19
        </h2>
        <br>
        <div>
          <!--  -->
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('infographics', {
      infographics: 'items'
    })
  }
}
</script>
