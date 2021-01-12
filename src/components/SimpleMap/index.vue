<template>
  <div class="map">
    <el-amap
      :events="mapEvents"
      :zooms="[3, 20]"
      :rotate-enable="false"
      :pitch-enable="true"
      :expand-zoom-range="true"
      :pitch="50"
      :building-animation="true"
      view-mode="2D"
    >
      <slot />
    </el-amap>
  </div>
</template>

<script>
import '@/plugins/amap'

export default {
  props: {
    distanceRight: {
      type: Number,
      default: 458
    },
    viewMode: {
      type: String,
      default: '3D'
    },
    isNeedSetMapStyle: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      center: [],
      zoom: 13,
      map: null,
      mapEvents: {
        init: map => {
          this.map = map
          this.zoom = map.getZoom()
          if (this.isNeedSetMapStyle) {
            map.setMapStyle('amap://styles/e29ab9ed3500a61eced4f02c824facee')
          }

          this.$emit('mapInit', map, this.zoom)
        },
        click: e => {
          console.log([e.lnglat.lng, e.lnglat.lat].toString())
        },
        zoomchange: () => {
          this.zoom = this.map.getZoom()
          this.$emit('zoomChange', this.zoom)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.amap-logo {
  display: none !important;
}
.map {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #26263f;
}

/deep/ .amap-maps {
  background-color: #26263f;
}

.map-reset {
  background: rgba(65, 65, 65, 1);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.35);
  position: absolute;
  bottom: 108px;
  width: 28px;
  height: 28px;
  z-index: 3;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
}

.map-zoom {
  background: rgba(65, 65, 65, 1);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.35);
  position: absolute;
  width: 28px;
  height: 66px;
  line-height: 32px;
  text-align: center;
  bottom: 28px;
  z-index: 3;
  color: #ffffff;
  font-size: 21px;
}
</style>
