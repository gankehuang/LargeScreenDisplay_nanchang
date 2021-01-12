<template>
  <div class="map-operate" v-if="visible">
    <div class="close-btn" @click="bindBtnClose">×</div>
    <div class="modal-title">活动路线</div>
    <div class="content">
      <SimpleMap @mapInit="mapInit"></SimpleMap>
    </div>
    <div class="modal-bottom">
      <el-button class="btn-save" @click="saveActiveRoute">保存</el-button>
    </div>
  </div>
</template>

<script>
import SimpleMap from '@/components/SimpleMap'
export default {
  components: {
    SimpleMap
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    info: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      map: null,
      mapRuler: null,
      inNodeList: [],
      outNodeList: [],
      count: 0,
      lineArr: [],
      removeArr: []
    }
  },
  methods: {
    mapInit(map) {
      this.map = map
      // 绘制点
      const videoMarkerList = []
      if (this.info.addressList.length > 0) {
        this.info.addressList.forEach(item => {
          if (item.longitude && item.latitude) {
            videoMarkerList.push(
              this._createMarker(
                require('@/assets/image/gridView/icon-law.png'),
                [item.longitude, item.latitude],
                item
              )
            )
          }
        })
        // this.map.setCenter(this.info.addressList[0].longitude, this.info.addressList[0].latitude)
      }
      this.map.add(videoMarkerList)
      this.map.setZoom(12)
      this.mapRuler = new window.AMap.RangingTool(map, {
        lineOptions: {
          path: [
            [115.609688, 28.789122],
            [115.630545, 28.79213]
          ]
        },
        tmpLineOptions: {
          path: [
            [115.609688, 28.789122],
            [115.630545, 28.79213]
          ]
        }
      })

      this.mapRuler.turnOn()
      this.mapRuler.on('addnode', ({ marker, position, type }) => {
        if (this.count === 0) this.inNodeList = []
        this.inNodeList.push({
          latitude: position.lat,
          longitude: position.lng,
          seq: this.count
        })
        this.count++
      })

      this.mapRuler.on('removenode', ({ target, points }) => {
        const sameLine = this.samePointer(points, this.lineArr) // 删除的点
        const _sameLine = []
        sameLine.forEach(e => {
          _sameLine.push({
            latitude: e.lat,
            longitude: e.lng
          })
        })
        const list = this.inNodeList.filter(item => !_sameLine.some(ele => ele.latitude === item.latitude)) // 删除点
        this.inNodeList = list
      })

      this.mapRuler.on('end', ({ target, points }) => {
        this.lineArr = points
      })
    },
    bindBtnClose() {
      this.$emit('update:visible', false)
    },
    saveActiveRoute() {
      this.$emit('update:nodeList', this.inNodeList)
      this.$emit('update:visible', false)
      this.inNodeList = []
      this.mapRuler.turnOff()
    },
    getDifference(arr1, arr2) {
      arr1 = arr1.map(JSON.stringify)
      arr2 = arr2.map(JSON.stringify)
      return arr1
        .concat(arr2)
        .filter(function(v, i, arr) {
          return arr.indexOf(v) === arr.lastIndexOf(v)
        })
        .map(JSON.parse)
    },
    // 创建地图标记点
    _createMarker(icon, pos, item) {
      const marker = new window.AMap.Marker({
        icon: new window.AMap.Icon({
          image: icon,
          size: new window.AMap.Size(49, 60), // 图标所处区域大小
          imageSize: new window.AMap.Size(49, 60) // 图标大小
        }),
        zIndex: 999,
        position: pos,
        offset: new window.AMap.Pixel(-10, -10),
        extData: item,
        visible: true
      })
      marker.setLabel({
        offset: new window.AMap.Pixel(0, -30), // 设置文本标注偏移量
        content: `<div style="background:#168eeb !important;
                  border-radius: 6px !important;
                  font-size: 16px !important;
                  font-weight: 400 !important;
                  color: #ffffff !important;
                  padding: 5px !important;
                  text-align: center !important;
                  border: none;">
                  ${item.address}</div>`, // 设置文本标注内容
        direction: 'right' // 设置文本标注方位
      })
      return marker
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .amap-marker-label {
  background-color: transparent !important;
  border: none;
}
.map-operate {
  position: absolute;
  z-index: 999999999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 67%;
  height: 670px;
  // padding: 50px 0;
  background: #031524;
  border: 1px solid #3B9AFE;
  .modal-title {
    position: absolute;
    z-index: 888;
    font-size: 16px;
    color: #fff;
    width: 100%;
    background-image: url("~@/assets/image/gridNumber/selectRouteModelTitle.png");
    padding: 14px 25px;
  }
  .content {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .modal-bottom {
    position: relative;
    bottom: 50px;
    left: 91%;
    padding: 10px 20px;
    // display: flex;
    // justify-content: flex-end;
    display: inline-block;
    .btn-save {
      background: url("~@/assets/image/gridNumber/btn-save.png");
      background-size: 100% 100%;
      border: none;
      color: #FFFFFF;
    }
  }
  .close-btn {
    cursor: pointer;
    position: absolute;
    width: 40px;
    height: 40px;
    z-index: 99999;
    top: 3px;
    right: 3px;
    color: #3B9AFE;
    text-align: center;
    line-height: 40px;
    font-size: 30px;
    // background: url("~@/assets/image/gridNumber/table-modal-close.png") no-repeat center center;
    // background-size: 100% 100%;
  }
}

</style>
