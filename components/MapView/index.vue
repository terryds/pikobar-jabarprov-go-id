<template>
  <div style="width:100%; height:100%; z-index:0">
    <div id="map-wrap" style="height: 100%" />
    <div id="info-legend" class="info legend" />
  </div>
</template>

<script>
import axios from 'axios'
import * as turf from '@turf/turf'
// import reverse from 'turf-reverse'
import kotaGeojson from '~/static/kota.json'

export default {
  name: 'MapView',
  data () {
    return {
      kotaGeojson,
      jsonData: [],
      jsonDataKota: [
        {
          kode: '3204',
          nama: 'Kab. Bandung'
        },
        {
          kode: '3217',
          nama: 'Kab. Bandung Barat'
        },
        {
          kode: '3216',
          nama: 'Kab. Bekasi'
        },
        {
          kode: '3201',
          nama: 'Kab. Bogor'
        },
        {
          kode: '3207',
          nama: 'Kab. Ciamis'
        },
        {
          kode: '3203',
          nama: 'Kab. Cianjur'
        },
        {
          kode: '3209',
          nama: 'Kab. Cirebon'
        },
        {
          kode: '3205',
          nama: 'Kab. Garut'
        },
        {
          kode: '3212',
          nama: 'Kab. Indramayu'
        },
        {
          kode: '3215',
          nama: 'Kab. Karawang'
        },
        {
          kode: '3208',
          nama: 'Kab. Kuningan'
        },
        {
          kode: '3210',
          nama: 'Kab. Majalengka'
        },
        {
          kode: '3218',
          nama: 'Kab. Pangandaran'
        },
        {
          kode: '3214',
          nama: 'Kab. Purwarkarta'
        },
        {
          kode: '3213',
          nama: 'Kab. Subang'
        },
        {
          kode: '3202',
          nama: 'Kab. Sukabumi'
        },
        {
          kode: '3211',
          nama: 'Kab. Sumedang'
        },
        {
          kode: '3206',
          nama: 'Kab. Tasikmalaya'
        },
        {
          kode: '3273',
          nama: 'Kota Bandung'
        },
        {
          kode: '3279',
          nama: 'Kota Banjar'
        },
        {
          kode: '3275',
          nama: 'Kota Bekasi'
        },
        {
          kode: '3271',
          nama: 'Kota Bogor'
        },
        {
          kode: '3277',
          nama: 'Kota Cimahi'
        },
        {
          kode: '3274',
          nama: 'Kota Cirebon'
        },
        {
          kode: '3276',
          nama: 'Kota Depok'
        },
        {
          kode: '3272',
          nama: 'Kota Sukabumi'
        },
        {
          kode: '3278',
          nama: 'Kota Tasikmalaya'
        }
      ]
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    createMap () {
      // const blueIcon = this.$L.icon({ iconUrl: 'blue.png' })
      const map = this.$L.map('map-wrap').setView([-6.914744, 107.609810], 8)
      this.$L.tileLayer('https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1
      }).addTo(map)

      const markerClusters = {}
      markerClusters.positif = this.$L.markerClusterGroup({
        singleMarkerMode: true,
        iconCreateFunction: (cluster) => {
          // get the number of items in the cluster
          let count = cluster.getChildCount()
          const digits = (count + '').length
          if (count === 1) {
            count = ''
          }
          return this.$L.divIcon({
            html: count,
            className: 'cluster cluster-positif digits-' + digits,
            iconSize: null
          })
        }
      })
      markerClusters.pdp = this.$L.markerClusterGroup({
        singleMarkerMode: true,
        iconCreateFunction: (cluster) => {
          // get the number of items in the cluster
          let count = cluster.getChildCount()
          const digits = (count + '').length
          if (count === 1) {
            count = ''
          }
          return this.$L.divIcon({
            html: count,
            className: 'cluster cluster-pdp digits-' + digits,
            iconSize: null
          })
        }
      })
      markerClusters.odp = this.$L.markerClusterGroup({
        singleMarkerMode: true,
        iconCreateFunction: (cluster) => {
          // get the number of items in the cluster
          let count = cluster.getChildCount()
          const digits = (count + '').length
          if (count === 1) {
            count = ''
          }
          return this.$L.divIcon({
            html: count,
            className: 'cluster cluster-odp digits-' + digits,
            iconSize: null
          })
        }
      })
      this.jsonData.forEach((element) => {
        console.log(element)
        if (element.alamat_latitude !== null) {
          const m = this.$L.marker([element.alamat_latitude, element.alamat_longitude])
          if (element.status === 'Positif') {
            markerClusters.positif.addLayer(m)
          } else if (element.status === 'PDP') {
            markerClusters.pdp.addLayer(m)
          } else {
            markerClusters.odp.addLayer(m)
          }
        }
      })
      map.addLayer(markerClusters.positif)
      map.addLayer(markerClusters.pdp)
      map.addLayer(markerClusters.odp)
    },
    fetchData () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/analytics/longlat/')
        .then(function (response) {
          self.jsonData = response.data.data
          self.tesMap()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    tesMap () {
      const map = this.$L.map('map-wrap').setView([-7.004126726629371, 107.17987060546874], 8)
      this.$L.tileLayer('https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1
      }).addTo(map)
      // const kotaLeaflet = this.$L.geoJSON(this.kotaGeojson, {
      //   onEachFeature: (feature, layer) => {
      //     console.log(layer)
      //   }
      // })
      const kotaCluster = []
      this.jsonDataKota.forEach((element) => {
        const markerClusters = []
        markerClusters.positif = this.$L.markerClusterGroup({
          singleMarkerMode: true,
          maxClusterRadius: 10000,
          spiderfyOnMaxZoom: false,
          showCoverageOnHover: false,
          zoomToBoundsOnClick: false,
          spiderLegPolylineOptions: { weight: 1.5, color: '#222', opacity: 0 },
          iconCreateFunction: (cluster) => {
            // get the number of items in the cluster
            let count = cluster.getChildCount()
            const digits = (count + '').length
            if (count === 1) {
              count = ''
            }
            return this.$L.divIcon({
              html: count,
              className: 'cluster cluster-positif digits-' + digits,
              iconSize: null
            })
          }
        })
        markerClusters.pdp = this.$L.markerClusterGroup({
          singleMarkerMode: true,
          maxClusterRadius: 10000,
          spiderfyOnMaxZoom: false,
          showCoverageOnHover: false,
          zoomToBoundsOnClick: false,
          iconCreateFunction: (cluster) => {
            // get the number of items in the cluster
            let count = cluster.getChildCount()
            const digits = (count + '').length
            if (count === 1) {
              count = ''
            }
            return this.$L.divIcon({
              html: count,
              className: 'cluster cluster-pdp digits-' + digits,
              iconSize: null
            })
          }
        })
        markerClusters.odp = this.$L.markerClusterGroup({
          singleMarkerMode: true,
          maxClusterRadius: 10000,
          spiderfyOnMaxZoom: false,
          showCoverageOnHover: false,
          zoomToBoundsOnClick: false,
          iconCreateFunction: (cluster) => {
            // get the number of items in the cluster
            let count = cluster.getChildCount()
            const digits = (count + '').length
            if (count === 1) {
              count = ''
            }
            return this.$L.divIcon({
              html: count,
              className: 'cluster cluster-odp digits-' + digits,
              iconSize: null
            })
          }
        })
        kotaCluster[element.kode] = markerClusters
      })
      console.log(this.kotaGeojson)
      this.jsonData.forEach((element) => {
        console.log('tes')
        if (element.alamat_latitude !== null) {
          const m = this.$L.marker([element.alamat_latitude, element.alamat_longitude])
          m.bindPopup(`
            <b> Kab/Kota </b> : ${element.kabkot_str} <br>
            <b> Status </b> : ${element.status} <br>
            <b> Jenis Kelamin </b> : ${element.jenis_kelamin_str} <br>
            <b> Usia </b> : ${element.umur} 
          `)
          m.on('mouseover', function (e) {
            this.openPopup()
          })
          m.on('mouseout', function (e) {
            this.closePopup()
          })
          if (element.status === 'Positif') {
            kotaCluster[element.kode_kabkot].positif.addLayer(m)
          } else if (element.status === 'PDP') {
            kotaCluster[element.kode_kabkot].pdp.addLayer(m)
          } else {
            kotaCluster[element.kode_kabkot].odp.addLayer(m)
          }
        }
      })
      this.jsonDataKota.forEach((element) => {
        map.addLayer(kotaCluster[element.kode].positif)
        map.addLayer(kotaCluster[element.kode].pdp)
        map.addLayer(kotaCluster[element.kode].odp)

        kotaCluster[element.kode].positif.on('clusterclick', (c) => {
          console.log(c)
          this.$L.popup().setLatLng(c.layer.getLatLng()).setContent(c.layer._childCount + ' kasus Positif di ' + element.nama).openOn(map)
        }).on('clustermouseout', (c) => {
          map.closePopup()
        })
        kotaCluster[element.kode].pdp.on('clusterclick', (c) => {
          console.log(c)
          this.$L.popup().setLatLng(c.layer.getLatLng()).setContent(c.layer._childCount + ' kasus PDP di ' + element.nama).openOn(map)
        }).on('clustermouseout', (c) => {
          map.closePopup()
        })
        kotaCluster[element.kode].odp.on('clusterclick', (c) => {
          console.log(c)
          this.$L.popup().setLatLng(c.layer.getLatLng()).setContent(c.layer._childCount + ' kasus ODP di ' + element.nama).openOn(map)
        }).on('clustermouseout', (c) => {
          map.closePopup()
        })
      })
      // console.log(kotaLeaflet)
      // const m = this.$L.marker([-7.004126726629371, 108.17987060546874])
      // const polygon = this.$L.polygon([
      //   [
      //     -7.177200757107744,
      //     107.11257934570312
      //   ],
      //   [
      //     -7.177200757107744,
      //     107.4462890625
      //   ],
      //   [
      //     -6.908704023900704,
      //     107.4462890625
      //   ],
      //   [
      //     -6.908704023900704,
      //     107.11257934570312
      //   ],
      //   [
      //     -7.177200757107744,
      //     107.11257934570312
      //   ]
      // ])

      const polygon = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [
                107.11257934570312,
                -7.177200757107744
              ],
              [
                107.4462890625,
                -7.177200757107744
              ],
              [
                107.4462890625,
                -6.908704023900704
              ],
              [
                107.11257934570312,
                -6.908704023900704
              ],
              [
                107.11257934570312,
                -7.177200757107744
              ]
            ]
          ]
        }
      }

      const point = turf.point([109.17987060546874, -7.004126726629371])

      const isInside1 = turf.inside(point, polygon)

      console.log(isInside1)

      // console.log(reverse(polygon))
      // your json var: states
      // this.kotaGeojson.features.forEach((kota) => {
      //   this.$L.polygon(kota.geometry.coordinates[0], {
      //     weight: 1,
      //     fillOpacity: 0.7,
      //     color: 'red',
      //     dashArray: '3'
      //   }).addTo(map)
      // })
    }
  }
}
</script>
<style scoped>
.leaflet-popup-content {
    width: 130px;
    padding: 5px;
    line-height: 1.4;
}
.info {
    padding: 6px 8px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
}
.info h4 {
    margin: 0 0 5px;
    color: #777;
}
.legend {
    line-height: 18px;
    color: #555;
}

