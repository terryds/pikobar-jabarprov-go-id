<template>
  <div class="container sm:p-5 mx-auto">
    <div class="p-5 bg-white border-solid border-gray-300">
      <section>
        <h2 class="text-xl font-bold leading-tight">
          Daftar Rumah Sakit Rujukan
        </h2>
        <p class="mb-8 text-lg opacity-50 leading-tight">
          di Jawa Barat
        </p>
        <br>
        <div>
          <ContactList :items="hospitals" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ContactList from '~/components/ContactList'
export default {
  components: {
    ContactList
  },
  computed: {
    ...mapState('hospitals', {
      hospitals: 'items'
    })
  }
}
</script>

<style>

</style>
