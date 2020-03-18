<template>
  <div style="width:100%; height:100%">
    <div id="map" />
    <div class="disclaimer" v-if="!isHidden">
    <div class="backdrop" />
      <div class="text-disclaimer">
        <div class="title">Peta Sebaran Kasus COVID-19 di Jawa Barat</div>
        <div class="subtitle">Sumber: Dinas Kesehatan Provinsi Jawa Barat | Update 16 Maret 2020</div>
        <div class="description mt-2">
          <b>Titik lokasi merupakan titik acak (rand by system) wilayah yang tertera pada identitas kasus dan tidak menunjuk pada alamat persis masing-masing kasus, data yang ditampilkan akan terus diperbarui sesuai dengan informasi yang diterima melalui Pemerintah Provinsi Jawa</b>
        </div>
        <button class="btn btn-success mt-3" style="color: #fff" v-on:click="isHidden = !isHidden"><b>Lihat Peta</b></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { loadModules } from 'esri-loader'
import axios from 'axios'

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
      isHidden: false
    }
  },
  computed: {
    ...mapState('corona', {
      corona: state => state.items
    })
  },
  mounted () {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/Graphic', 'esri/PopupTemplate', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/Legend', 'esri/geometry/Point', 'esri/symbols/SimpleMarkerSymbol', 'esri/widgets/Expand', 'esri/renderers/UniqueValueRenderer'], { css: true }).then(([ArcGISMap, Graphic, PopupTemplate, MapView, FeatureLayer, Legend, Point, SimpleMarkerSymbol, Expand, UniqueValueRenderer]) => {
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

      const clusterConfig = {
        type: 'cluster',
        clusterRadius: '5px',
        popupTemplate: {
          content: 'Terdapat {cluster_count} kasus.'
        }
      }
      const pgCorona = []

      this.jsonData.forEach((element) => {
        const point = new Point({
          type: 'point',
          longitude: element.alamat_longitude,
          latitude: element.alamat_latitude
        })

        const pointGraphic = new Graphic({
          geometry: point,
          attributes: {
            status: element.status,
            usia: element.umur,
            desa: element.desa_str,
            kecamatan: element.kecamatan_str,
            kabkot: element.kabkot_str,
            ObjectID: element.ObjectID
          }
        })
        pgCorona.push(pointGraphic)
      })

      const template = new PopupTemplate({
        title: 'Detail Data',
        content: [
          {
            type: 'fields',
            fieldInfos: [
              {
                fieldName: 'status',
                label: 'Status'
              },
              {
                fieldName: 'usia',
                label: 'Usia'
              },
              {
                fieldName: 'desa',
                label: 'Desa'
              },
              {
                fieldName: 'kecamatan',
                label: 'Kecamatan'
              },
              {
                fieldName: 'kabkot',
                label: 'Kab/Kota'
              }
            ]
          }
        ]
      })
      const markerSymbol = []
      // Create a symbol for drawing the point
      markerSymbol.positif = new SimpleMarkerSymbol({
        color: [235, 87, 87, 0.7],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 0
        }
      })

      // Create a symbol for drawing the point
      markerSymbol.pdp = new SimpleMarkerSymbol({
        color: [242, 201, 76, 0.7],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 0
        }
      })
      // Create a symbol for drawing the point
      markerSymbol.odp = new SimpleMarkerSymbol({
        color: [45, 156, 219, 0.7],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 0
        }
      })

      const fields = [{
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
        name: 'usia',
        alias: 'Usia',
        type: 'string'
      },
      {
        name: 'desa',
        alias: 'Desa',
        type: 'string'
      },
      {
        name: 'kecamatan',
        alias: 'Kecamatan',
        type: 'string'
      },
      {
        name: 'kabkot',
        alias: 'Kab/Kota',
        type: 'string'
      }]

      const renderer = {
        type: 'unique-value',
        field: 'status',
        defaultSymbol: { type: 'simple' },
        uniqueValueInfos: [{
          value: 'ODP',
          symbol: markerSymbol.odp
        },
        {
          value: 'PDP',
          symbol: markerSymbol.pdp
        },
        {
          value: 'Positif',
          symbol: markerSymbol.positif
        }]
      }
      const featureLayerCorona = new FeatureLayer({
        source: pgCorona,
        featureReduction: clusterConfig,
        renderer,
        fields,
        objectIDField: 'ObjectID',
        popupTemplate: template
      })
      maps.add(featureLayerCorona)

      const legend = new Legend({
        view: this.view,
        layerInfos: [{
          layer: featureLayerCorona,
          title: 'Jumlah Data Pasien'
        }]
      })
      const expandLegend = new Expand({
        view: this.view,
        content: legend
      })
      this.view.ui.add(expandLegend, 'bottom-left')
    })
  },
  beforeMount () {
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
        })
        .catch(function (error) {
          console.log(error)
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
</style>
