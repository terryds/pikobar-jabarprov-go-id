<template>
  <div class="container mx-auto">
    <div class="container mx-4 p-5 max-w-3xl mx-auto">
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
        Dashboard Kasus COVID-19 Provinsi Jawa Barat
      </h3>
      <span style="font-size: smaller;">*Terakhir diupdate 16 Maret 2020 12:00</span>
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
        <!-- <div
          class="p-1 col-md m-2 "
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #D6E6F7 !important; border: solid 1px #9BC8F4;"
        >
          <h4 class="ml-3 mt-3" style="color: #4F4F4F;">
            <b>PERAWATAN</b>
          </h4>
          <h3 class="ml-3" style="font-size: 30px;">
            <b>{{ jsonDataResult.perawatan }}</b>
          </h3>
          <GChart
            type="LineChart"
            :data="lineChartPerawatanData"
            :options="lineChartPerawatanOptions"
          />
        </div> -->
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
          <h4 class="m-3">
            <b>ODP (Orang Dalam Pemantauan)</b>
          </h4>
          <hr>
          <div class="row p-2">
            <div class="col-md m-2 mr-5">
              <span style="color: #0082ED; font-size: 30px; font-weight: bold;">{{ jsonDataResult.odp }}</span><br>
              <span style="color: #8A8A8A; font-weight: bold;">Total ODP</span>
            </div>
            <div class="col-md m-2">
              <span style="color: #0082ED; font-size: 30px; font-weight: bold;">{{ jsonDataResult.odp_proses }}</span>
              <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.pdp_proses_persen }}%)</span><br>
              <span style="color: #8A8A8A; font-weight: bold;">Proses Pemantauan</span>
            </div>
            <div class="col-md m-2">
              <span style="color: #0082ED; font-size: 30px; font-weight: bold;">{{ jsonDataResult.odp_selesai }}</span>
              <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.pdp_selesai_persen }}%)</span><br>
              <span style="color: #8A8A8A; font-weight: bold;">Selesai Pemantauan</span>
            </div>
          </div>
        </div>
        <div
          class="bg-white p-1 col-md m-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>PDP (Pasien Dalam Pengawasan)</b>
          </h4>
          <hr>
          <div class="row p-2">
            <div class="col-md m-2 mr-5">
              <span style="color: #FF4A4B; font-size: 30px; font-weight: bold;">{{ jsonDataResult.pdp }}</span><br>
              <span style="color: #8A8A8A; font-weight: bold;">Total PDP</span>
            </div>
            <div class="col-md m-2">
              <span style="color: #FF4A4B; font-size: 30px; font-weight: bold;">{{ jsonDataResult.pdp_proses }}</span>
              <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.pdp_proses_persen }}%)</span><br>
              <span style="color: #8A8A8A; font-weight: bold;">Masih Dirawat</span>
            </div>
            <div class="col-md m-2">
              <span style="color: #FF4A4B; font-size: 30px; font-weight: bold;">{{ jsonDataResult.pdp_selesai }}</span>
              <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.pdp_selesai_persen }}%)</span><br>
              <span style="color: #8A8A8A; font-weight: bold;">Pulang dan Sehat</span>
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
      lineChartPerawatanData: [
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
      lineChartPerawatanOptions: {
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
          0: { color: '#0082ED' }
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
        ['Wanita', 10],
        ['Pria', 20],
        ['Tidak Teridentifikasi', 10]
      ],
      pieChartJenisKelaminOptions: {
        height: 400,
        slices: {
          0: { color: '#FF7E7E' },
          1: { color: '#00CFF4' },
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
              { v: -1, f: '1%' },
              { v: 2, f: '2%' }
            ]
          },
          {
            c: [
              { v: 20, f: '11-20' },
              { v: -8, f: '8%' },
              { v: 5, f: '5%' }
            ]
          },
          {
            c: [
              { v: 30, f: '21-30' },
              { v: -12, f: '12%' },
              { v: 15, f: '15%' }
            ]
          },
          {
            c: [
              { v: 40, f: '31-40' },
              { v: -23, f: '23%' },
              { v: 15, f: '15%' }
            ]
          },
          {
            c: [
              { v: 50, f: '41-50' },
              { v: -19, f: '19%' },
              { v: 20, f: '20%' }
            ]
          },
          {
            c: [
              { v: 60, f: '51-60' },
              { v: -14, f: '14%' },
              { v: 17, f: '17%' }
            ]
          },
          {
            c: [
              { v: 70, f: '61-70' },
              { v: -29, f: '29%' },
              { v: 25, f: '25%' }
            ]
          },
          {
            c: [
              { v: 80, f: '71-80' },
              { v: -8, f: '8%' },
              { v: 7, f: '7%' }
            ]
          },
          {
            c: [
              { v: 100, f: '81-100' },
              { v: -3, f: '3%' },
              { v: 3, f: '3%' }
            ]
          }
        ]
      },
      barChartUmurJenisKelaminOptions: {
        height: 400,
        series: {
          0: { color: '#FF7E7E' },
          1: { color: '#00CFF4' },
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
          title: 'Umur'
        },
        viewWindowMode: 'explicit',
        viewWindow: {
          min: -100,
          max: 100
        }
      },
      jsonData: null,
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
        meninggal: 0
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const self = this
      axios
        .get('http://dashboard-pikobar.digitalservice.id/', {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then(function (response) {
          self.jsonData = response.data.gsheets_high_confidential_rekap_pasien
          // by status
          for (let i = 0; i < self.jsonData.length; i++) {
            if (self.jsonData[i].status === 'Positif') {
              self.jsonDataResult.positif += 1
            } else if (self.jsonData[i].status === 'ODP') {
              self.jsonDataResult.odp += 1
            } else if (self.jsonData[i].status === 'PDP') {
              self.jsonDataResult.pdp += 1
            }
          }
          // by jenis_kelamin
          let tempJenisKelaminPria = 0
          let tempJenisKelaminWanita = 0
          let tempJenisKelaminNull = 0
          for (let i = 0; i < self.jsonData.length; i++) {
            if (self.jsonData[i].jenis_kelamin_str === 'Laki-laki') {
              tempJenisKelaminPria += 1
            } else if (self.jsonData[i].jenis_kelamin_str === 'Perempuan') {
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
          console.log(self.pieChartJenisKelaminData)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
