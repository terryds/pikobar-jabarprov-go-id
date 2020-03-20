<template>
  <div
    class="bg-white p-1"
    style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
  >
    <h4 class="m-3">
      <b>Umur dan Jenis Kelamin</b>
    </h4>
    <hr>
    <GChart
      type="BarChart"
      :data="barChartUmurJenisKelaminData"
      :options="barChartUmurJenisKelaminOptions"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'

export default {
  name: 'BarStatUsia',
  components: {
    GChart
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
        total_positif_saat_ini: 0,
        total_sembuh: 0,
        total_meninggal: 0,
        last_update: '',
        umur_max: 0,
        count_kota: 0
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
        height: 350,
        marginRight: -100,
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
    fetchDataSatuan () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/analytics/longlat/')
        .then(function (response) {
          self.jsonDataResult.last_update = new Date(response.data.last_update).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'medium' })
          self.jsonDataSatuan = response.data.data

          // by jenis_kelamin
          let tempJenisKelaminPria = 0
          let tempJenisKelaminWanita = 0
          let tempJenisKelaminNull = 0
          for (let i = 0; i < self.jsonDataSatuan.length; i++) {
            if (self.jsonDataSatuan[i].status === 'ODP') {
              if (self.jsonDataSatuan[i].jenis_kelamin_str === 'Laki-laki') {
                tempJenisKelaminPria += 1
              } else if (self.jsonDataSatuan[i].jenis_kelamin_str === 'Perempuan') {
                tempJenisKelaminWanita += 1
              } else {
                tempJenisKelaminNull += 1
              }
            }
          }
          self.pieChartJenisKelaminData = [
            ['Jenis Kelamin', 'Data'],
            ['Pria', tempJenisKelaminPria],
            ['Wanita', tempJenisKelaminWanita],
            ['N/A', tempJenisKelaminNull]
          ]

          // by umur
          let max = 0
          for (let i = 0; i < self.jsonDataSatuan.length; i++) {
            if (self.jsonDataSatuan[i].status === 'ODP') {
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
          }
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
