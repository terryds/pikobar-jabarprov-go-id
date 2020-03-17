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
    loadModules(['esri/Map', 'esri/Graphic', 'esri/PopupTemplate', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/Legend', 'esri/geometry/Point', 'esri/symbols/SimpleMarkerSymbol', 'esri/widgets/Expand'], { css: true }).then(([ArcGISMap, Graphic, PopupTemplate, MapView, FeatureLayer, Legend, Point, SimpleMarkerSymbol, Expand]) => {
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

      const legend = new Legend({
        view: this.view,
        layerInfos: [{
          title: 'Legend'
        }]
      })
      const expandLegend = new Expand({
        view: this.view,
        content: legend
      })
      this.view.ui.add(expandLegend, 'bottom-left')
      const clusterConfig = {
        type: 'cluster',
        clusterRadius: '5px',
        // {cluster_count} is an aggregate field containing
        // the number of features comprised by the cluster
        popupTemplate: {
          content: 'Terdapat {cluster_count} kasus.'
        }
      }

      // Create a graphic and add the geometry and symbol to it
      const pgCorona = []
      pgCorona.pdp = []
      pgCorona.odp = []
      pgCorona.positif = []

      this.jsonData.forEach((element) => {
        console.log(element.desa_str)
        const point = new Point({
          type: 'point', // autocasts as new Point()
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

        switch (element.status) {
          case 'Positif' :
            pgCorona.positif.push(pointGraphic)
            break
          case 'PDP' :
            pgCorona.pdp.push(pointGraphic)
            break
          default:
            pgCorona.odp.push(pointGraphic)
            break
        }
      })

      const template = new PopupTemplate({
        title: 'Detail Data',
        content: [
          {
            // It is also possible to set the fieldInfos outside of the content
            // directly in the popupTemplate. If no fieldInfos is specifically set
            // in the content, it defaults to whatever may be set within the popupTemplate.
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
        color: '#EB5757',
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 0,
          opacity: 0
        }
      })

      // Create a symbol for drawing the point
      markerSymbol.pdp = new SimpleMarkerSymbol({
        color: '#F2C94C',
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 0,
          opacity: 0
        }
      })
      // Create a symbol for drawing the point
      markerSymbol.odp = new SimpleMarkerSymbol({
        color: '#2D9CDB',
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 0,
          opacity: 0
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
      const f2 = new FeatureLayer({
        source: pgCorona.pdp,
        featureReduction: clusterConfig,
        renderer: {
          type: 'simple',
          symbol: markerSymbol.pdp
        },
        fields,
        objectIDField: 'ObjectID',
        popupTemplate: template
      })
      maps.add(f2)
      const f3 = new FeatureLayer({
        source: pgCorona.odp,
        featureReduction: clusterConfig,
        renderer: {
          type: 'simple',
          symbol: markerSymbol.odp
        },
        fields,
        objectIDField: 'ObjectID',
        popupTemplate: template
      })
      maps.add(f3)
      const fl = new FeatureLayer({
        source: pgCorona.positif,
        featureReduction: clusterConfig,
        renderer: {
          type: 'simple',
          symbol: markerSymbol.positif
        },
        fields,
        objectIDField: 'ObjectID',
        popupTemplate: template
      })
      maps.add(fl)
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
          for (let i = 0; i < self.jsonData.length; i++) {
            if (self.jsonData[i].status === 'Positif') {
              self.jsonDataResult.positif += 1
            } else if (self.jsonData[i].status === 'ODP') {
              self.jsonDataResult.odp += 1
            } else if (self.jsonData[i].status === 'PDP') {
              self.jsonDataResult.pdp += 1
            }
          }
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

<style scoped>
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
