<template>
  <div class="row">
    <div
      class="bg-white p-1 col-md m-1 mt-2"
      style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
    >
      <h3 class="m-3" style="font-size: 23px !important;">
        <b>ODP (Orang Dalam Pemantauan)</b>
      </h3>
      <hr>
      <div class="row p-2">
        <div style="margin-top: auto;">
          <div class="col-md m-2 mr-4">
            <span style="color: #2DAC55; font-size: 34px; font-weight: bold;">{{ jsonDataResult.odp_proses }}</span>
            <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.odp_proses_persen }}%)</span><br>
            <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Proses Pemantauan</span>
          </div>
        </div>
        <div style="margin-top: auto;">
          <div class="col-md m-2 mr-4">
            <span style="color: #2DAC55; font-size: 27px; font-weight: bold;">{{ jsonDataResult.odp_selesai }}</span>
            <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.odp_selesai_persen }}%)</span><br>
            <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Selesai Pemantauan</span>
          </div>
        </div>
        <div style="margin-top: auto;">
          <div class="col-md m-2 mr-4">
            <span style="color: #2DAC55; font-size: 27px; font-weight: bold;">{{ jsonDataResult.odp }}</span><br>
            <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Total ODP</span>
          </div>
        </div>
      </div>
      <div class="row p-2 m-1">
        <span><b>Keterangan : </b></span>
        <span style="margin-top: 5px; text-align: justify;">
          <b>ODP</b> adalah singkatan dari <b>Orang Dalam Pemantauan.</b> Seseorang dikatakan masuk dalam kategori ODP apabila ia sempat berpergian ke negara lain yang merupakan
          pusat penyebaran virus corona. Anda juga akan masuk sebagai ODP apabila pernah berkontak langsung dengan pasien yang postifi corona. Orang yang masuk dalam kelompon ini
          adalah mereka yang belum menunjukkan gejala sakit.
        </span>
      </div>
    </div>
    <div
      class="bg-white p-1 col-md m-1 mt-2"
      style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
    >
      <h4 class="m-3" style="font-size: 23px !important;">
        <b>PDP (Pasien Dalam Pengawasan)</b>
      </h4>
      <hr>
      <div class="row p-2">
        <div style="margin-top: auto;">
          <div class="col-md m-2 mr-4">
            <span style="color: #2DAC55; font-size: 34px; font-weight: bold;">{{ jsonDataResult.pdp_proses }}</span>
            <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.pdp_proses_persen }}%)</span><br>
            <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Proses Pengawasan</span>
          </div>
        </div>
        <div style="margin-top: auto;">
          <div class="col-md m-2 mr-4">
            <span style="color: #2DAC55; font-size: 27px; font-weight: bold;">{{ jsonDataResult.pdp_selesai }}</span>
            <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.pdp_selesai_persen }}%)</span><br>
            <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Selesai Pengawasan</span>
          </div>
        </div>
        <div style="margin-top: auto;">
          <div class="col-md m-2 mr-4">
            <span style="color: #2DAC55; font-size: 27px; font-weight: bold;">{{ jsonDataResult.pdp }}</span><br>
            <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Total PDP</span>
          </div>
        </div>
      </div>
      <div class="row p-2 m-1">
        <span><b>Keterangan : </b></span>
        <span style="margin-top: 5px; text-align: justify;">
          <b>PDP</b> adalah singkatan dari <b>Pasien Dalam Pengawasan.</b> Artinya, orang yang masuk ke dalam kategori ini sudah dirawat oleh tenaga
          kesehatan (menjadi pasien) dan menunjukkan gejala sakit seperti demam, batuk, pilek dan sesak napas.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BarStatDetail',
  components: {
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
        total_positif_saat_ini: 0,
        total_sembuh: 0,
        total_meninggal: 0,
        last_update: '',
        umur_max: 0,
        count_kota: 0
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
    fetchDataRekap () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)

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
