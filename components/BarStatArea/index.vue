<template>
  <div class="row">
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BarStatArea',
  components: {
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
      ]
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
</style>
