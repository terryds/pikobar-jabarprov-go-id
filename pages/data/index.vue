<template>
  <div class="container mx-auto">
    <div class="container mx-4 p-5 max-w-3xl mx-auto">
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
        Dashboard Kasus COVID-19 Provinsi Jawa Barat
      </h3>
      <span style="font-size: smaller;">*Terakhir diupdate {{ jsonDataResult.last_update }}</span>
      <br>
      <br>

      <section class="row">
        <div
          class="p-1 col-md m-2 "
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #FCDFE0 !important; border: solid 1px #FFB4B5;"
        >
          <h4 class="ml-3 mt-3" style="color: #4F4F4F;">
            <b>POSITIF COVID-19</b>
          </h4>
          <h3 class="ml-3" style="font-size: 30px;">
            <b>{{ jsonDataResult.positif }}</b>
          </h3>
          <GChart
            type="LineChart"
            :data="lineChartPositifData"
            :options="lineChartPositifOptions"
          />
        </div>
        <div
          class="p-1 col-md m-2 "
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #D3EEE3 !important; border: solid 1px #91DCBD; "
        >
          <h4 class="ml-3 mt-3" style="color: #4F4F4F;">
            <b>SEMBUH</b>
          </h4>
          <h3 class="ml-3" style="font-size: 30px;">
            <b>{{ jsonDataResult.sembuh }}</b>
          </h3>
          <GChart
            type="LineChart"
            :data="lineChartSembuhData"
            :options="lineChartSembuhOptions"
          />
        </div>
        <div
          class="p-1 col-md m-2 "
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #FBEADF !important; border: solid 1px #FED1B1; "
        >
          <h4 class="ml-3 mt-3" style="color: #4F4F4F;">
            <b>MENINGGAL</b>
          </h4>
          <h3 class="ml-3" style="font-size: 30px;">
            <b>{{ jsonDataResult.meninggal }}</b>
          </h3>
          <GChart
            type="LineChart"
            :data="lineChartMeninggalData"
            :options="lineChartMeninggalOptions"
          />
        </div>
      </section>

      <section class="row">
        <div
          class="bg-white p-1 col-md m-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h3 class="m-3" style="font-size: 23px !important;">
            <b>ODP (Orang Dalam Pemantauan)</b>
          </h3>
          <hr>
          <div class="row p-2">
            <div style="margin-top: auto;">
              <div class="col-md m-1">
                <span style="color: #2DAC55; font-size: 34px; font-weight: bold;">{{ jsonDataResult.odp_proses }}</span>
                <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.pdp_proses_persen }}%)</span><br>
                <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Proses Pemantauan</span>
              </div>
            </div>
            <div style="margin-top: auto;">
              <div class="col-md m-1">
                <span style="color: #2DAC55; font-size: 24px; font-weight: bold;">{{ jsonDataResult.odp_selesai }}</span>
                <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.pdp_selesai_persen }}%)</span><br>
                <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Selesai Pemantauan</span>
              </div>
            </div>
            <div style="margin-top: auto;" class="ml-4">
              <div class="col-md m-1">
                <span style="color: #2DAC55; font-size: 24px; font-weight: bold;">{{ jsonDataResult.odp }}</span><br>
                <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Total ODP</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-white p-1 col-md m-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3" style="font-size: 23px !important;">
            <b>PDP (Pasien Dalam Pengawasan)</b>
          </h4>
          <hr>
          <div class="row p-2">
            <div style="margin-top: auto;">
              <div class="col-md m-1">
                <span style="color: #2DAC55; font-size: 34px; font-weight: bold;">{{ jsonDataResult.pdp_proses }}</span>
                <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.pdp_proses_persen }}%)</span><br>
                <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Proses Pengawasan</span>
              </div>
            </div>
            <div style="margin-top: auto;">
              <div class="col-md m-1">
                <span style="color: #2DAC55; font-size: 24px; font-weight: bold;">{{ jsonDataResult.pdp_selesai }}</span>
                <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.pdp_selesai_persen }}%)</span><br>
                <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Selesai Pengawasan</span>
              </div>
            </div>
            <div style="margin-top: auto;" class="ml-4">
              <div class="col-md m-1">
                <span style="color: #2DAC55; font-size: 24px; font-weight: bold;">{{ jsonDataResult.pdp }}</span><br>
                <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Total PDP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="row">
        <div
          class="bg-white p-3 col-md m-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); height:400px;"
        >
          <MapView />
        </div>
      </section>

      <section class="row">
        <div
          class="bg-white p-1 col-md m-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>Jenis Kelamin</b>
          </h4>
          <hr>
          <GChart
            type="PieChart"
            :data="pieChartJenisKelaminData"
            :options="pieChartJenisKelaminOptions"
          />
        </div>
        <div
          class="bg-white p-1 col-md m-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>Umur dan Gender</b>
          </h4>
          <hr>
          <GChart
            type="BarChart"
            :data="barChartUmurJenisKelaminData"
            :options="barChartUmurJenisKelaminOptions"
          />
        </div>
      </section>

      <!-- {{ jsonDataResult }} -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'
