<template>
  <div class="container-map">
    <div class="bg-white col-md-12 p-0 m-2 " style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); height:50em;">
      <div id="map-faskes" style="height: 83%;z-index:0;" />
      <div class="info-legend p-4">
        <b>Keterangan: </b>
        <div class="row">
          <div class="col-md-2">
            <FontAwesomeIcon :icon="icon.faPlusSquare" class="mr-2 fa-w-14 icon-legend-rs" style="color: #08cc29" />
            Rumah Sakit Rujukan
          </div>
          <div class="col-md-2">
            <FontAwesomeIcon :icon="icon.faPlusSquare" class="mr-2 fa-w-14 icon-legend-rs" style="color: #fdd619" />
            Rumah Sakit Lini 2
          </div>
          <div class="col-md-2">
            <FontAwesomeIcon :icon="icon.faPlusSquare" class="mr-2 fa-w-14 icon-legend-rs" style="color: #169cea" />
            Puskesmas
          </div>
          <div class="col-md" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'MapSebaranCovid',
  components: {
    FontAwesomeIcon
  },
  data () {
    return {
      map: '',
      zoom: 8,
      isHidden: false,
      jsonData: [],
      listLayer: [],
      icon: {
        faPlusSquare
      }
    }
  },
  mounted () {
    this.createBasemap()
    this.fetchData()
  },
  beforeDestroy () {
    if (this.view) {
      // destroy the map view
      this.view.container = null
    }
  },
  methods: {
    fetchData () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/sebaran/jabar/faskes')
        .then(function (response) {
          console.log(response.data)
          self.jsonData = response.data.data
          self.createMap()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createBasemap () {
      this.map = this.$L.map('map-faskes', {
        zoomControl: false
      }).setView([-6.932694, 107.627449], 8)
      this.$L.tileLayer('https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1
      }).addTo(this.map)

      // add zoom control with your options
      this.$L.control.zoom({
        position: 'bottomright'
      }).addTo(this.map)

      // on zoom
      // Here the events for zooming and dragging
      // this.map.on('zoomend', () => {
      // })
      // on drag
      // this.map.on('dragend', () => {
      // })
      // end

      // create layer group
      this.layerGroup = this.$L.layerGroup().addTo(this.map)
    },
    removeLayer () {
      this.listLayer.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.listLayer = []
    },
    createMap () {
      this.createLayerFaskes()
    },
    createLayerFaskes () {
      const svgRS = '<svg style="font-size: 1.6em;"data-v-827fdf16="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="mr-2 fa-w-14 icon-legend-rs svg-inline--fa fa-plus-square fa-w-14" ><path data-v-827fdf16="" fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" class=""></path></svg>'

      this.jsonData.content.forEach((elFaskes) => {
        const pointRS = this.$L.marker([elFaskes.latitude, elFaskes.longitude], {
          icon: this.$L.divIcon({
            html: svgRS,
            iconSize: [17, 17],
            className: 'icon-rs green'
          })
        }).addTo(this.map)

        let telepon = ''
        elFaskes.telepon.forEach((elTelepon) => {
          telepon += elTelepon + '<br>'
        })
        pointRS.bindPopup(`
          <table border=0 cellpadding=2>
            <tr>
              <th><b> Nama </b></th>
              <td> : </td>
              <td>${elFaskes.nama}</td>
            </tr>
            <tr>
              <th><b> Alamat </b></th>
              <td> : </td>
              <td>${elFaskes.alamat}</td>
            </tr>
            <tr>
              <th><b> Telepon </b></th>
              <td> : </td>
              <td>${telepon}</td>
            </tr>
            <tr>
              <th><b> Url </b></th>
              <td> : </td>
              <td>${elFaskes.url}</td>
            </tr>
          </table>
        `)
        pointRS.on('mouseover', function (e) {
          this.openPopup()
        })
        pointRS.on('mouseout', function (e) {
          this.closePopup()
        })
        this.listLayer.push(pointRS)
      })
      // const newLayer = this.$L.marker([-6.921655383188578, 107.61039733886719], {
      //   icon: this.$L.divIcon({
      //     html: svgRS,
      //     iconSize: [20, 20],
      //     className: 'yellow'
      //   })
      // }).addTo(this.map)
      // this.listLayer.push(newLayer)

      // const newLayer = this.$L.marker([-6.921655383188578, 107.61039733886719], {
      //   icon: this.$L.divIcon({
      //     html: svgRS,
      //     iconSize: [20, 20],
      //     className: 'blue'
      //   })
      // }).addTo(this.map)
      // this.listLayer.push(newLayer)
    },
    tesMap () {
    }
  }
}
</script>
<style scoped>
#map-faskes{
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
}
.container-map {
  width:100%; height:100%;
}
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
.info-legend {
  height: 15%;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 15px;
}
.legend {
    line-height: 18px;
    color: #555;
}

.title{
  font-size: large;
  font-weight: bold;
}
.legend-color {
  width: 1em;
  height: 1em;
  float: left;
  border-radius: 10px;
  margin-top: 4px;
}
.icon-legend-rs {
  font-size: 1.2em;
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

  .cluster-odp-proses {
    background: rgb(45, 156, 219, 0.9);
  }

  .cluster-odp-selesai {
    background: #27ae60;
  }

  .cluster-odp-pdp {
    background: #f2c94c;
    border: 1px solid rgb(45, 156, 219, 0.9);
  }

  .cluster-odp-positif {
    background: #eb5757;
    border: 1px solid rgb(45, 156, 219, 0.9);
  }

  .cluster-odp-belumupdate {
    background: #bdbdbd;
    border: 1px solid rgb(45, 156, 219, 0.9);
  }

  .cluster-pdp-proses {
    background: rgb(242, 201, 76, 0.9);
  }

  .cluster-pdp-selesai {
    border: 1px solid rgb(242, 201, 76, 0.9);
    background: #27ae60
  }

  .cluster-pdp-positif {
    border: 1px solid rgb(242, 201, 76, 0.9);
    background: #eb5757;
  }

  .cluster-pdp-belumupdate {
    border: 1px solid rgb(242, 201, 76, 0.9);
    background: #bdbdbd;
  }

  .cluster-positif-proses {
    background: rgb(235, 87, 87, 0.9);
  }

  .cluster-positif-meninggal {
    background: #a51212;
    border: 1px solid rgb(235, 87, 87, 0.9);
  }

  .cluster-positif-sembuh {
    background: #27ae60;
    border: 1px solid rgb(235, 87, 87, 0.9);
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

.green, .green svg {
  color:#08cc29
}

.yellow, .yellow svg {
  color:#fdd619
}
.blue, .blue svg {
  color:#169cea
}
.icon-rs {
  background: #fff
}
</style>
