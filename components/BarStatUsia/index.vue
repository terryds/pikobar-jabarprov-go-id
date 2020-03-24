<template>
  <div
    class="bg-white p-1"
    style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
  >
    <h4 class="m-3">
      <b>Umur dan Jenis Kelamin</b>
    </h4>
    <hr>
    <div class="row ml-2">
      <nuxt-link
        tag="a"
        style="border: 1px solid #2DAC55;"
        class="btn btn-sm m-1"
        :class="stat.isPositif ? 'btnActive' : 'btnNonActive'"
        to=""
        @click.native="changeGroupUsia('Positif')"
      >
        Positif
      </nuxt-link>
      <nuxt-link
        tag="a"
        style="border: 1px solid #2DAC55;"
        class="btn btn-sm m-1"
        :class="stat.isODP ? 'btnActive' : 'btnNonActive'"
        to=""
        @click.native="changeGroupUsia('ODP')"
      >
        ODP
      </nuxt-link>
      <nuxt-link
        tag="a"
        style="border: 1px solid #2DAC55;"
        class="btn btn-sm m-1"
        :class="stat.isPDP ? 'btnActive' : 'btnNonActive'"
        to=""
        @click.native="changeGroupUsia('PDP')"
      >
        PDP
      </nuxt-link>
    </div>
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
      stat: {
        isPositif: false,
        isODP: false,
        isPDP: true
      },
      jsonDataSebaranJabar: [
      ],
      barChartUmurJenisKelaminData: {
        cols: [
          { id: 'Umur', label: 'Umur', type: 'string' },
          { id: 'Pria', label: 'Pria', type: 'number' },
          { id: 'Wanita', label: 'Wanita', type: 'number' }
        ],
        rows: [
          {
            c: [
              { v: 100, f: '81-100' },
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
              { v: 70, f: '61-70' },
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
              { v: 50, f: '41-50' },
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
              { v: 30, f: '21-30' },
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
              { v: 10, f: '0-10' },
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
          format: ';',
          title: 'Umur',
          viewWindowMode: 'explicit',
          viewWindow: {
            min: 0
          },
          ticks: [
            { v: -10, f: '10' },
            { v: -25, f: '25' },
            { v: -50, f: '50' },
            { v: -100, f: '100' },
            { v: -200, f: '200' },
            { v: -500, f: '500' },
            0, 10, 25, 50, 100, 200, 500
          ]
        },
        chartArea: { width: '80%' }
      }
    }
  },
  created () {
    this.fetchDataSebaranJabar()
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
    fetchDataSebaranJabar () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/sebaran/jabar')
        .then(function (response) {
          self.jsonDataSebaranJabar = response.data.data.content

          // by jenis_kelamin
          let tempJenisKelaminPria = 0
          let tempJenisKelaminWanita = 0
          let tempJenisKelaminNull = 0
          for (let i = 0; i < self.jsonDataSebaranJabar.length; i++) {
            if (self.jsonDataSebaranJabar[i].status === 'ODP') {
              if (self.jsonDataSebaranJabar[i].gender === 'Laki-laki') {
                tempJenisKelaminPria += 1
              } else if (self.jsonDataSebaranJabar[i].gender === 'Perempuan') {
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
          self.changeGroupUsia('ODP')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    resetBarChartUmurJenisKelaminData () {
      this.barChartUmurJenisKelaminData = {
        cols: [
          { id: 'Umur', label: 'Umur', type: 'string' },
          { id: 'Pria', label: 'Pria', type: 'number' },
          { id: 'Wanita', label: 'Wanita', type: 'number' }
        ],
        rows: [
          {
            c: [
              { v: 100, f: '81-100' },
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
              { v: 70, f: '61-70' },
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
              { v: 50, f: '41-50' },
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
              { v: 30, f: '21-30' },
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
              { v: 10, f: '0-10' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          }
        ]
      }
    },
    changeGroupUsia (stat) {
      const self = this
      this.resetBarChartUmurJenisKelaminData()
      if (stat === 'Positif') {
        this.stat.isPositif = true
        this.stat.isODP = false
        this.stat.isPDP = false
      }
      if (stat === 'ODP') {
        this.stat.isPositif = false
        this.stat.isODP = true
        this.stat.isPDP = false
      }
      if (stat === 'PDP') {
        this.stat.isPositif = false
        this.stat.isODP = false
        this.stat.isPDP = true
      }
      let max = 0
      for (let i = 0; i < self.jsonDataSebaranJabar.length; i++) {
        if (self.jsonDataSebaranJabar[i].status === stat) {
          if (self.jsonDataSebaranJabar[i].umur > max) {
            max = self.jsonDataSebaranJabar[i].umur
            self.barChartUmurJenisKelaminOptions.hAxis.viewWindow.min = (max + 10) * -1
            self.barChartUmurJenisKelaminOptions.hAxis.viewWindow.max = max + 10
          }
          if (self.jsonDataSebaranJabar[i].gender === 'Laki-laki') {
            if ((self.jsonDataSebaranJabar[i].umur >= 0) && (self.jsonDataSebaranJabar[i].umur <= 10)) {
              self.barChartUmurJenisKelaminData.rows[8].c[1].v -= 1
              self.barChartUmurJenisKelaminData.rows[8].c[1].f = (self.barChartUmurJenisKelaminData.rows[8].c[1].v * -1).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 11) && (self.jsonDataSebaranJabar[i].umur <= 20)) {
              self.barChartUmurJenisKelaminData.rows[7].c[1].v -= 1
              self.barChartUmurJenisKelaminData.rows[7].c[1].f = (self.barChartUmurJenisKelaminData.rows[7].c[1].v * -1).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 21) && (self.jsonDataSebaranJabar[i].umur <= 30)) {
              self.barChartUmurJenisKelaminData.rows[6].c[1].v -= 1
              self.barChartUmurJenisKelaminData.rows[6].c[1].f = (self.barChartUmurJenisKelaminData.rows[6].c[1].v * -1).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 31) && (self.jsonDataSebaranJabar[i].umur <= 40)) {
              self.barChartUmurJenisKelaminData.rows[5].c[1].v -= 1
              self.barChartUmurJenisKelaminData.rows[5].c[1].f = (self.barChartUmurJenisKelaminData.rows[5].c[1].v * -1).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 41) && (self.jsonDataSebaranJabar[i].umur <= 50)) {
              self.barChartUmurJenisKelaminData.rows[4].c[1].v -= 1
              self.barChartUmurJenisKelaminData.rows[4].c[1].f = (self.barChartUmurJenisKelaminData.rows[4].c[1].v * -1).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 51) && (self.jsonDataSebaranJabar[i].umur <= 60)) {
              self.barChartUmurJenisKelaminData.rows[3].c[1].v -= 1
              self.barChartUmurJenisKelaminData.rows[3].c[1].f = (self.barChartUmurJenisKelaminData.rows[3].c[1].v * -1).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 61) && (self.jsonDataSebaranJabar[i].umur <= 70)) {
              self.barChartUmurJenisKelaminData.rows[2].c[1].v -= 1
              self.barChartUmurJenisKelaminData.rows[2].c[1].f = (self.barChartUmurJenisKelaminData.rows[2].c[1].v * -1).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 71) && (self.jsonDataSebaranJabar[i].umur <= 80)) {
              self.barChartUmurJenisKelaminData.rows[1].c[1].v -= 1
              self.barChartUmurJenisKelaminData.rows[1].c[1].f = (self.barChartUmurJenisKelaminData.rows[1].c[1].v * -1).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 81) && (self.jsonDataSebaranJabar[i].umur <= 100)) {
              self.barChartUmurJenisKelaminData.rows[0].c[1].v -= 1
              self.barChartUmurJenisKelaminData.rows[0].c[1].f = (self.barChartUmurJenisKelaminData.rows[0].c[1].v * -1).toString()
            }
          } else if (self.jsonDataSebaranJabar[i].gender === 'Perempuan') {
            if ((self.jsonDataSebaranJabar[i].umur >= 0) && (self.jsonDataSebaranJabar[i].umur <= 10)) {
              self.barChartUmurJenisKelaminData.rows[8].c[2].v += 1
              self.barChartUmurJenisKelaminData.rows[8].c[2].f = (self.barChartUmurJenisKelaminData.rows[8].c[2].v).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 11) && (self.jsonDataSebaranJabar[i].umur <= 20)) {
              self.barChartUmurJenisKelaminData.rows[7].c[2].v += 1
              self.barChartUmurJenisKelaminData.rows[7].c[2].f = (self.barChartUmurJenisKelaminData.rows[7].c[2].v).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 21) && (self.jsonDataSebaranJabar[i].umur <= 30)) {
              self.barChartUmurJenisKelaminData.rows[6].c[2].v += 1
              self.barChartUmurJenisKelaminData.rows[6].c[2].f = (self.barChartUmurJenisKelaminData.rows[6].c[2].v).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 31) && (self.jsonDataSebaranJabar[i].umur <= 40)) {
              self.barChartUmurJenisKelaminData.rows[5].c[2].v += 1
              self.barChartUmurJenisKelaminData.rows[5].c[2].f = (self.barChartUmurJenisKelaminData.rows[5].c[2].v).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 41) && (self.jsonDataSebaranJabar[i].umur <= 50)) {
              self.barChartUmurJenisKelaminData.rows[4].c[2].v += 1
              self.barChartUmurJenisKelaminData.rows[4].c[2].f = (self.barChartUmurJenisKelaminData.rows[4].c[2].v).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 51) && (self.jsonDataSebaranJabar[i].umur <= 60)) {
              self.barChartUmurJenisKelaminData.rows[3].c[2].v += 1
              self.barChartUmurJenisKelaminData.rows[3].c[2].f = (self.barChartUmurJenisKelaminData.rows[3].c[2].v).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 61) && (self.jsonDataSebaranJabar[i].umur <= 70)) {
              self.barChartUmurJenisKelaminData.rows[2].c[2].v += 1
              self.barChartUmurJenisKelaminData.rows[2].c[2].f = (self.barChartUmurJenisKelaminData.rows[2].c[2].v).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 71) && (self.jsonDataSebaranJabar[i].umur <= 80)) {
              self.barChartUmurJenisKelaminData.rows[1].c[2].v += 1
              self.barChartUmurJenisKelaminData.rows[1].c[2].f = (self.barChartUmurJenisKelaminData.rows[1].c[2].v).toString()
            } else if ((self.jsonDataSebaranJabar[i].umur >= 81) && (self.jsonDataSebaranJabar[i].umur <= 100)) {
              self.barChartUmurJenisKelaminData.rows[0].c[2].v += 1
              self.barChartUmurJenisKelaminData.rows[0].c[2].f = (self.barChartUmurJenisKelaminData.rows[0].c[2].v).toString()
            }
          }
        }
      }
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
