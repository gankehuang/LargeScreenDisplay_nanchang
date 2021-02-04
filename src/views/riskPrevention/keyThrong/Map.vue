<template>
  <SimpleMap
    :is-need-render-grid="false"
    @mapInit="mapInit"
  >
    <CameraModal
      :visible.sync="cameraModal.visible"
      :info="cameraModal.info"
    />
  </SimpleMap>
</template>

<script>
import { resultEventMarker, focusMap } from '@/utils/mapHelpler'
import { queryCameraBySafeLocationId } from '@/api/riskPrevention/KeyThrong'
import CameraModal from './CameraModal'

import {
  square,
  square1,
  square2,
  administration,
  administration1,
  administration2,
  qiushui,
  qiushui1,
  qiushui2,
  province,
  province1,
  province2
} from './mock'
import {
  sxzTwo,
  sxzThree,
  shixzTwo,
  shixzThree,
  bygcTwo,
  bygcThree,
  qsgcTwo,
  qsgcThree
} from './videomMock'
import { createMapMarkerList, createMapMarker } from '@/common/createMapMarker'
// 底部四个地方的三级圈层地图坐标
const pointDataObj = {
  square: [square, square1, square2],
  province: [province, province1, province2],
  qiushui: [qiushui, qiushui1, qiushui2],
  administration: [administration, administration1, administration2]
}
// 底部四个地方的二级、三级圈层的摄像头
const videoDataObj = {
  square: [bygcTwo, bygcThree],
  province: [sxzTwo, sxzThree],
  qiushui: [qsgcTwo, qsgcThree],
  administration: [shixzTwo, shixzThree]
}
// 底部四个地方的中心点和获取一级圈层所用的数据
const addressData = {
  square: {
    code: 'eecd1a1fcd534de88060be83cc5e92be',
    lon: 115.904521,
    lat: 28.673808,
    cens: 17
  },
  province: {
    code: '3087c4cfacf840f09bf268d7d926403d',
    lon: 115.816573,
    lat: 28.640264,
    cens: 15
  },
  qiushui: {
    code: '0419b1838b8544deabbc70de3b1cb0d6',
    lon: 115.862676,
    lat: 28.682808,
    cens: 17
  },
  administration: {
    code: '4a92cafadf604243818c0220f745d287',
    lon: 115.859085,
    lat: 28.684541,
    cens: 16
  }
}
export default {
  components: {
    CameraModal
  },
  data () {
    return {
      map: null,
      cameraModal: {
        info: null,
        visible: false
      },
      circleList: [],
      throngMarkList: [], // 区域点
      ploygon: null,
      videoMarkerList: [],
      twoVideoMarkerList: [],
      threeVideoMarkerList: [],
      throngList: [
        {
          name: '省行政中心',
          lat: '28.640193',
          lon: '115.816114'
        },
        {
          name: '市行政中心',
          lat: '28.684541',
          lon: '115.859085'
        },
        {
          name: '八一广场',
          lat: '28.67401',
          lon: '115.904464'
        },
        {
          name: '秋水广场',
          lat: '28.682829',
          lon: '115.862542'
        }
      ],
      earlyWarningModal: {
        info: null,
        visible: false
      },
      curEventMarker: null // 点击事件产生的marker
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('focusEvent')
  },
  mounted () {
    this.onFacusEvent()
  },
  methods: {
    // 地图加载
    mapInit (map) {
      this.map = map
      this.initThrong()
      this._updateMap('省行政中心', 'province')
    },
    // 刷新地图
    refreshMap (curItem) {
      this._resetMapMarker()
      this._updateMap(curItem.name, curItem.title)
    },
    // 重置地图marker
    _resetMapMarker () {
      // 清空圈层区域图层
      this.circleList.forEach(item => {
        this.map.remove(item)
      })
      this.circleList = []
      this.ploygon = []

      // 清空第一圈层 视频marker
      if (this.videoMarkerList.length) {
        this.map.remove(this.videoMarkerList)
        this.videoMarkerList = []
      }

      // 清空第二圈层 视频marker
      if (this.twoVideoMarkerList.length) {
        this.map.remove(this.twoVideoMarkerList)
        this.twoVideoMarkerList = []
      }

      // 清空第三圈层 视频marker
      if (this.threeVideoMarkerList.length) {
        this.map.remove(this.threeVideoMarkerList)
        this.threeVideoMarkerList = []
      }
    },
    // 切换重点区域，更新地图
    _updateMap (curPosition, Codename) {
      // 显示区域marker
      this.throngMarkList.forEach(item => {
        const extData = item.w.extData
        extData.name === curPosition ? item.show() : item.hide()
      })

      // 创建三层圈层图层
      for (let i = 0; i < pointDataObj[Codename].length; i++) {
        this._createThrongLayer(pointDataObj[Codename][i], i + 1)
      }

      // 获取第一圈层摄像头点
      this._getVideoMarkerList(addressData[Codename].code)

      // 获取第二圈层摄像头点
      this.twoVideoMarkerList = this._createVideoMarkers(videoDataObj[Codename][0])

      // 获取第三圈层摄像头点
      this.threeVideoMarkerList = this._createVideoMarkers(videoDataObj[Codename][1])

      // 设置对应的中心点
      focusMap(this.map, [addressData[Codename].lon, addressData[Codename].lat], addressData[Codename].cens)
    },
    // 点击圈层按钮事件
    refreshRing (arr) {
      arr.forEach((item, index) => {
        if (item.ifShow) {
          this.circleList[index].show()
          if (index === 0) {
            this.map.add(this.videoMarkerList)
          } else if (index === 1) {
            this.map.add(this.twoVideoMarkerList)
          } else if (index === 2) {
            this.map.add(this.threeVideoMarkerList)
          }
        } else {
          this.circleList[index].hide()
          if (index === 0) {
            this.map.remove(this.videoMarkerList)
          } else if (index === 1) {
            this.map.remove(this.twoVideoMarkerList)
          } else if (index === 2) {
            this.map.remove(this.threeVideoMarkerList)
          }
        }
      })
    },
    // 初始化重点区域标记
    initThrong () {
      // 创建marker列表
      this.throngMarkList = createMapMarkerList(
        this.map,
        this.throngList,
        function (item) {
          return {
            icon: require('@/assets/image/command/icons.gif'),
            position: [item.lon, item.lat],
            size: [40, 60], // 图标所处区域大小
            imageSize: [40, 60], // 图标大小
            extData: item,
            visible: false
          }
        }
      )

      // 创建标记文字
      this.throngMarkList.forEach(item => {
        const extData = item.w.extData
        item.setLabel({
          zIndex: 1000,
          offset: new window.AMap.Pixel(10, -30), // 设置文本标注偏移量
          content: `<div class="position-label">
                  ${extData.name}</div>` // 设置文本标注内容
        })
      })
    },

    // 创建重点区域图层
    _createThrongLayer (list, index) {
      const needList = []
      const arrList = list.split(';')
      arrList.forEach(item => {
        const longitude = item.split(',')[0]
        const latitude = item.split(',')[1]
        needList.push([longitude, latitude])
      })
      switch (index) {
        case 1:
          this.ploygon = new window.AMap.Polygon({
            path: needList,
            strokeColor: '#C0330E',
            fillOpacity: 0.23,
            fillColor: '#FF2400',
            strokeStyle: 'solid',
            strokeWeight: 2,
            extData: {}
          })
          break

        case 2:
          this.ploygon = new window.AMap.Polygon({
            path: needList,
            strokeColor: '#C0330E',
            fillOpacity: 0.23,
            fillColor: '#FFCA3C',
            strokeStyle: 'solid',
            strokeWeight: 2,
            extData: {}
          })
          break

        case 3:
          this.ploygon = new window.AMap.Polygon({
            path: needList,
            strokeColor: '#326713',
            fillOpacity: 0.23,
            fillColor: '#5AE424',
            strokeStyle: 'solid',
            strokeWeight: 2,
            extData: {}
          })
          break
      }
      this.map.add([this.ploygon])
      this.circleList.push(this.ploygon)
      this.circleList.forEach(item => {
        item.hide()
      })
    },
    // 创建第一圈视频监控点
    async _getVideoMarkerList (id) {
      const { status, data } = await queryCameraBySafeLocationId({
        id: id
      })

      if (status === 200) {
        this.videoMarkerList = this._createVideoMarkers(data)
      }
    },
    // 创建视频 marker 列表
    _createVideoMarkers (list) {
      const markerList = []
      list.forEach(item => {
        markerList.push(createMapMarker({
          content: '<div class="video-point"><i class="icon"></i></div>',
          position: [item.longitude, item.latitude],
          extData: item,
          visible: true,
          title: item.positionName
        }))
      })

      return markerList
    },
    // 页面实时预警地图图标点击事件
    onFacusEvent () {
      this.$EventBus.$on('focusEvent', res => {
        this.focusEvent(res)
        this._createFocusEventMarker(res)
      })
    },
    // 聚焦当前点击事件
    focusEvent (data) {
      if (!data.longitude || !data.latitude) {
        this.$message.warning('未获取到该事件的位置信息')
        return
      }
      if (this.curEventMarker) {
        this.map.remove(this.curEventMarker)
      }
    },
    // 创建聚焦事件marker
    _createFocusEventMarker (data) {
      this.curEventMarker = resultEventMarker(data.typeText, [data.longitude, data.latitude])
      this.curEventMarker.on('click', () => {
        this.$emit('detailsEvent', data)
      })
      this.map.add(this.curEventMarker)
      focusMap(this.map, [data.longitude, data.latitude], 18)
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .video-point {
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url("~@/assets/image/gridView/shexiangtou.png") no-repeat;
  }
  .num {
    color: #a9daff;
  }
}

 ::v-deep .position-label {
   background: #168eeb;
   border-radius: 6px;
   font-size: 16px;
   font-weight: 400;
   color: #ffffff;
   padding: 5px;
   text-align: center;
   border: none;
 }

 ::v-deep .amap-marker-label {
   background-color: transparent;
   border: none;
 }
</style>
