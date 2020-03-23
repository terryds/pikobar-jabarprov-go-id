<template>
  <div>
    <div class="row mt-2 mb-2 pl-2">
      <nuxt-link
        tag="a"
        style="border: 1px solid #2DAC55;"
        class="btn btn-md mr-2"
        :class="stat.isActiveHarian ? 'btnActive' : 'btnNonActive'"
        to=""
        @click.native="enableHarian"
      >
        <font-awesome-icon :icon="fontChartBar" /> Angka Harian
      </nuxt-link>
      <nuxt-link
        tag="a"
        style="border: 1px solid #2DAC55;"
        class="btn btn-md mr-2"
        :class="stat.isActiveAkumulatif ? 'btnActive' : 'btnNonActive'"
        to=""
        @click.native="enableAkumulatif"
      >
        <font-awesome-icon :icon="fontChartLine" /> Kumulatif
      </nuxt-link>
    </div>

    <div v-if="stat.isActiveHarian" class="row">
      <div class="p-1 col-lg-6 col-md">
        <div
          class="bg-white p-1"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>Angka Harian ODP</b><br>
            <b style="color: #828282;">(Orang Dalam Pemantauan)</b>
          </h4>
          <hr>
          <GChart
            type="BarChart"
            :data="barChartHarianODPData"
            :options="barChartHarianODPOptions"
          />
        </div>
      </div>
      <div class="p-1 col-lg-6 col-md">
        <div
          class="bg-white p-1"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>Angka Harian PDP</b><br>
            <b style="color: #828282;">(Pasien Dalam Pengawasan)</b>
          </h4>
          <hr>
          <GChart
            type="BarChart"
            :data="barChartHarianPDPData"
            :options="barChartHarianPDPOptions"
          />
        </div>
      </div>
    </div>

    <div v-if="stat.isActiveAkumulatif" class="row">
      <div class="p-1 col-lg-6 col-md">
        <div
          class="bg-white p-1"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>Kumulatif ODP</b><br>
            <b style="color: #828282;">(Orang Dalam Pemantauan)</b>
          </h4>
          <hr>
          <GChart
            type="LineChart"
            :data="barChartAkumulatifODPData"
            :options="barChartAkumulatifODPOptions"
          />
        </div>
      </div>
      <div class="p-1 col-lg-6 col-md">
        <div
          class="bg-white p-1"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>Kumulatif PDP</b><br>
            <b style="color: #828282;">(Pasien Dalam Pengawasan)</b>
          </h4>
          <hr>
          <GChart
            type="LineChart"
            :data="barChartAkumulatifPDPData"
            :options="barChartAkumulatifPDPOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'BarStatHarianAkumulatif',
  components: {
    GChart,
    FontAwesomeIcon
  },
  data () {
    return {
      stat: {
        isActiveHarian: true,
        isActiveAkumulatif: false
      },
      fontChartBar: faChartBar,
      fontChartLine: faChartLine,
      jsonDataRekap: [
      ],
      jsonDataSatuan: [
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
        total_sembuh: 0,
        total_meninggal: 0,
        last_update: '',
        umur_max: 0,
        count_kota: 0
      },
      barChartHarianODPData: [
        ['Tanggal', 'Selesai Pemantauan', 'Proses Pemantauan'],
        ['0', 0, 0]
      ],
      barChartHarianODPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#6DD274', '#1AB762'],
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        chartArea: {
          width: '80%',
          bottom: 100
        }
      },
      barChartHarianPDPData: [
        ['Tanggal', 'Selesai Pengawasan', 'Proses Pengawasan'],
        ['0', 0, 0]
      ],
      barChartHarianPDPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#F6D039', '#F18931'],
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '80%',
          bottom: 100
        }
      },
      barChartAkumulatifODPData: [
        ['Tanggal', 'Selesai Pemantauan', 'Proses Pemantauan', 'Total ODP'],
        ['0', 0, 0, 0]
      ],
      barChartAkumulatifODPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#6DD274', '#1AB762', '#009F5D'],
        legend: {
          position: 'bottom',
          alignment: 'center',
          maxLines: 5
        },
        // curveType: 'function',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        chartArea: {
          width: '80%',
          bottom: 100
        }
      },
      barChartAkumulatifPDPData: [
        ['Tanggal', 'Selesai Pengawasan', 'Proses Pengawasan', 'Total PDP'],
        ['0', 0, 0, 0]
      ],
      barChartAkumulatifPDPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#F6D039', '#F18931', '#F55A2A'],
        legend: {
          position: 'bottom',
          alignment: 'center',
          maxLines: 5
        },
        // curveType: 'function',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '80%',
          bottom: 100
        }
      }
    }
  },
  created () {
    this.fetchDataRekap()
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
    enableHarian () {
      this.stat.isActiveHarian = true
      this.stat.isActiveAkumulatif = false
    },
    enableAkumulatif () {
      this.stat.isActiveHarian = false
      this.stat.isActiveAkumulatif = true
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
              if (i > 0 && self.ifNullReturnZero(self.jsonDataRekap[i].total_odp) === 0) {
                self.barChartHarianODPData.push([
                  self.jsonDataRekap[i].tanggal,
                  self.ifNullReturnZero(self.jsonDataRekap[i - 1].selesai_pemantauan),
                  self.ifNullReturnZero(self.jsonDataRekap[i - 1].proses_pemantauan)
                ])
                self.barChartHarianPDPData.push([
                  self.jsonDataRekap[i].tanggal,
                  self.ifNullReturnZero(self.jsonDataRekap[i - 1].selesai_pengawasan),
                  self.ifNullReturnZero(self.jsonDataRekap[i - 1].proses_pengawasan)
                ])
                self.barChartAkumulatifODPData.push([
                  self.jsonDataRekap[i].tanggal,
                  self.ifNullReturnZero(self.jsonDataRekap[i - 1].selesai_pemantauan),
                  self.ifNullReturnZero(self.jsonDataRekap[i - 1].proses_pemantauan),
                  self.ifNullReturnZero(self.jsonDataRekap[i - 1].total_odp)
                ])
                self.barChartAkumulatifPDPData.push([
                  self.jsonDataRekap[i].tanggal,
                  self.ifNullReturnZero(self.jsonDataRekap[i - 1].selesai_pengawasan),
                  self.ifNullReturnZero(self.jsonDataRekap[i - 1].proses_pengawasan),
                  self.ifNullReturnZero(self.jsonDataRekap[i - 1].total_pdp)
                ])
              } else {
                self.barChartHarianODPData.push([
                  self.jsonDataRekap[i].tanggal,
                  self.ifNullReturnZero(self.jsonDataRekap[i].selesai_pemantauan),
                  self.ifNullReturnZero(self.jsonDataRekap[i].proses_pemantauan)
                ])
                self.barChartHarianPDPData.push([
                  self.jsonDataRekap[i].tanggal,
                  self.ifNullReturnZero(self.jsonDataRekap[i].selesai_pengawasan),
                  self.ifNullReturnZero(self.jsonDataRekap[i].proses_pengawasan)
                ])
                self.barChartAkumulatifODPData.push([
                  self.jsonDataRekap[i].tanggal,
                  self.ifNullReturnZero(self.jsonDataRekap[i].selesai_pemantauan),
                  self.ifNullReturnZero(self.jsonDataRekap[i].proses_pemantauan),
                  self.ifNullReturnZero(self.jsonDataRekap[i].total_odp)
                ])
                self.barChartAkumulatifPDPData.push([
                  self.jsonDataRekap[i].tanggal,
                  self.ifNullReturnZero(self.jsonDataRekap[i].selesai_pengawasan),
                  self.ifNullReturnZero(self.jsonDataRekap[i].proses_pengawasan),
                  self.ifNullReturnZero(self.jsonDataRekap[i].total_pdp)
                ])
              }
            }
            if (self.jsonDataRekap[i].tanggal === strYesteday) {
              stop = true
            }
          }
          self.barChartHarianODPData.splice(1, 1)
          self.barChartHarianPDPData.splice(1, 1)
          self.barChartAkumulatifODPData.splice(1, 1)
          self.barChartAkumulatifPDPData.splice(1, 1)
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
