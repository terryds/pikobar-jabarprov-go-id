<template>
  <div style="width:100%; height:100%">
    <div id="corona-filter" class="esri-widget">
      <div class="corona-item visible-corona" data-corona="Semua">Semua Status</div>
      <div class="corona-item visible-corona" data-corona="Positif">Positif</div>
      <div class="corona-item visible-corona" data-corona="PDP">PDP</div>
      <div class="corona-item visible-corona" data-corona="ODP">ODP</div>
    </div>
    <div id="map" />
    <div class="disclaimer" v-if="!isHidden">
    <div class="backdrop" />
      <div class="text-disclaimer">
        <div class="title">Peta Sebaran Kasus COVID-19 di Jawa Barat</div>
        <div class="subtitle">Sumber: Dinas Kesehatan Provinsi Jawa Barat | Update 16 Maret 2020</div>
        <div class="description mt-2">
          <b>Titik lokasi merupakan titik acak (random by system) wilayah yang tertera pada identitas kasus dan tidak menunjuk pada alamat persis masing-masing kasus, data yang ditampilkan akan terus diperbarui sesuai dengan informasi yang diterima melalui Pemerintah Provinsi Jawa</b>
        </div>
        <button class="btn btn-success mt-3" style="color: #fff" v-on:click="isHidden = !isHidden"><b>Lihat Peta</b></button>
      </div>
    </div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader'
import axios from 'axios'
import kotaGeojson from '~/static/kota.json'

