<template>
  <div class="container mx-auto">
    <div class="container">
      <!-- <link rel="stylesheet" href=""> -->
      <br>
      <br>
      <br>
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
        Dashboard Kasus COVID-19 Provinsi Jawa Barat
      </h3>
      <span style="font-size: smaller;">*Update Terakhir: {{ lastUpdatedAt }}</span>
      <br>
      <br>
      <section>
        <BarStat />
      </section>

      <section class="mt-2">
        <BarStatDetail />
      </section>

      <section class="row">
        <MapSebaranCovid />
      </section>

      <!-- <section class="row">
        <MapFaskes />
      </section> -->

      <section class="mt-4">
        <BarStatArea />
      </section>

      <section class="mt-4">
        <BarStatTable />
      </section>

      <section class="row mt-4">
        <div class="p-1 col-lg-5 col-md col-sm col-xs mb-4">
          <BarStatJenisKelamin />
        </div>
        <div class="p-1 col-lg-7 col-md">
          <BarStatUsia />
        </div>
      </section>

      <section class="mt-4">
        <BarStatHarianAkumulatif />
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatDateTimeShort } from '~/lib/date'

export default {
  components: {
    MapSebaranCovid: () => import('~/components/MapSebaranCovid'),
    // MapFaskes: () => import('~/components/MapFaskes'),
    BarStat: () => import('~/components/BarStat'),
    BarStatDetail: () => import('~/components/BarStatDetail'),
    BarStatArea: () => import('~/components/BarStatArea'),
    BarStatJenisKelamin: () => import('~/components/BarStatJenisKelamin'),
    BarStatUsia: () => import('~/components/BarStatUsia'),
    BarStatHarianAkumulatif: () => import('~/components/BarStatHarianAkumulatif'),
    BarStatTable: () => import('~/components/BarStatTable')
  },
  computed: {
    ...mapState({
      cases: state => state.statistics.cases
    }),
    lastUpdatedAt () {
      if (!this.cases) {
        return ''
      }
      return this.formatDateTimeShort(this.cases.updated_at)
    }
  },
  methods: {
    formatDateTimeShort
  },
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' }
      ]
    }
  }
}
</script>