import MapView from '~/components/MapView'

export default {
  components: {
    GChart,
    MapView
  },
  data () {
    return {
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
        last_update: '',
        umur_max: 0
      },
      lineChartPositifData: [
        ['Tanggal', 'Jumlah'],
        ['2020-01-01', 1],
        ['2020-01-02', 2],
        ['2020-01-03', 5],
        ['2020-01-04', 2],
        ['2020-01-05', 8],
        ['2020-01-06', 7],
        ['2020-01-07', 8],
        ['2020-01-08', 7],
        ['2020-01-09', 9],
        ['2020-01-10', 10],
        ['2020-01-11', 8],
        ['2020-01-12', 7],
        ['2020-01-13', 7],
        ['2020-01-14', 10]
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
        }
      },
      lineChartSembuhData: [
        ['Tanggal', 'Jumlah'],
        ['2020-01-01', 1],
        ['2020-01-02', 2],
        ['2020-01-03', 5],
        ['2020-01-04', 2],
        ['2020-01-05', 8],
        ['2020-01-06', 7],
        ['2020-01-07', 8],
        ['2020-01-08', 7],
        ['2020-01-09', 9],
        ['2020-01-10', 10],
        ['2020-01-11', 8],
        ['2020-01-12', 7],
        ['2020-01-13', 7],
        ['2020-01-14', 10]
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
        }
      },
      lineChartMeninggalData: [
        ['Tanggal', 'Jumlah'],
        ['2020-01-01', 1],
        ['2020-01-02', 2],
        ['2020-01-03', 5],
        ['2020-01-04', 2],
        ['2020-01-05', 8],
        ['2020-01-06', 7],
        ['2020-01-07', 8],
        ['2020-01-08', 7],
        ['2020-01-09', 9],
        ['2020-01-10', 10],
        ['2020-01-11', 8],
        ['2020-01-12', 7],
        ['2020-01-13', 7],
        ['2020-01-14', 10]
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
        }
      },
      pieChartJenisKelaminData: [
        ['Jenis Kelamin', 'Data'],
        ['Pria', 0],
        ['Wanita', 0],
        ['Tidak Teridentifikasi', 0]
      ],
      pieChartJenisKelaminOptions: {
        height: 400,
        slices: {
          0: { color: '#2DAC55' },
          1: { color: '#F6D039' },
          2: { color: '#7D7D7D' }
        },
        legend: {
          position: 'bottom'
        }
      },
      barChartUmurJenisKelaminData: {
        cols: [
          { id: 'Umur', label: 'Umur', type: 'string' },
          { id: 'Pria', label: 'Pria', type: 'number' },
          { id: 'Wanita', label: 'Wanita', type: 'number' }
        ],
        rows: [
          {
            c: [
              { v: 10, f: '0-10' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 20, f: '11-20' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 30, f: '21-30' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 40, f: '31-40' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 50, f: '41-50' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 60, f: '51-60' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 70, f: '61-70' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 80, f: '71-80' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 100, f: '81-100' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          }
        ]
      },
      barChartUmurJenisKelaminOptions: {
        height: 400,
        series: {
          0: { color: '#2DAC55' },
          1: { color: '#F6D039' },
          2: { color: '#7D7D7D' }
        },
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        vAxis: {
          format: '##;##'
        },
        hAxis: {
          title: 'Umur',
          viewWindowMode: 'explicit',
          viewWindow: {
            min: 0,
            max: 0
          }
        },
        viewWindowMode: 'explicit'
      }
    }
  },
  created () {
    this.fetchDataRekap()
    this.fetchDataSatuan()
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
      // const yesterday = new Date()
      // yesterday.setDate(today.getDate() - 1)
      // const strYesteday = self.formatDate(yesterday)

      axios
        .get('https://coredata.jabarprov.go.id/analytics/covid19/aggregation/')
        .then(function (response) {
          self.jsonDataRekap = response.data
          // by status
          for (let i = 0; i < self.jsonDataRekap.length; i++) {
            if (self.jsonDataRekap[i].tanggal === strToday) {
              if (self.jsonDataRekap[i].whatsapp !== null) {
                self.jsonDataResult.positif = self.ifNullReturnZero(self.jsonDataRekap[i].positif)
                self.jsonDataResult.sembuh = self.ifNullReturnZero(self.jsonDataRekap[i].sembuh)
                self.jsonDataResult.meninggal = self.ifNullReturnZero(self.jsonDataRekap[i].meninggal)
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
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataSatuan () {
      const self = this
      axios
        .get('https://coredata.jabarprov.go.id/analytics/covid19/longlat/')
        .then(function (response) {
          self.jsonDataResult.last_update = new Date(response.data.last_update).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'medium' })
          self.jsonDataSatuan = response.data.data

          // by jenis_kelamin
          let tempJenisKelaminPria = 0
          let tempJenisKelaminWanita = 0
          let tempJenisKelaminNull = 0
          for (let i = 0; i < self.jsonDataSatuan.length; i++) {
            if (self.jsonDataSatuan[i].jenis_kelamin_str === 'Laki-laki') {
              tempJenisKelaminPria += 1
            } else if (self.jsonDataSatuan[i].jenis_kelamin_str === 'Perempuan') {
              tempJenisKelaminWanita += 1
            } else {
              tempJenisKelaminNull += 1
            }
          }
          self.pieChartJenisKelaminData = [
            ['Jenis Kelamin', 'Data'],
            ['Pria', tempJenisKelaminPria],
            ['Wanita', tempJenisKelaminWanita],
            ['Tidak Teridentifikasi', tempJenisKelaminNull]
          ]

          // by umur
          let max = 0
          for (let i = 0; i < self.jsonDataSatuan.length; i++) {
            if (self.jsonDataSatuan[i].umur > max) {
              max = self.jsonDataSatuan[i].umur
              self.barChartUmurJenisKelaminOptions.hAxis.viewWindow.min = (max + 10) * -1
              self.barChartUmurJenisKelaminOptions.hAxis.viewWindow.max = max + 10
            }
            if (self.jsonDataSatuan[i].jenis_kelamin_str === 'Laki-laki') {
              if ((self.jsonDataSatuan[i].umur >= 0) && (self.jsonDataSatuan[i].umur <= 10)) {
                self.barChartUmurJenisKelaminData.rows[0].c[1].v -= 1
                self.barChartUmurJenisKelaminData.rows[0].c[1].f = (self.barChartUmurJenisKelaminData.rows[0].c[1].v * -1).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 11) && (self.jsonDataSatuan[i].umur <= 20)) {
                self.barChartUmurJenisKelaminData.rows[1].c[1].v -= 1
                self.barChartUmurJenisKelaminData.rows[1].c[1].f = (self.barChartUmurJenisKelaminData.rows[1].c[1].v * -1).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 21) && (self.jsonDataSatuan[i].umur <= 30)) {
                self.barChartUmurJenisKelaminData.rows[2].c[1].v -= 1
                self.barChartUmurJenisKelaminData.rows[2].c[1].f = (self.barChartUmurJenisKelaminData.rows[2].c[1].v * -1).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 31) && (self.jsonDataSatuan[i].umur <= 40)) {
                self.barChartUmurJenisKelaminData.rows[3].c[1].v -= 1
                self.barChartUmurJenisKelaminData.rows[3].c[1].f = (self.barChartUmurJenisKelaminData.rows[3].c[1].v * -1).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 41) && (self.jsonDataSatuan[i].umur <= 50)) {
                self.barChartUmurJenisKelaminData.rows[4].c[1].v -= 1
                self.barChartUmurJenisKelaminData.rows[4].c[1].f = (self.barChartUmurJenisKelaminData.rows[4].c[1].v * -1).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 51) && (self.jsonDataSatuan[i].umur <= 60)) {
                self.barChartUmurJenisKelaminData.rows[5].c[1].v -= 1
                self.barChartUmurJenisKelaminData.rows[5].c[1].f = (self.barChartUmurJenisKelaminData.rows[5].c[1].v * -1).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 61) && (self.jsonDataSatuan[i].umur <= 70)) {
                self.barChartUmurJenisKelaminData.rows[6].c[1].v -= 1
                self.barChartUmurJenisKelaminData.rows[6].c[1].f = (self.barChartUmurJenisKelaminData.rows[6].c[1].v * -1).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 71) && (self.jsonDataSatuan[i].umur <= 80)) {
                self.barChartUmurJenisKelaminData.rows[7].c[1].v -= 1
                self.barChartUmurJenisKelaminData.rows[7].c[1].f = (self.barChartUmurJenisKelaminData.rows[7].c[1].v * -1).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 81) && (self.jsonDataSatuan[i].umur <= 100)) {
                self.barChartUmurJenisKelaminData.rows[8].c[1].v -= 1
                self.barChartUmurJenisKelaminData.rows[8].c[1].f = (self.barChartUmurJenisKelaminData.rows[8].c[1].v * -1).toString()
              }
            } else if (self.jsonDataSatuan[i].jenis_kelamin_str === 'Perempuan') {
              if ((self.jsonDataSatuan[i].umur >= 0) && (self.jsonDataSatuan[i].umur <= 10)) {
                self.barChartUmurJenisKelaminData.rows[0].c[2].v += 1
                self.barChartUmurJenisKelaminData.rows[0].c[2].f = (self.barChartUmurJenisKelaminData.rows[0].c[2].v).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 11) && (self.jsonDataSatuan[i].umur <= 20)) {
                self.barChartUmurJenisKelaminData.rows[1].c[2].v += 1
                self.barChartUmurJenisKelaminData.rows[1].c[2].f = (self.barChartUmurJenisKelaminData.rows[1].c[2].v).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 21) && (self.jsonDataSatuan[i].umur <= 30)) {
                self.barChartUmurJenisKelaminData.rows[2].c[2].v += 1
                self.barChartUmurJenisKelaminData.rows[2].c[2].f = (self.barChartUmurJenisKelaminData.rows[2].c[2].v).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 31) && (self.jsonDataSatuan[i].umur <= 40)) {
                self.barChartUmurJenisKelaminData.rows[3].c[2].v += 1
                self.barChartUmurJenisKelaminData.rows[3].c[2].f = (self.barChartUmurJenisKelaminData.rows[3].c[2].v).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 41) && (self.jsonDataSatuan[i].umur <= 50)) {
                self.barChartUmurJenisKelaminData.rows[4].c[2].v += 1
                self.barChartUmurJenisKelaminData.rows[4].c[2].f = (self.barChartUmurJenisKelaminData.rows[4].c[2].v).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 51) && (self.jsonDataSatuan[i].umur <= 60)) {
                self.barChartUmurJenisKelaminData.rows[5].c[2].v += 1
                self.barChartUmurJenisKelaminData.rows[5].c[2].f = (self.barChartUmurJenisKelaminData.rows[5].c[2].v).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 61) && (self.jsonDataSatuan[i].umur <= 70)) {
                self.barChartUmurJenisKelaminData.rows[6].c[2].v += 1
                self.barChartUmurJenisKelaminData.rows[6].c[2].f = (self.barChartUmurJenisKelaminData.rows[6].c[2].v).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 71) && (self.jsonDataSatuan[i].umur <= 80)) {
                self.barChartUmurJenisKelaminData.rows[7].c[2].v += 1
                self.barChartUmurJenisKelaminData.rows[7].c[2].f = (self.barChartUmurJenisKelaminData.rows[7].c[2].v).toString()
              } else if ((self.jsonDataSatuan[i].umur >= 81) && (self.jsonDataSatuan[i].umur <= 100)) {
                self.barChartUmurJenisKelaminData.rows[8].c[2].v += 1
                self.barChartUmurJenisKelaminData.rows[8].c[2].f = (self.barChartUmurJenisKelaminData.rows[8].c[2].v).toString()
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