export default {
  name: 'MapView',
  components: {
  },
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' }
      ]
    }
  },
  data () {
    return {
      kotaGeojson,
      isHidden: false,
      jsonDataSatuan: [],
      jsonDataKota: [
        {
          kode: '3204',
          nama: 'Kab. Bandung',
          jumlah_positif: 0,
          jumlah_odp: 0,
          jumlah_pdp: 0
        },
        {
          kode: '3217',
          nama: 'Kab. Bandung Barat',
          jumlah_positif: 0,
          jumlah_odp: 0,
          jumlah_pdp: 0
        },
        {
          kode: '3216',
          nama: 'Kab. Bekasi',
          jumlah_positif: 0,
          jumlah_odp: 0,
          jumlah_pdp: 0
        },
        {
          kode: '3201',
          nama: 'Kab. Bogor',
          jumlah_positif: 0,
          jumlah_odp: 0,
          jumlah_pdp: 0
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
      maxPasien: {
        positif: 0,
        pdp: 0,
        odp: 0
      }
    }
  },
  created () {
  },
  mounted () {
    this.fetchDataSatuan()
  },
  methods: {
    fetch () {
      let j = 0
      this.kotaGeojson.features.forEach((element) => {
        const pasienCorona = this.jsonDataKota.find(x => x.kode === element.properties.bps_kode)
        this.kotaGeojson.features[j].properties.jumlah_positif = pasienCorona.jumlah_positif
        this.kotaGeojson.features[j].properties.jumlah_odp = pasienCorona.jumlah_odp
        this.kotaGeojson.features[j].properties.jumlah_pdp = pasienCorona.jumlah_pdp

        if (this.maxPasien.positif < pasienCorona.jumlah_positif) {
          this.maxPasien.positif = pasienCorona.jumlah_positif
        }

        if (this.maxPasien.pdp < pasienCorona.jumlah_pdp) {
          this.maxPasien.pdp = pasienCorona.jumlah_pdp
        }

        if (this.maxPasien.odp < pasienCorona.jumlah_odp) {
          this.maxPasien.odp = pasienCorona.jumlah_odp
        }
        j++
      })
      this.createMap()
    },
    fetchDataSatuan () {
      const self = this
      axios
        .get('https://coredata.jabarprov.go.id/analytics/covid19/longlat/')
        .then(function (response) {
          self.jsonDataSatuan = response.data.data

          // by Kota
          for (let i = 0; i < self.jsonDataSatuan.length; i++) {
            for (let j = 0; j < self.jsonDataKota.length; j++) {
              if (self.jsonDataSatuan[i].kode_kabkot === self.jsonDataKota[j].kode.toString()) {
                if (self.jsonDataSatuan[i].status === 'Positif') {
                  self.jsonDataKota[j].jumlah_positif += 1
                } else if (self.jsonDataSatuan[i].status === 'ODP') {
                  self.jsonDataKota[j].jumlah_odp += 1
                } else if (self.jsonDataSatuan[i].status === 'PDP') {
                  self.jsonDataKota[j].jumlah_pdp += 1
                }
              }
            }
          }
          self.fetch()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createMap () {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Map', 'esri/Graphic', 'esri/PopupTemplate', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/Legend', 'esri/geometry/Point', 'esri/symbols/SimpleMarkerSymbol', 'esri/widgets/Expand', 'esri/renderers/UniqueValueRenderer', 'esri/geometry/Polygon', 'esri/layers/GeoJSONLayer', 'esri/symbols/SimpleFillSymbol', 'esri/layers/GraphicsLayer'], { css: true }).then(([ArcGISMap, Graphic, PopupTemplate, MapView, FeatureLayer, Legend, Point, SimpleMarkerSymbol, Expand, UniqueValueRenderer, Polygon, GeoJSONLayer, SimpleFillSymbol, GraphicsLayer]) => {
        const maps = new ArcGISMap({
          basemap: 'topo-vector'
        })
        this.view = new MapView({
          container: 'map',
          map: maps,
          center: [107.609810, -6.914744],
          zoom: 8
        })
        this.view.ui.move('zoom', 'bottom-right')
        const simpleSymbol = {
          positif: [],
          pdp: [],
          odp: []
        }
        simpleSymbol.positif = new SimpleFillSymbol({
          color: [235, 87, 87, 0.7],
          style: 'solid',
          outline: {
            color: 'white',
            width: 0
          }
        })
        simpleSymbol.pdp = new SimpleFillSymbol({
          color: [242, 201, 76, 0.7],
          style: 'solid',
          outline: {
            color: 'white',
            width: 0
          }
        })
        simpleSymbol.odp = new SimpleFillSymbol({
          color: [45, 156, 219, 0.7],
          style: 'solid',
          outline: {
            color: 'white',
            width: 0
          }
        })

        const pgCorona = {
          positif: [],
          pdp: [],
          odp: []
        }
        const polygonGraphic = []
        this.kotaGeojson.features.forEach((element) => {
          const polygon = new Polygon({
            rings: element.geometry.coordinates[0]
          })

          polygonGraphic.positif = new Graphic({
            geometry: polygon,
            attributes: {
              status: 'Positif',
              kota: element.properties.kemendagri_nama,
              jumlah: element.properties.jumlah_positif
            },
            symbol: simpleSymbol.positif
          })
          pgCorona.positif.push(polygonGraphic.positif)

          polygonGraphic.pdp = new Graphic({
            geometry: polygon,
            attributes: {
              status: 'PDP',
              kota: element.properties.kemendagri_nama,
              jumlah: element.properties.jumlah_pdp
            },
            symbol: simpleSymbol.pdp
          })
          pgCorona.pdp.push(polygonGraphic.pdp)

          polygonGraphic.odp = new Graphic({
            geometry: polygon,
            attributes: {
              status: 'ODP',
              kota: element.properties.kemendagri_nama,
              jumlah: element.properties.jumlah_odp
            },
            symbol: simpleSymbol.odp
          })
          pgCorona.odp.push(polygonGraphic.odp)
        })

        const template = new PopupTemplate({
          title: 'Detail Data',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'kota',
                  label: 'Kota'
                },
                {
                  fieldName: 'status',
                  label: 'Status'
                },
                {
                  fieldName: 'jumlah',
                  label: 'Jumlah'
                }
              ]
            }
          ]
        })
        const fields = [
          {
            name: 'ObjectID',
            alias: 'ObjectID',
            type: 'oid'
          },
          {
            name: 'status',
            alias: 'Status',
            type: 'string'
          },
          {
            name: 'kota',
            alias: 'Kab/Kota',
            type: 'string'
          },
          {
            name: 'jumlah',
            alias: 'Jumlah',
            type: 'string'
          }
        ]
        const renderer = []
        renderer.positif = {
          type: 'simple',
          symbol: simpleSymbol.positif,
          visualVariables: {
            type: 'opacity',
            field: 'jumlah',
            stops: [
              { value: 0, opacity: 0 },
              { value: this.maxPasien.positif / 4, opacity: 0.5 },
              { value: this.maxPasien.odp / 3, opacity: 0.6 },
              { value: this.maxPasien.positif / 2, opacity: 0.8 },
              { value: this.maxPasien.positif, opacity: 1 }
            ]
          }
        }

        renderer.pdp = {
          type: 'simple',
          symbol: simpleSymbol.pdp,
          visualVariables: {
            type: 'opacity',
            field: 'jumlah',
            stops: [
              { value: 0, opacity: 0 },
              { value: this.maxPasien.pdp / 4, opacity: 0.5 },
              { value: this.maxPasien.odp / 3, opacity: 0.6 },
              { value: this.maxPasien.pdp / 2, opacity: 0.8 },
              { value: this.maxPasien.pdp, opacity: 1 }
            ]
          }
        }

        renderer.odp = {
          type: 'simple',
          symbol: simpleSymbol.odp,
          visualVariables: {
            type: 'opacity',
            field: 'jumlah',
            stops: [
              { value: 0, opacity: 0 },
              { value: this.maxPasien.odp / 4, opacity: 0.5 },
              { value: this.maxPasien.odp / 3, opacity: 0.6 },
              { value: this.maxPasien.odp / 2, opacity: 0.8 },
              { value: this.maxPasien.odp, opacity: 1 }
            ]
          }
        }
        const featureLayerCorona = []
        featureLayerCorona.positif = new FeatureLayer({
          source: pgCorona.positif,
          renderer: renderer.positif,
          fields,
          popupTemplate: template
        })
        maps.add(featureLayerCorona.positif)

        featureLayerCorona.pdp = new FeatureLayer({
          source: pgCorona.pdp,
          renderer: renderer.pdp,
          fields,
          popupTemplate: template
        })
        maps.add(featureLayerCorona.pdp)

        featureLayerCorona.odp = new FeatureLayer({
          source: pgCorona.odp,
          renderer: renderer.odp,
          fields,
          popupTemplate: template
        })
        maps.add(featureLayerCorona.odp)

        const legend = new Legend({
          view: this.view
          // layerInfos: [{
          //   layers: featureLayerCorona,
          //   title: 'Jumlah Data Pasien'
          // }]
        })
        const expandLegend = new Expand({
          view: this.view,
          content: legend
        })
        this.view.ui.add(expandLegend, 'bottom-left')

        const coronaElement = document.getElementById('corona-filter')
        coronaElement.style.visibility = 'visible'

        const coronaExpand = new Expand({
          view: this.view,
          content: coronaElement,
          expandIconClass: 'esri-icon-filter',
          group: 'bottom-left'
        })
        this.view.ui.add(coronaExpand, 'top-right')

        coronaElement.addEventListener('click', (event) => {
          const selectedStatus = event.target.getAttribute('data-corona')
          maps.removeAll()
          if (selectedStatus === 'Semua') {
            maps.add(featureLayerCorona.positif)
            maps.add(featureLayerCorona.pdp)
            maps.add(featureLayerCorona.odp)
          } else if (selectedStatus === 'Positif') {
            maps.add(featureLayerCorona.positif)
          } else if (selectedStatus === 'PDP') {
            maps.add(featureLayerCorona.pdp)
          } else {
            maps.add(featureLayerCorona.odp)
          }
        })
      })
    }
  },
  beforeDestroy () {
    if (this.view) {
      // destroy the map view
      this.view.container = null
    }
  }
}

</script>

<style lang="scss" scoped>

#map {
  width: 100%; height: 100%;
}
#exampleModal {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.modal-dialog {
  width: 100%;
  height: 100%;
}
.text-disclaimer {
  top:20%;
  position: absolute;
  text-align: center;
  color: #fff;
}
.backdrop {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: black;
  opacity: 0.5;
}

.title{
  font-size: large;
  font-weight: bold;
}
#corona-filter {
  width: 120px;
  height: 160px;
  visibility: hidden;
}

.corona-item {
  padding: 12px;
  text-align: center;
  vertical-align: baseline;
  cursor: pointer;
  height: 40px;
}

.corona-item:focus {
  background-color: dimgrey;
}

.corona-item:hover {
  background-color: dimgrey;
}
</style>
