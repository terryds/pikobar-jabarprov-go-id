<template>
  <div class="container mx-auto">
    <div class="container">
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
        Dashboard Kasus COVID-19 Provinsi Jawa Barat
      </h3>
      <span style="font-size: smaller;">*Terakhir diupdate {{ jsonDataResult.last_update }}</span>
      <br>
      <br>
      <section>
        <BarStat />
      </section>

      <section class="mt-2">
        <BarStatDetail />
      </section>

      <section class="row mt-2">
        <div
          class="bg-white col-md-12 p-0 m-1 mt-2 "
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); height:50em;"
        >
          <MapView />
        </div>
      </section>

      <section class="mt-2">
        <BarStatArea />
      </section>

      <section class="row mt-2">
        <div class="p-1 col-lg-5 col-md col-sm col-xs">
          <BarStatJenisKelamin />
        </div>
        <div class="p-1 col-lg-7 col-md">
          <BarStatUsia />
        </div>
      </section>

      <section class="mt-2">
        <BarStatHarianAkumulatif />
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {
    MapView: () => import('~/components/MapView'),
    BarStat: () => import('~/components/BarStat'),
    BarStatDetail: () => import('~/components/BarStatDetail'),
    BarStatArea: () => import('~/components/BarStatArea'),
    BarStatJenisKelamin: () => import('~/components/BarStatJenisKelamin'),
    BarStatUsia: () => import('~/components/BarStatUsia'),
    BarStatHarianAkumulatif: () => import('~/components/BarStatHarianAkumulatif')
  },
  data () {
    return {
      jsonDataSatuan: [
      ],
      jsonDataRekap: [
      ],
      jsonDataResult: {
        odp: 0,
        odp_proses: 0,
        odp_proses_persen: 0,
        odp_selesai: 0,
        odp_selesai_persen: 0,
        pdp: 0,
        pdp_proses: 0,
        pdp_proses_persen: 0,
        pdp_selesai: 0,
        pdp_selesai_persen: 0,
        positif: 0,
        perawatan: 0,
        sembuh: 0,
        meninggal: 0,
        total_positif_saat_ini: 0,
        total_positif_saat_ini_nasional: 0,
        total_sembuh: 0,
        total_sembuh_nasional: 0,
        total_meninggal: 0,
        total_meninggal_nasional: 0,
        last_update: '',
        umur_max: 0,
        count_kota: 0
      }
    }
  },
  created () {
    this.fetchDataSatuan()
  },
  methods: {
    fetchDataSatuan () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/analytics/longlat/')
        .then(function (response) {
          self.jsonDataResult.last_update = new Date(response.data.last_update).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'medium' })
          self.jsonDataSatuan = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
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
