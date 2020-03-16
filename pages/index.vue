<template>
  <div>
    <ImageCarousel :items="banners" />
    <br>
    <div class="p-5 bg-white border-solid border-gray-300">
      <section>
        <h2 class="text-xl font-bold leading-tight">
          Nomor Penting
        </h2>
        <br>
        <div class="md:flex md:flex-row md:justify-start md:items-center">
          <CallButton
            class="py-3"
            title="Call Center"
            subtitle="(Nomor Darurat)"
            number="119"/>
          <CallButton
            class="py-3 md:ml-8"
            title="Dinkes Jabar"
            subtitle="(Pertanyaan Umum)"
            number="0811 2093 306"/>
        </div>
      </section>
      <br>
      <section>
        <div class="p-4 rounded flex flex-row flex-wrap justify-between items-center text-white bg-brand-green">
          <p class="flex-none">
            <strong>Pertanyaan Terlayani</strong><br>
            <small>(Telpon dan Pesan Teks)</small>
          </p>
          <label class="p-3 rounded-full text-2xl text-brand-yellow-light font-bold border border-solid border-brand-yellow">
            100
          </label>
        </div>
      </section>
      <hr class="my-8">
      <section>
        <h2 class="text-xl font-bold leading-tight">
          Daftar Rumah Sakit Rujukan
        </h2>
        <p class="mb-8 text-lg opacity-50 leading-tight">
          di Jawa Barat
        </p>
        <div>
          <ContactList :items="hospitals" />
        </div>
        <div class="clearfix">
          <nuxt-link
            class="float-left mb-5 text-brand-blue hover:text-brand-blue-lighter font-bold"
            to="/hospitals">
            <span class="mr-2 align-middle">
              Rumah Sakit di Wilayah Lainnya
            </span>
            <FontAwesomeIcon class="align-middle" :icon="icon.faChevronRight" />
          </nuxt-link>
        </div>
      </section>
    </div>
    <br>
    <div class="bg-white border-solid border-gray-300">
      <section>
        <h2 class="p-5 text-xl font-bold leading-tight">
          Infografis terkait COVID-19
        </h2>
        <br>
        <ImageSwiper :items="infographics" />
        <br>
        <div class="p-5 clearfix">
          <nuxt-link
            class="float-left mb-5 text-brand-blue hover:text-brand-blue-lighter font-bold"
            to="/infographics">
            <span class="mr-2 align-middle">
              Lihat juga Infografis Lainnya
            </span>
            <FontAwesomeIcon class="align-middle" :icon="icon.faChevronRight" />
          </nuxt-link>
        </div>
      </section>
    </div>
    <br>
    <div class="p-5 bg-white border-solid border-gray-300">
      <section>
        <h2 class="text-xl font-bold leading-tight">
          Rilis Pers
        </h2>
        <p class="mb-8 text-lg opacity-50 leading-tight">
          Terakhir Diperbarui: {{ todayDateAndTime }}
        </p>
        <br>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { formatDateTimeShort } from '~/lib/date'
import ImageCarousel from '~/components/ImageCarousel'
import ImageSwiper from '~/components/ImageSwiper'
import CallButton from '~/components/CallButton'
import ContactList from '~/components/ContactList'

export default {
  components: {
    ImageCarousel,
    ImageSwiper,
    CallButton,
    ContactList
  },
  fetch ({ store }) {
    const promises = []
    if (!store.state.banners.items.length) {
      promises.push(store.dispatch('banners/getItems'))
    }
    if (!store.state.news.items.length) {
      promises.push(store.dispatch('news/getItems'))
    }
    return Promise.all(promises)
  },
  data () {
    return {
      icon: {
        faChevronRight
      },
      todayDateAndTime: formatDateTimeShort(new Date())
    }
  },
  computed: {
    ...mapState({
      banners: state => state.banners.items,
      hospitals: state => state.hospitals.items.filter((_, index) => index < 3),
      remainingHospitalCount: state => state.hospitals.items.length - 3,
      infographics: state => state.infographics.items.filter((_, index) => index < 3),
      news: state => state.news.items
    })
  },
  created () {
    this.$store.dispatch('infographics/getItems')
  }
}
</script>
