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

      <div class="row mt-2 mb-2 pl-2">
        <nuxt-link
          tag="a"
          style="border: 1px solid #2DAC55;"
          class="btn btn-md mr-2"
          :class="stat.isActiveCovid ? 'btnActive' : 'btnNonActive'"
          to=""
          @click.native="enableCovid"
        >
          <font-awesome-icon :icon="fontDiagnoses" /> Sebaran Covid-19
        </nuxt-link>
        <nuxt-link
          tag="a"
          style="border: 1px solid #2DAC55;"
          class="btn btn-md mr-2"
          :class="stat.isActiveRS ? 'btnActive' : 'btnNonActive'"
          to=""
          @click.native="enableRS"
        >
          <font-awesome-icon :icon="fontHospital" /> Fasilitas Kesehatan
        </nuxt-link>
      </div>

      <section v-if="stat.isActiveCovid" class="row">
        <MapSebaranCovid />
      </section>

      <section v-if="stat.isActiveRS" class="row">
        <MapFaskes />
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
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFirstAid, faBug } from '@fortawesome/free-solid-svg-icons'
import { formatDateTimeShort } from '~/lib/date'

export default {
  components: {
    MapSebaranCovid: () => import('~/components/MapSebaranCovid'),
    MapFaskes: () => import('~/components/MapFaskes'),
    BarStat: () => import('~/components/BarStat'),
    BarStatDetail: () => import('~/components/BarStatDetail'),
    BarStatArea: () => import('~/components/BarStatArea'),
    BarStatJenisKelamin: () => import('~/components/BarStatJenisKelamin'),
    BarStatUsia: () => import('~/components/BarStatUsia'),
    BarStatHarianAkumulatif: () => import('~/components/BarStatHarianAkumulatif'),
    BarStatTable: () => import('~/components/BarStatTable')
    // FontAwesomeIcon
  },
  data () {
    return {
      stat: {
        isActiveCovid: true,
        isActiveRS: false
      },
      fontHospital: faFirstAid,
      fontDiagnoses: faBug
    }
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
    formatDateTimeShort,
    enableCovid () {
      this.stat.isActiveCovid = true
      this.stat.isActiveRS = false
    },
    enableRS () {
      this.stat.isActiveCovid = false
      this.stat.isActiveRS = true
    }
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

<style lang="scss" scoped>

.btnActive {
  color: #ffffff;
  background-color: #2DAC55;
}
.btnNonActive {
  color: #2DAC55;
  background-color: #FFFFFF;
}
</style>
