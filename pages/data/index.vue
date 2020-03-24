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
        <div
          class="bg-white col-md-12 p-0 m-2 "
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); height:50em;"
        >
          <MapView />
        </div>
      </section>

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
    MapView: () => import('~/components/MapView'),
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
