<template>
  <el-dialog
    append-to-body
    :before-close="handleClose"
    title="地图"
    width="770px"
    :visible="visible"
  >
    <div style="width:100% ; height:500px">
      <el-amap
        :center="center"
        :zoom="zoom"
        :events="mapEvents"
        :expand-zoom-range="true"
      >
        <el-amap-marker
          v-if="marker.position.length > 0"
          :position="marker.position"
          vid="component-marker"
        />
      </el-amap>
    </div>
    <div class="form-controls">
      <el-button size="small" type="primary" @click="submit">提交</el-button>
      <el-button size="small" plain @click="dialogClose">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import '@/plugins/amap'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: Array
    }
  },
  data() {
    return {
      coordinate: {
        lng: '',
        lat: ''
      },
      marker: {
        position: this.position.length > 0 ? this.position : []
      },
      zoom: 10,
      center: [115.905718, 28.698195],
      communityList: [],
      map: null,
      mapEvents: {
        init: async map => {
          this.map = map
          map.setMapStyle('amap://styles/e29ab9ed3500a61eced4f02c824facee')
        },
        click: e => {
          this.coordinate.lng = e.lnglat.lng
          this.coordinate.lat = e.lnglat.lat
          this.marker.position = [e.lnglat.lng, e.lnglat.lat]
        },
        rightclick: e => {
          this.coordinate.lng = e.lnglat.lng
          this.coordinate.lat = e.lnglat.lat
        }
      }
    }
  },
  watch: {
    position(a, b) {
      this.marker.position = a
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    submit() {
      this.$emit('update:visible', false)
      this.$emit('submit-success', this.coordinate)
    },
    dialogClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.form-controls {
  margin-top: 20px;
  text-align: right;
}
.amap-logo,
.amap-copyright,
.amap-mcode {
  display: none !important;
}
</style>
