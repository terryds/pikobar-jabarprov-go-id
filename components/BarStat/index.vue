<template>
  <div class="row">
    <div
      class="p-2 col-md m-1"
      style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #FCDFE0 !important; border: solid 1px #FFB4B5;"
    >
      <h4 class="ml-3 mt-2" style="color: #4F4F4F;">
        <b>POSITIF COVID-19</b>
      </h4>
      <div class="mt-1" style="display: flow-root;">
        <h3 class="ml-3 mr-3" style="font-size: 27px; float: left;">
          <b>Jawa Barat</b>
        </h3>
        <h3 class="ml-3 mr-3" style="font-size: 27px; float: right;">
          <b>{{ jsonDataResult.total_positif_saat_ini }}</b>
        </h3>
      </div>
      <div class="mt-1 mb-2" style="display: flow-root;">
        <h3 class="ml-3 mr-3" style="font-size: 20px; float: left;">
          <b>Indonesia</b>
        </h3>
        <h3 class="ml-3 mr-3" style="font-size: 20px; float: right;">
          <b>{{ jsonDataResult.total_positif_saat_ini_nasional }}</b>
        </h3>
      </div>
      <!-- <GChart
        type="LineChart"
        :data="lineChartPositifData"
        :options="lineChartPositifOptions"
        style="position: absolute; bottom: 0px;"
      /> -->
    </div>
    <div
      class="p-1 col-md m-1 "
      style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #D3EEE3 !important; border: solid 1px #91DCBD; "
    >
      <h4 class="ml-3 mt-2" style="color: #4F4F4F;">
        <b>SEMBUH</b>
      </h4>
      <div class="mt-1" style="display: flow-root;">
        <h3 class="ml-3 mr-3" style="font-size: 27px; float: left;">
          <b>Jawa Barat</b>
        </h3>
        <h3 class="ml-3 mr-3" style="font-size: 27px; float: right;">
          <b>{{ jsonDataResult.total_sembuh }}</b>
        </h3>
      </div>
      <div class="mt-1 mb-1" style="display: flow-root;">
        <h3 class="ml-3 mr-3" style="font-size: 22px; float: left;">
          <b>Indonesia</b>
        </h3>
        <h3 class="ml-3 mr-3" style="font-size: 22px; float: right;">
          <b>{{ jsonDataResult.total_sembuh_nasional }}</b>
        </h3>
      </div>
      <!-- <GChart
        type="LineChart"
        :data="lineChartSembuhData"
        :options="lineChartSembuhOptions"
        style="position: absolute; bottom: 0px;"
      /> -->
    </div>
    <div
      class="p-1 col-md m-1 "
      style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #FBEADF !important; border: solid 1px #FED1B1; "
    >
      <h4 class="ml-3 mt-2" style="color: #4F4F4F;">
        <b>MENINGGAL</b>
      </h4>
      <div class="mt-1" style="display: flow-root;">
        <h3 class="ml-3 mr-3" style="font-size: 27px; float: left;">
          <b>Jawa Barat</b>
        </h3>
        <h3 class="ml-3 mr-3" style="font-size: 27px; float: right;">
          <b>{{ jsonDataResult.total_meninggal }}</b>
        </h3>
      </div>
      <div class="mt-1 mb-1" style="display: flow-root;">
        <h3 class="ml-3 mr-3" style="font-size: 20px; float: left;">
          <b>Indonesia</b>
        </h3>
        <h3 class="ml-3 mr-3" style="font-size: 20px; float: right;">
          <b>{{ jsonDataResult.total_meninggal_nasional }}</b>
        </h3>
      </div>
      <!-- <GChart
        type="LineChart"
        :data="lineChartMeninggalData"
        :options="lineChartMeninggalOptions"
        style="position: absolute; bottom: 0px;"
      /> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import { GChart } from 'vue-google-charts'

