<template>
  <div
    class="bg-white p-1"
    style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
  >
    <h4 class="m-3">
      <b>Jenis Kelamin</b>
    </h4>
    <hr>
    <div class="row ml-2">
      <nuxt-link
        tag="a"
        style="border: 1px solid #2DAC55;"
        class="btn btn-sm m-1"
        :class="stat.isPositif ? 'btnActive' : 'btnNonActive'"
        to=""
        @click.native="changeGroupJenisKelamin('Positif')"
      >
        Positif
      </nuxt-link>
      <nuxt-link
        tag="a"
        style="border: 1px solid #2DAC55;"
        class="btn btn-sm m-1"
        :class="stat.isODP ? 'btnActive' : 'btnNonActive'"
        to=""
        @click.native="changeGroupJenisKelamin('ODP')"
      >
        ODP
      </nuxt-link>
      <nuxt-link
        tag="a"
        style="border: 1px solid #2DAC55;"
        class="btn btn-sm m-1"
        :class="stat.isPDP ? 'btnActive' : 'btnNonActive'"
        to=""
        @click.native="changeGroupJenisKelamin('PDP')"
      >
        PDP
      </nuxt-link>
    </div>
    <GChart
      type="PieChart"
      :data="pieChartJenisKelaminData"
      :options="pieChartJenisKelaminOptions"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'

export default {
  name: 'BarStatJenisKelamin',
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
      jsonDataSebaranJabar: [],
      pieChartJenisKelaminData: [
        ['Jenis Kelamin', 'Data'],
        ['Pria', 0],
        ['Wanita', 0],
        ['N/A', 0]
      ],
      pieChartJenisKelaminOptions: {
        height: 350,
        widht: 350,
        slices: {
          0: { color: '#2DAC55' },
          1: { color: '#F6D039' },
          2: { color: '#7D7D7D' }
        },
        legend: {
          position: 'bottom'
        },
        pieHole: 0.4,
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
          self.changeGroupJenisKelamin('ODP')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    resetPieChartJenisKelaminData () {
      this.pieChartJenisKelaminData = [
        ['Jenis Kelamin', 'Data'],
        ['Pria', 0],
        ['Wanita', 0],
        ['N/A', 0]
      ]
    },
    changeGroupJenisKelamin (stat) {
      const self = this
      this.resetPieChartJenisKelaminData()
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
      let tempJenisKelaminPria = 0
      let tempJenisKelaminWanita = 0
      let tempJenisKelaminNull = 0
      for (let i = 0; i < self.jsonDataSebaranJabar.length; i++) {
        if (self.jsonDataSebaranJabar[i].status === stat) {
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
