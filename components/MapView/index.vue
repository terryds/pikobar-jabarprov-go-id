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
import { loadModules } from 'esri-loader'
import axios from 'axios'

export default {
  name: 'MapView',
  components: {
  },
  data () {
    return {
      isHidden: false,
      kotaGeojson: null
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const data = await axios.get('http://localhost:8080/')
      this.kotaGeojson = data
      this.createMap()
    },
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
    },
    createMap () {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Map', 'esri/Graphic', 'esri/PopupTemplate', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/widgets/Legend', 'esri/geometry/Point', 'esri/symbols/SimpleMarkerSymbol', 'esri/widgets/Expand', 'esri/renderers/UniqueValueRenderer', 'esri/geometry/Polygon', 'esri/layers/GeoJSONLayer'], { css: true }).then(([ArcGISMap, Graphic, PopupTemplate, MapView, FeatureLayer, Legend, Point, SimpleMarkerSymbol, Expand, UniqueValueRenderer, Polygon, GeoJSONLayer]) => {
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
        console.log(this.kotaGeojson.data)
        const geojsonLayer = new GeoJSONLayer({
          url: 'http://localhost:8080',
          copyright: 'USGS Earthquakes'
        })
        maps.add(geojsonLayer)
        // const polygon = new Polygon({
        //   type: 'point',
        //   rings:
        // })
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