export default {
  name: 'BarStat',
  components: {
    // GChart
  },
  data () {
    return {
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
        total_positif_saat_ini_nasional: 0,
        total_positif_saat_ini: 0,
        total_sembuh_nasional: 0,
        total_sembuh: 0,
        total_meninggal_nasional: 0,
        total_meninggal: 0,
        last_update: '',
        umur_max: 0,
        count_kota: 0
      },
      lineChartPositifData: [
        ['Tanggal', 'Jumlah'],
        ['0', 0]
      ],
      lineChartPositifOptions: {
        backgroundColor: 'transparent',
        vAxis: {
          gridlines: { color: 'transparent' },
          baselineColor: 'transparent',
          textPosition: 'none'
        },
        hAxis: {
          gridlines: { color: 'transparent' },
          baselineColor: 'transparent',
          textPosition: 'none'
        },
        legend: 'none',
        width: 200,
        height: 50,
        series: {
          0: { color: '#FF4A4B' }
        },
        tooltip: {
          trigger: 'none'
        }
      },
      lineChartSembuhData: [
        ['Tanggal', 'Jumlah'],
        ['0', 0]
      ],
      lineChartSembuhOptions: {
        backgroundColor: 'transparent',
        vAxis: {
          gridlines: { color: 'transparent' },
          baselineColor: 'transparent',
          textPosition: 'none'
        },
        hAxis: {
          gridlines: { color: 'transparent' },
          baselineColor: 'transparent',
          textPosition: 'none'
        },
        legend: 'none',
        width: 200,
        height: 50,
        series: {
          0: { color: '#36D19B' }
        },
        tooltip: {
          trigger: 'none'
        }
      },
      lineChartMeninggalData: [
        ['Tanggal', 'Jumlah'],
        ['0', 0]
      ],
      lineChartMeninggalOptions: {
        backgroundColor: 'transparent',
        vAxis: {
          gridlines: { color: 'transparent' },
          baselineColor: 'transparent',
          textPosition: 'none'
        },
        hAxis: {
          gridlines: { color: 'transparent' },
          baselineColor: 'transparent',
          textPosition: 'none'
        },
        legend: 'none',
        width: 200,
        height: 50,
        series: {
          0: { color: '#FF9441' }
        },
        tooltip: {
          trigger: 'none'
        }
      }
    }
  },
  created () {
    this.fetchDataRekap()
    this.fetchDataNasional()
  },
  methods: {
    ifNullReturnZero (str) {
      if (str === null) {
        return 0
      } else {
        return str
      }
    },
    formatDate (date) {
      const d = new Date(date)
      const year = d.getFullYear()
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      return [day, month, year].join('-')
    },
    fetchDataRekap () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)
      const strYesteday = self.formatDate(yesterday)

      axios
        .get('https://covid19-public.digitalservice.id/analytics/aggregation/')
        .then(function (response) {
          self.jsonDataRekap = response.data
          // by status
          for (let i = 0; i < self.jsonDataRekap.length; i++) {
            if (self.jsonDataRekap[i].tanggal === strToday) {
              if (self.jsonDataRekap[i].whatsapp !== null) {
                self.jsonDataResult.positif = self.ifNullReturnZero(self.jsonDataRekap[i].positif)
                self.jsonDataResult.sembuh = self.ifNullReturnZero(self.jsonDataRekap[i].sembuh)
                self.jsonDataResult.meninggal = self.ifNullReturnZero(self.jsonDataRekap[i].meninggal)
                self.jsonDataResult.total_positif_saat_ini = self.ifNullReturnZero(self.jsonDataRekap[i].total_positif_saat_ini)
                self.jsonDataResult.total_sembuh = self.ifNullReturnZero(self.jsonDataRekap[i].total_sembuh)
                self.jsonDataResult.total_meninggal = self.ifNullReturnZero(self.jsonDataRekap[i].total_meninggal)
                self.jsonDataResult.odp = self.ifNullReturnZero(self.jsonDataRekap[i].total_odp)
                self.jsonDataResult.odp_proses = self.ifNullReturnZero(self.jsonDataRekap[i].proses_pemantauan)
                self.jsonDataResult.odp_proses_persen = ((self.jsonDataResult.odp_proses / self.jsonDataResult.odp) * 100).toFixed(2)
                self.jsonDataResult.odp_selesai = self.ifNullReturnZero(self.jsonDataRekap[i].selesai_pemantauan)
                self.jsonDataResult.odp_selesai_persen = ((self.jsonDataResult.odp_selesai / self.jsonDataResult.odp) * 100).toFixed(2)
                self.jsonDataResult.pdp = self.ifNullReturnZero(self.jsonDataRekap[i].total_pdp)
                self.jsonDataResult.pdp_proses = self.ifNullReturnZero(self.jsonDataRekap[i].proses_pengawasan)
                self.jsonDataResult.pdp_proses_persen = ((self.jsonDataResult.pdp_proses / self.jsonDataResult.pdp) * 100).toFixed(2)
                self.jsonDataResult.pdp_selesai = self.ifNullReturnZero(self.jsonDataRekap[i].selesai_pengawasan)
                self.jsonDataResult.pdp_selesai_persen = ((self.jsonDataResult.pdp_selesai / self.jsonDataResult.pdp) * 100).toFixed(2)
              } else {
                self.jsonDataResult.positif = self.ifNullReturnZero(self.jsonDataRekap[i - 1].positif)
                self.jsonDataResult.sembuh = self.ifNullReturnZero(self.jsonDataRekap[i - 1].sembuh)
                self.jsonDataResult.meninggal = self.ifNullReturnZero(self.jsonDataRekap[i - 1].meninggal)
                self.jsonDataResult.total_positif_saat_ini = self.ifNullReturnZero(self.jsonDataRekap[i - 1].total_positif_saat_ini)
                self.jsonDataResult.total_sembuh = self.ifNullReturnZero(self.jsonDataRekap[i - 1].total_sembuh)
                self.jsonDataResult.total_meninggal = self.ifNullReturnZero(self.jsonDataRekap[i - 1].total_meninggal)
                self.jsonDataResult.odp = self.ifNullReturnZero(self.jsonDataRekap[i - 1].total_odp)
                self.jsonDataResult.odp_proses = self.ifNullReturnZero(self.jsonDataRekap[i - 1].proses_pemantauan)
                self.jsonDataResult.odp_proses_persen = ((self.jsonDataResult.odp_proses / self.jsonDataResult.odp) * 100).toFixed(2)
                self.jsonDataResult.odp_selesai = self.ifNullReturnZero(self.jsonDataRekap[i - 1].selesai_pemantauan)
                self.jsonDataResult.odp_selesai_persen = ((self.jsonDataResult.odp_selesai / self.jsonDataResult.odp) * 100).toFixed(2)
                self.jsonDataResult.pdp = self.ifNullReturnZero(self.jsonDataRekap[i - 1].total_pdp)
                self.jsonDataResult.pdp_proses = self.ifNullReturnZero(self.jsonDataRekap[i - 1].proses_pengawasan)
                self.jsonDataResult.pdp_proses_persen = ((self.jsonDataResult.pdp_proses / self.jsonDataResult.pdp) * 100).toFixed(2)
                self.jsonDataResult.pdp_selesai = self.ifNullReturnZero(self.jsonDataRekap[i - 1].selesai_pengawasan)
                self.jsonDataResult.pdp_selesai_persen = ((self.jsonDataResult.pdp_selesai / self.jsonDataResult.pdp) * 100).toFixed(2)
              }
            }
          }

          // series
          let stop = false
          for (let i = 0; i < self.jsonDataRekap.length; i++) {
            if (stop === false) {
              self.lineChartPositifData.push([
                self.jsonDataRekap[i].tanggal,
                self.ifNullReturnZero(self.jsonDataRekap[i].positif)
              ])
              self.lineChartSembuhData.push([
                self.jsonDataRekap[i].tanggal,
                self.ifNullReturnZero(self.jsonDataRekap[i].sembuh)
              ])
              self.lineChartMeninggalData.push([
                self.jsonDataRekap[i].tanggal,
                self.ifNullReturnZero(self.jsonDataRekap[i].meninggal)
              ])
            }
            if (self.jsonDataRekap[i].tanggal === strYesteday) {
              stop = true
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataNasional () {
      const self = this
      axios
        .get('https://indonesia-covid-19.mathdro.id/api')
        .then(function (response) {
          self.jsonDataResult.total_positif_saat_ini_nasional = response.data.jumlahKasus
          self.jsonDataResult.total_sembuh_nasional = response.data.sembuh
          self.jsonDataResult.total_meninggal_nasional = response.data.meninggal
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  head () {
    return {
      link: [
        /* { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' } */
      ]
    }
  }
}

</script>
