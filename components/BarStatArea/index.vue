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

    <div v-if="stat.isActiveHarian" class="row mt-2 mb-2 p3">
      <div style="overflow-x: auto; width: 100%; height: 100%; display: flex;">
        <div
          class="bg-white m-2 p-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05)"
        >
          <div class="row m-1">
            <span style="width: 50%">
              <h4 style="color: #828282; font-weight: bolder;">
                Nasional
              </h4>
            </span>
            <span style="width: 50%">
              <h4 style="color: #000000; font-weight: bolder; text-align: right; margin-right: 20px;">
                ({{ dataTotalPositifAll[0] }})
              </h4>
            </span>
          </div>
          <GChart
            type="BarChart"
            :data="ChartNasionalDataHarian"
            :options="barChartNasionalOptions"
          />
        </div>
        <div
          class="bg-white m-2 p-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05)"
        >
          <div class="row m-1">
            <span style="width: 50%">
              <h4 style="color: #828282; font-weight: bolder;">
                Jawa Barat
              </h4>
            </span>
            <span style="width: 50%">
              <h4 style="color: #000000; font-weight: bolder; text-align: right; margin-right: 20px;">
                ({{ dataTotalPositifAll[1] }})
              </h4>
            </span>
          </div>
          <GChart
            type="BarChart"
            :data="ChartJawaBaratDataHarian"
            :options="barChartNasionalOptions"
          />
        </div>
        <div
          v-for="(item, index) in jsonDataKota"
          :key="item.kode"
          class="bg-white m-2 p-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05)"
        >
          <div class="row m-1">
            <div style="width: 50%">
              <h4 style="color: #828282; font-weight: bolder;">
                {{ item.nama }}
              </h4>
            </div>
            <div style="width: 50%">
              <h4 style="text-align: right; margin-right: 20px;">
                <span style="color: #4FB769; font-weight: bolder;">{{ item.jumlah_positif_persentase }} %</span>
                <span style="color: #000000; font-weight: bolder;">({{ item.jumlah_positif }})</span>
              </h4>
            </div>
          </div>
          <GChart
            type="BarChart"
            :data="jsonDataKota[index].dataHarian"
            :options="barChartNasionalOptions"
          />
        </div>
      </div>
    </div>

    <div v-if="stat.isActiveAkumulatif" class="row mt-2 mb-2 p3">
      <div style="overflow-x: auto; width: 100%; height: 100%; display: flex;">
        <div
          class="bg-white m-2 p-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05)"
        >
          <div class="row m-1">
            <span style="width: 50%">
              <h4 style="color: #828282; font-weight: bolder;">
                Nasional
              </h4>
            </span>
            <span style="width: 50%">
              <h4 style="color: #000000; font-weight: bolder; text-align: right; margin-right: 20px;">
                ({{ dataTotalPositifAll[0] }})
              </h4>
            </span>
          </div>
          <GChart
            type="LineChart"
            :data="ChartNasionalDataAkumulatif"
            :options="lineChartNasionalOptions"
          />
        </div>
        <div
          class="bg-white m-2 p-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05)"
        >
          <div class="row m-1">
            <span style="width: 50%">
              <h4 style="color: #828282; font-weight: bolder;">
                Jawa Barat
              </h4>
            </span>
            <span style="width: 50%">
              <h4 style="color: #000000; font-weight: bolder; text-align: right; margin-right: 20px;">
                ({{ dataTotalPositifAll[1] }})
              </h4>
            </span>
          </div>
          <GChart
            type="LineChart"
            :data="ChartJawaBaratDataAkumulatif"
            :options="lineChartNasionalOptions"
          />
        </div>
        <div
          v-for="(item, index) in jsonDataKota"
          :key="item.kode"
          class="bg-white m-2 p-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05)"
        >
          <div class="row m-1">
            <div style="width: 50%">
              <h4 style="color: #828282; font-weight: bolder;">
                {{ item.nama }}
              </h4>
            </div>
            <div style="width: 50%">
              <h4 style="text-align: right; margin-right: 20px;">
                <span style="color: #4FB769; font-weight: bolder;">{{ item.jumlah_positif_persentase }} %</span>
                <span style="color: #000000; font-weight: bolder;">({{ item.jumlah_positif }})</span>
              </h4>
            </div>
          </div>
          <GChart
            type="LineChart"
            :data="jsonDataKota[index].dataAkumulatif"
            :options="lineChartNasionalOptions"
          />
        </div>
      </div>
    </div>

    <!-- <div
      class="bg-white p-1 col-md m-2 row"
      style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05)"
    >
      <div class="bg-white p-1 col-md-3 col-sm-12">
        <h4 class="m-3 mb-0" style="margin-bottom: 0px !important; font-size: 15px;">
          <b>Area Terdampak Covid-19</b>
        </h4>
        <span class="m-3" style="color: #000000; font-weight: bold; font-size: 32px; margin-top: 0px !important; margin-right: 0px !important;">
          {{ jsonDataResult.count_kota }}
        </span>
        <span class="m-1" style="color: #8A8A8A; font-weight: bold; margin-top: 0px !important;">Kota/Kab</span>
      </div>
      <div
        class="bg-white p-1 col-md-9 col-sm-12 div-no-mobile"
        style="overflow-x: auto; width: 210px; display: flex;"
      >
        <div
          v-for="item in jsonDataKota"
          :key="item.kode"
          class="bg-white pl-3 pt-2 pb-2 col-md-3 m-1"
          style="border-radius: 0.8rem; border: 1.5px solid #CDD0D3;"
        >
          <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">{{ item.nama }}</span><br>
          <span style="color: #00B167; font-weight: bold;">{{ item.jumlah_positif_persentase }}%</span>
          <span style="color: #000000; font-weight: bold;">({{ item.jumlah_positif }})</span>
        </div>
      </div>
      <div
        class="bg-white p-1 col-md-9 col-sm-12 div-only-mobile"
        style="overflow-y: auto; display: flex;"
      >
        <div
          v-for="item in jsonDataKota"
          :key="item.kode"
          class="bg-white pl-3 pt-2 pb-2 col-md-3 m-1"
          style="border-radius: 0.8rem; border: 1.5px solid #CDD0D3;"
        >
          <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">{{ item.nama }}</span><br>
          <span style="color: #00B167; font-weight: bold;">{{ item.jumlah_positif_persentase }}%</span>
          <span style="color: #000000; font-weight: bold;">({{ item.jumlah_positif }})</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'BarStatArea',
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
      jsonDataNasional: [
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
      jsonDataKota: [
        {
          kode: '3204',
          nama: 'Kab. Bandung',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3217',
          nama: 'Kab. Bandung Barat',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3216',
          nama: 'Kab. Bekasi',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3201',
          nama: 'Kab. Bogor',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3207',
          nama: 'Kab. Ciamis',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3203',
          nama: 'Kab. Cianjur',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3209',
          nama: 'Kab. Cirebon',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3205',
          nama: 'Kab. Garut',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3212',
          nama: 'Kab. Indramayu',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3215',
          nama: 'Kab. Karawang',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3208',
          nama: 'Kab. Kuningan',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3210',
          nama: 'Kab. Majalengka',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3218',
          nama: 'Kab. Pangandaran',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3214',
          nama: 'Kab. Purwarkarta',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3213',
          nama: 'Kab. Subang',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3202',
          nama: 'Kab. Sukabumi',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3211',
          nama: 'Kab. Sumedang',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3206',
          nama: 'Kab. Tasikmalaya',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3273',
          nama: 'Kota Bandung',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3279',
          nama: 'Kota Banjar',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3275',
          nama: 'Kota Bekasi',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3271',
          nama: 'Kota Bogor',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3277',
          nama: 'Kota Cimahi',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3274',
          nama: 'Kota Cirebon',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3276',
          nama: 'Kota Depok',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3272',
          nama: 'Kota Sukabumi',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        },
        {
          kode: '3278',
          nama: 'Kota Tasikmalaya',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0,
          dataHarian: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        }
      ],
      dataTotalPositifAll: [
        0, 0
      ],
      ChartNasionalDataHarian: [
        ['Tanggal', 'Kasus Positif'],
        ['0', 0]
      ],
      ChartNasionalDataAkumulatif: [
        ['Tanggal', 'Kasus Positif'],
        ['0', 0]
      ],
      ChartJawaBaratDataHarian: [
        ['Tanggal', 'Kasus Positif'],
        ['0', 0]
      ],
      ChartJawaBaratDataAkumulatif: [
        ['Tanggal', 'Kasus Positif'],
        ['0', 0]
      ],
      barChartNasionalOptions: {
        height: 200,
        width: 250,
        orientation: 'horizontal',
        colors: ['#6DD274'],
        legend: {
          position: 'none'
        },
        isStacked: true,
        seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        chartArea: {
          width: '80%',
          bottom: 50
        }
      },
      lineChartNasionalOptions: {
        height: 200,
        width: 250,
        orientation: 'horizontal',
        colors: ['#6DD274'],
        legend: {
          position: 'none',
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
          bottom: 50
        }
      }
    }
  },
  created () {
    this.fetchDataSatuan()
    this.fetchDataNasional()
    this.fetchDataJawaBarat()
  },
  methods: {
    ifNullReturnZero (str) {
      if (str === null) {
        return 0
      } else if (str === '') {
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
    compareValues (key, order = 'asc') {
      return function innerSort (a, b) {
        // eslint-disable-next-line no-prototype-builtins
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0
        }

        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key]
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key]

        let comparison = 0
        if (varA > varB) {
          comparison = 1
        } else if (varA < varB) {
          comparison = -1
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        )
      }
    },
    enableHarian () {
      this.stat.isActiveHarian = true
      this.stat.isActiveAkumulatif = false
    },
    enableAkumulatif () {
      this.stat.isActiveHarian = false
      this.stat.isActiveAkumulatif = true
    },
    fetchDataNasional () {
      const self = this
      axios
        .get('https://indonesia-covid-19.mathdro.id/api/harian')
        .then(function (response) {
          self.jsonDataNasional = response.data.data

          for (let i = 0; i < self.jsonDataNasional.length; i++) {
            const date = new Date(self.jsonDataNasional[i].tanggal)
            // by Harian
            self.ChartNasionalDataHarian.push([self.formatDate(date), self.jsonDataNasional[i].jumlahKasusBaruperHari])
            // by Akumulatif
            self.ChartNasionalDataAkumulatif.push([self.formatDate(date), self.jsonDataNasional[i].jumlahKasusKumulatif])
          }
          self.dataTotalPositifAll[0] = self.jsonDataNasional[self.jsonDataNasional.length - 1].jumlahKasusKumulatif
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataJawaBarat () {
      const self = this
      const today = new Date()
      // const strToday = self.formatDate(today)
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)
      const strYesteday = self.formatDate(yesterday)

      axios
        .get('https://covid19-public.digitalservice.id/analytics/aggregation/')
        .then(function (response) {
          self.jsonDataRekap = response.data

          // series
          let stop = false
          for (let i = 0; i < self.jsonDataRekap.length; i++) {
            if (stop === false) {
              // by harian
              self.ChartJawaBaratDataHarian.push([
                self.jsonDataRekap[i].tanggal,
                self.ifNullReturnZero(self.jsonDataRekap[i].positif)
              ])
              // by akumulatif
              self.ChartJawaBaratDataAkumulatif.push([
                self.jsonDataRekap[i].tanggal,
                self.ifNullReturnZero(self.jsonDataRekap[i].total_positif_saat_ini)
              ])
            }
            if (self.jsonDataRekap[i].tanggal === strYesteday) {
              stop = true
            }
          }

          self.dataTotalPositifAll[1] = self.jsonDataRekap[self.jsonDataRekap.length - 1].total_positif_saat_ini
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataSatuan () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/analytics/longlat/')
        .then(function (response) {
          self.jsonDataResult.last_update = new Date(response.data.last_update).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'medium' })
          self.jsonDataSatuan = response.data.data

          // count total
          let totalPositif = 0
          let totalOdp = 0
          let totalPdp = 0
          for (let i = 0; i < self.jsonDataSatuan.length; i++) {
            if (self.jsonDataSatuan[i].status === 'Positif') {
              totalPositif += 1
            }
            if (self.jsonDataSatuan[i].status === 'ODP') {
              totalOdp += 1
            }
            if (self.jsonDataSatuan[i].status === 'PDP') {
              totalPdp += 1
            }
          }
          if (self.jsonDataResult.positif === 0) {
            self.jsonDataResult.positif = totalPositif
          }

          // by Kota
          for (let i = 0; i < self.jsonDataSatuan.length; i++) {
            for (let j = 0; j < self.jsonDataKota.length; j++) {
              if (self.jsonDataSatuan[i].kode_kabkot === self.jsonDataKota[j].kode.toString()) {
                if (self.jsonDataSatuan[i].status === 'Positif') {
                  self.jsonDataKota[j].jumlah_positif += 1
                  self.jsonDataKota[j].jumlah_positif_persentase = ((self.jsonDataKota[j].jumlah_positif / totalPositif) * 100).toFixed(2)
                } else if (self.jsonDataSatuan[i].status === 'ODP') {
                  self.jsonDataKota[j].jumlah_odp += 1
                  self.jsonDataKota[j].jumlah_odp_persentase = ((self.jsonDataKota[j].jumlah_odp / totalOdp) * 100).toFixed(2)
                } else if (self.jsonDataSatuan[i].status === 'PDP') {
                  self.jsonDataKota[j].jumlah_pdp += 1
                  self.jsonDataKota[j].jumlah_pdp_persentase = ((self.jsonDataKota[j].jumlah_pdp / totalPdp) * 100).toFixed(2)
                }
              }
            }
          }
          self.jsonDataKota.sort(self.compareValues('jumlah_positif', 'desc'))

          // count kota
          for (let j = 0; j < self.jsonDataKota.length; j++) {
            if (self.jsonDataKota[j].jumlah_positif > 0) {
              self.jsonDataResult.count_kota += 1
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

<style lang="scss" scoped>

.div-only-mobile {
    display: none !important;
}
.div-no-mobile {
    display: flex !important;
}
@media screen and (max-width: 549px) {

  .div-no-mobile {
      display:none !important;
  }

  .div-only-mobile {
      display: flex !important;
  }

}
.btnActive {
  color: #ffffff;
  background-color: #2DAC55;
}
.btnNonActive {
  color: #2DAC55;
  background-color: #FFFFFF;
}
</style>