</style>
<style>
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";

.legend i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}
  .cluster {
    border-radius: 50%;
    text-align: center;
    color: white;
    font-weight: 700;
    font-family: monospace;
  }

  .cluster-positif {
    background: rgb(235, 87, 87, 0.9);
  }
  .cluster-pdp {
    background: rgb(242, 201, 76, 0.9);
  }

  .cluster-odp {
    background: rgb(45, 156, 219, 0.9);
  }
  .cluster:before {
    content: ' ';
    position: absolute;
    border-radius: 50%;
    z-index: -1;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    /* border: 1px solid white; */
  }

  .digits-1 {
    font-size: 14px;
    height: 28px;
    width: 28px;
    line-height: 28px;
    margin-top: -14px;
    margin-left: -14px;
  }

  .digits-2 {
    font-size: 16px;
    height: 34px;
    width: 34px;
    line-height: 35px;
    margin-top: -17px;
    margin-left: -17px;
  }

  .digits-3 {
    font-size: 18px;
    height: 48px;
    width: 47px;
    line-height: 47px;
    /* border-width: 3px; */
    margin-top: -24px;
    margin-left: -24px;
  }

  .digits-4 {
    font-size: 18px;
    height: 58px;
    width: 58px;
    line-height: 57px;
    /* border-width: 4px; */
    margin-top: -29px;
    margin-left: -29px;
  }

</style>
