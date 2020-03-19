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
            <div style="margin-top: auto;">
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
            <div style="margin-top: auto;">
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
          class="bg-white p-1 col-md m-2 row"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
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
        </div>
      </section>

      <section class="row">
        <div
          class="bg-white p-1 col-lg-5 col-md col-sm col-xs m-2"
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
            <b>Umur dan Jenis Kelamin</b>
          </h4>
          <hr>
          <GChart
            type="BarChart"
            :data="barChartUmurJenisKelaminData"
            :options="barChartUmurJenisKelaminOptions"
          />
        </div>
      </section>

      <nuxt-link
        tag="a"
        style="border: 1px solid #2DAC55;"
        class="block md:inline-block md:w-auto p-3 m-1 rounded-md text-center btnActive font-bold"
        :class="stat.isActiveHarian ? 'btnActive' : 'btnNonActive'"
        to=""
        @click.native="enableHarian"
      >
        <font-awesome-icon :icon="fontChartBar" /> Angka Harian
      </nuxt-link>
      <nuxt-link
        tag="a"
        style="border: 1px solid #2DAC55;"
        class="block md:inline-block md:w-auto p-3 m-1 rounded-md text-center btnNonAktive font-bold"
        :class="stat.isActiveAkumulatif ? 'btnActive' : 'btnNonActive'"
        to=""
        @click.native="enableAkumulatif"
      >
        <font-awesome-icon :icon="fontChartLine" /> Akumulatif
      </nuxt-link>

      <section v-if="stat.isActiveHarian" class="row">
        <div
          class="bg-white p-1 col-md m-2"
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
        <div
          class="bg-white p-1 col-md m-2"
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
      </section>

      <section v-if="stat.isActiveAkumulatif" class="row">
        <div
          class="bg-white p-1 col-md m-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>Akumulatif ODP</b><br>
            <b style="color: #828282;">(Orang Dalam Pemantauan)</b>
          </h4>
          <hr>
          &nbsp;
        </div>
        <div
          class="bg-white p-1 col-md m-2"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>Akumulatif PDP</b><br>
            <b style="color: #828282;">(Pasien Dalam Pengawasan)</b>
          </h4>
          <hr>
          &nbsp;
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons'
import MapView from '~/components/MapView'

export default {
  components: {
    GChart,
    MapView,
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
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3217',
          nama: 'Kab. Bandung Barat',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3216',
          nama: 'Kab. Bekasi',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3201',
          nama: 'Kab. Bogor',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3207',
          nama: 'Kab. Ciamis',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3203',
          nama: 'Kab. Cianjur',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3209',
          nama: 'Kab. Cirebon',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3205',
          nama: 'Kab. Garut',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3212',
          nama: 'Kab. Indramayu',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3215',
          nama: 'Kab. Karawang',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3208',
          nama: 'Kab. Kuningan',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3210',
          nama: 'Kab. Majalengka',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3218',
          nama: 'Kab. Pangandaran',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3214',
          nama: 'Kab. Purwarkarta',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3213',
          nama: 'Kab. Subang',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3202',
          nama: 'Kab. Sukabumi',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3211',
          nama: 'Kab. Sumedang',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3206',
          nama: 'Kab. Tasikmalaya',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3273',
          nama: 'Kota Bandung',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3279',
          nama: 'Kota Banjar',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3275',
          nama: 'Kota Bekasi',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3271',
          nama: 'Kota Bogor',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3277',
          nama: 'Kota Cimahi',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3274',
          nama: 'Kota Cirebon',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3276',
          nama: 'Kota Depok',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3272',
          nama: 'Kota Sukabumi',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        },
        {
          kode: '3278',
          nama: 'Kota Tasikmalaya',
          jumlah_positif: 0,
          jumlah_positif_persentase: 0,
          jumlah_odp: 0,
          jumlah_odp_persentase: 0,
          jumlah_pdp: 0,
          jumlah_pdp_persentase: 0
        }
      ],
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
        },
        tooltip: {
          trigger: 'none'
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
        },
        tooltip: {
          trigger: 'none'
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
        },
        tooltip: {
          trigger: 'none'
        }
      },
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
        pieHole: 0.4
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
      },
      barChartHarianODPData: [
        ['Tanggal', 'Selesai Pemantauan', 'Proses Pemantauan']
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
        }
      },
      barChartHarianPDPData: [
        ['Tanggal', 'Selesai Pengawasan', 'Proses Pengawasan']
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
        }
      }
    }
  },
  created () {
    this.fetchDataRekap()
    this.fetchDataSatuan()
  },
  methods: {
    enableHarian () {
      this.stat.isActiveHarian = true
      this.stat.isActiveAkumulatif = false
      console.log('harian')
    },
    enableAkumulatif () {
      this.stat.isActiveHarian = false
      this.stat.isActiveAkumulatif = true
      console.log('akumulatif')
    },
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

          // series
          let stop = false
          for (let i = 0; i < self.jsonDataRekap.length; i++) {
            if (stop === false) {
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
            }
            if (self.jsonDataRekap[i].tanggal === strToday) {
              stop = true
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

.btnActive {
  color: #ffffff;
  background-color: #2DAC55;
}
.btnNonActive {
  color: #2DAC55;
  background-color: #FFFFFF;
}
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
</style>
