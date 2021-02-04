<template>
  <div class="map">
    <el-amap
      :center="center"
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

    <GridDetailsModal
      ref="gridDetailsModal"
      :info="gridDetailsModalInfo"
    />

    <slot name="tool" />

    <div
      class="map-reset"
      :style="{ right: distanceRight + 'px' }"
      @click="reset"
    >
      <img src="@/assets/image/map/map-reset.png">
    </div>

    <div
      class="map-zoom"
      :style="{ right: distanceRight + 'px' }"
    >
      <div
        class="zoom"
        @click="zoomIn"
      >
        <img src="@/assets/image/map/zoomIn.png">
      </div>
      <div class="division" />
      <div
        class="zoom"
        @click="zoomOut"
      >
        <img src="@/assets/image/map/zoomOut.png">
      </div>
    </div>
  </div>
</template>

<script>
import '@/plugins/amap'
import GridDetailsModal from './GridDetailsModal'
import { queryGridThreeLine, getGridLine } from '@/api/smartData/gridView'
import { focusMap } from '@/utils/mapHelpler'

export default {
  components: {
    GridDetailsModal
  },
  props: {
    distanceRight: {
      type: Number,
      default: 458
    }
  },
  data () {
    return {
      gridDetailsModalInfo: null,
      center: [115.791124, 28.611357],
      zoom: 10,
      map: null,
      mapEvents: {
        init: map => {
          this.map = map
          this.zoom = map.getZoom()
          map.setMapStyle('amap://styles/e29ab9ed3500a61eced4f02c824facee')
          this.renderGrid()
          this.$emit('mapInit', map, this.zoom)
        },
        click: e => {
          console.log([e.lnglat.lng, e.lnglat.lat].toString())
          const { lng, lat } = e.lnglat
          if (
            lng < 115.919776 &&
            lng > 115.919336 &&
            lat > 28.711902 &&
            lat < 28.712006
          ) {
            this.$emit('bindBuildingClick')
          }
        },
        zoomchange: () => {
          this.zoom = this.map.getZoom()
          this.$emit('zoomChange', this.zoom)
        },
        complete: () => {
          this.$emit('complete')
        },
        mousewheel: event => {
          this.$emit('mousewheel', event)
        }
      },
      gridList: [],
      polygons: [],
      firstPolygons: [], // 存储第一层图层数据
      textList: []
    }
  },
  mounted () {
    // 监听左侧区域信息改变
    this.$EventBus.$on('update:changeRegionInfo', async res => {
      if (res.gridLevel === 1) {
        await this.renderGrid()
        focusMap(this.map, [115.938066, 28.718901], 10)
        this.$EventBus.$emit('update:regionInfo', res)
      } else {
        await this.renderGrid1(res.code, res.gridLevel)
        this.$EventBus.$emit('update:regionInfo', res)
      }
    })
  },
  beforeDestroy () {
    this.$EventBus.$off('update:changeRegionInfo')
  },
  methods: {
    reset () {
      if (this.layers.length) {
        this.map.setFitView(this.layers)
      } else {
        this.map.setCenter(this.center)
      }
    },
    zoomIn () {
      this.map.zoomIn()
    },
    zoomOut () {
      this.map.zoomOut()
    },
    _resetGrid () {
      this.map.remove(this.polygons)
      this.map.remove(this.textList)
      this.polygons = []
      this.textList = []
    },
    // 初始化图层
    async renderGrid () {
      this._resetGrid()

      let gridArr = []
      const { status, data } = await queryGridThreeLine()
      if (status === 200) {
        gridArr = data
        this.gridList = data
      }

      gridArr.forEach(item => {
        const ploygon = new window.AMap.Polygon({
          path: item.gps,
          strokeColor: '#2FD1D2',
          fillOpacity: 0.3,
          fillColor: this._randomColor(),
          strokeStyle: 'dashed',
          zIndex: 9,
          strokeWeight: 2,
          bubble: true,
          extData: {
            code: item.gridCode,
            path: item.gridPath,
            gridLevel: item.gridLevel,
            name: item.gridName
          }
        })
        this.polygons.push(ploygon)
        this.firstPolygons.push(ploygon)

        ploygon.on('click', event => {
          const extData = event.target.w.extData
          // 通知左侧组件，数据更新
          this.$EventBus.$emit('update:regionInfo', extData)
          this.renderGrid1(extData.code, extData.gridLevel)
        })

        ploygon.on('rightclick', event => {
          const extData = event.target.w.extData
          this.gridDetailsModalInfo = {
            code: extData.code,
            path: extData.path,
            gridLevel: extData.gridLevel
          }
          // 防止点击过快，出现右键信息
          setTimeout(() => {
            this.$refs.gridDetailsModal.open()
          }, 100)
        })

        ploygon.on('mouseover', () => {
          ploygon.setOptions({
            fillColor: 'yellow',
            fillOpacity: 0.25
          })
        })

        ploygon.on('mouseout', () => {
          ploygon.setOptions({
            fillColor: ploygon.w.fillColor,
            fillOpacity: 0.3
          })
        })

        if (item.gridLevel === 3) {
          let position = []
          if (item.gridName === '青云谱区') {
            position = [115.919124, 28.626145]
          } else if (item.gridName === '红谷滩区') {
            position = [115.772439, 28.605425]
          } else if (item.gridName === '青山湖区') {
            position = [115.980493, 28.639178]
          } else if (item.gridName === '新建区') {
            position = [116.011049, 28.979415]
          } else if (item.gridName === '经开区') {
            position = [115.87166, 28.768364]
          } else if (item.gridName === '东湖区') {
            position = [115.908738, 28.733148]
          }

          const text = new window.AMap.Text({
            text: item.gridName,
            anchor: 'center', // 设置文本标记锚点
            cursor: 'pointer',
            style: {
              'font-size': '16px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#00ffff'
            },
            visible: false,
            position: position.length ? position : [item.cenLon, item.cenLat]
          })

          this.textList.push(text)

          this.map.on('zoomchange', () => {
            const zoom = this.map.getZoom() // 获取当前地图级别
            zoom >= 11.5 ? text.show() : text.hide()
          })
        }
      })

      this.map.add(this.polygons)
      this.map.add(this.textList)

      // this.map.setFitView(this.polygons)
    },
    // 渲染第二图层以及以下图层
    async renderGrid1 (code, gridLevel) {
      this._resetGrid()
      let gridArr = []
      const { status, data } = await getGridLine({
        code: code,
        gridLevel: gridLevel
      })
      if (status === 200) {
        gridArr = data
        this.gridList = data
      }

      gridArr.forEach((item, index) => {
        const ploygon = new window.AMap.Polygon({
          path: item.gps,
          strokeColor: '#2FD1D2',
          fillOpacity: 0.3,
          fillColor: this._randomColor(),
          strokeStyle: 'dashed',
          zIndex: 9,
          strokeWeight: 2,
          bubble: true,
          extData: {
            code: item.gridCode,
            path: item.gridPath,
            gridLevel: item.gridLevel,
            name: item.gridName
          }
        })
        this.polygons.push(ploygon)

        if (item.gridLevel < 6) {
          ploygon.on('click', event => {
            const extData = event.target.w.extData
            // 通知左侧组件，数据更新
            this.$EventBus.$emit('update:regionInfo', extData)
            if (extData.gridLevel < 6) {
              this.renderGrid1(
                extData.code,
                extData.gridLevel
              )
            }
          })
        }

        ploygon.on('rightclick', event => {
          const extData = event.target.w.extData
          this.gridDetailsModalInfo = {
            code: extData.code,
            path: extData.path,
            gridLevel: extData.gridLevel
          }
          // 防止点击过快，出现右键信息
          setTimeout(() => {
            this.$refs.gridDetailsModal.open()
          }, 100)
        })

        ploygon.on('mouseover', () => {
          ploygon.setOptions({
            fillColor: 'yellow',
            fillOpacity: 0.25
          })
        })

        ploygon.on('mouseout', () => {
          ploygon.setOptions({
            fillColor: ploygon.w.fillColor,
            fillOpacity: 0.3
          })
        })

        if (item.gridLevel <= 5) {
          const text = new window.AMap.Text({
            text: item.gridName,
            anchor: 'center', // 设置文本标记锚点
            cursor: 'pointer',
            style: {
              'font-size': '16px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#00ffff'
            },
            visible: false,
            position: [item.cenLon, item.cenLat]
          })

          this.textList.push(text)

          this.map.on('zoomchange', () => {
            const zoom = this.map.getZoom() // 获取当前地图级别
            zoom >= 11.5 ? text.show() : text.hide()
          })
        }

        if (item.gridLevel === 6) {
          const text = new window.AMap.Text({
            text: item.gridName,
            anchor: 'center', // 设置文本标记锚点
            cursor: 'pointer',
            style: {
              'font-size': '16px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#00ffff'
            },
            visible: false,
            position: [item.cenLon, item.cenLat]
          })

          this.textList.push(text)

          this.map.on('zoomchange', () => {
            const zoom = this.map.getZoom() // 获取当前地图级别
            zoom >= 11.5 ? text.show() : text.hide()
          })
        }
      })

      this.map.add(this.polygons)
      this.map.add(this.textList)
      this.map.setFitView(this.polygons)
    },
    // 随机颜色
    _randomColor () {
      const colorArr = ['#3B9AFE', '#00FFFF', '#246BBB', '#0055FF', '#A9DAFF']
      return colorArr[Math.floor(Math.random() * colorArr.length)]
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
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.35);
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
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.35);
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
