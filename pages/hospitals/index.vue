<template>
  <div class="container sm:p-5 mx-auto">
    <div class="p-5 py-20 bg-auto">
      <h2 class="text-2xl font-bold leading-tight">
        Kontak Rumah Sakit dan Call Center
      </h2>
      <p class="mb-6 mt-2 text-base opacity-50 leading-tight">
        Informasi dan nomor alamat rumah sakit yang menjadi rujukan pemeriksaan gejala COVID-19
      </p>
    </div>

    <div class="p-5 bg-white border-solid border border-gray-400 rounded-lg">
      <section>
        <h2 class="text-2xl font-bold leading-tight">
          Daftar Rumah Sakit Rujukan
        </h2>
        <p class="mb-6 mt-2 text-base opacity-50 leading-tight">
          Berikut ini adalah rumah sakit yang menjadi rujukan untuk pasien dengan status Pasien dalam Pengawasan. Anda harus mengunjungi fasilitas kesehatan terdekat terlebih dahulu seperti klinik/rumah sakit umum sebelum akhirnya dapat dirujuk ke rumah sakit di bawah ini.
        </p>
        <br>
        <div>
          <ContactList :items="hospitals" />
        </div>
      </section>
    </div>
    <div class="mb-6 mt-8 p-5 bg-white border-solid border border-gray-400 rounded-lg">
      <h2 class="mb-6 text-2xl font-bold leading-tight">
        Hubungi Call Center
      </h2>
      <CallCenter />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ContactList from '~/components/ContactList'
import CallCenter from '~/components/CallCenter'
export default {
  components: {
    ContactList,
    CallCenter
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
