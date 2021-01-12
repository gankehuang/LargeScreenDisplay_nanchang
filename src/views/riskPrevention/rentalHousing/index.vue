<template>
  <div class="page-container">
    <Tabs :tab-list="tabList" width="600px" :cur-index="1" />
    <BuildModal :visible.sync="buildModalVisible" />
    <SimpleMap @mapInit="mapInit">
      <template>
        <el-amap-marker
          v-for="(item, index) in markingPointList"
          :key="index"
          :vid="index"
          :position="[item.longitude, item.latitude]"
          :offset="[-100, -100]"
          :topWhenClick="true"
          :zIndex="999"
        >
          <div class="eventMarker" @click="handleOpenBuildModal(item)">
            <div>{{ item.name }}</div>
            <div>
              <svg-icon icon-class="build" class="position-icon" />出租数量
              <span class="nums">{{ item.num }}</span>
            </div>
          </div>
        </el-amap-marker>
      </template>
    </SimpleMap>
    <transition name="ani-left" mode="out-in" appear>
      <Left />
    </transition>

    <transition name="ani-right" mode="out-in" appear>
      <Right />
    </transition>
  </div>
</template>

<script>
import SimpleMap from '@/components/SimpleMap'
import Left from './Left'
import Right from './Rights'
// import { heatmapData } from './mock'
import commonMixin from '../commonMixin'
import { queryRentRoomDistributed } from '@/api/riskPrevention/rentalHousing'
import BuildModal from '../BuildModal'
import { queryGridThreeLine } from '@/api/smartData/gridView'
export default {
  components: {
    SimpleMap,
    Left,
    Right,
    BuildModal
  },
  mixins: [commonMixin],
  data() {
    return {
      map: null,
      heatMap: null,
      ifShow: true,
      buildModalVisible: false,
      markingPointList: []
    }
  },
  methods: {
    mapInit(map) {
      this.map = map
      this.renderGrid()
      this.getRengionNum()
      this.map.setCenter([116.026842, 28.688883])
      this.map.setZoom(10)
      // if (!this.isSupportCanvas()) {
      //   return this.$msg.error(
      //     '热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试。'
      //   )
      // }
      // this.heatMap = new window.AMap.Heatmap(map, {
      //   radius: 100,
      //   opacity: [0, 0.6], // 热力图的透明度,分别对应heatmap.js的minOpacity和maxOpacity
      //   gradient: {
      //     // 热力图的颜色渐变区间。   {JSON}:key 插值的位置, 0-1;  value颜色值
      //     0.5: '#12ec97',
      //     0.6: '#eeea14',
      //     1.0: '#ff0000'
      //   }
      // })
      // this.heatMap.setDataSet({
      //   data: heatmapData,
      //   max: 100
      // })
    },
    // 随机颜色
    randomColor() {
      const colorArr = ['#3B9AFE', '#00FFFF', '#246BBB', '#0055FF', '#A9DAFF']
      return colorArr[Math.floor(Math.random() * colorArr.length)]
    },
    getRengionNum() {
      queryRentRoomDistributed({}).then(res => {
        if (res.status === 200) {
          this.markingPointList = res.data
          this.markingPointList.forEach(item => {
            if (item.name === '青云谱区') {
              item.position = [115.919124, 28.626145]
              item.num = 3873
            } else if (item.name === '红谷滩区') {
              item.position = [115.772439, 28.605425]
              item.num = 4439
            } else if (item.name === '青山湖区') {
              item.position = [115.980493, 28.639178]
              item.num = 4733
            } else if (item.name === '新建区') {
              item.position = [116.011049, 28.979415]
              item.num = 6551
            } else if (item.name === '经开区') {
              item.position = [115.919124, 28.626145]
              item.num = 586
            } else if (item.name === '东湖区') {
              item.position = [115.908738, 28.733148]
              item.num = 3400
            } else if (item.name === '西湖区') {
              item.position = [115.873833, 28.642486]
              item.num = 7722
            } else if (item.name === '湾里局') {
              item.num = 708
            } else if (item.name === '安义县') {
              item.num = 4421
            } else if (item.name === '高新区') {
              item.num = 5367
            } else if (item.name === '进贤县') {
              item.num = 277
            } else if (item.name === '南昌县') {
              item.num = 982
            }
          })
        }
      })
    },
    // 初始化图层
    async renderGrid() {
      let gridArr = []
      const polygons = []
      const { status, data } = await queryGridThreeLine()
      if (status === 200) {
        gridArr = data
      }

      gridArr.forEach((item, index) => {
        const ploygon = new window.AMap.Polygon({
          path: item.gps,
          strokeColor: '#2FD1D2',
          fillOpacity: 0.3,
          fillColor: this.randomColor(),
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

        polygons.push(ploygon)
      })

      this.map.add(polygons)
      // this.map.setFitView(polygons)
    },
    // 判断浏览区是否支持canvas
    isSupportCanvas() {
      const elem = document.createElement('canvas')
      return !!(elem.getContext && elem.getContext('2d'))
    },
    // 打开出租房弹窗
    handleOpenBuildModal({ name }) {
      if (name === '红谷滩区') {
        this.buildModalVisible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .app-main {
  top: 59px;
}
.page-bg {
  position: relative;
  margin-top: 15px;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  display: flex;
}

.eventMarker {
  padding-top: 10px;
  width: 150px;
  height: 85px;
  background: url("~@/assets/image/rentalHousing/组 63.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  line-height: 27px;
  text-align: center;
  color: #58a7fe;
  .position-icon {
    display: inline-block;
    margin-right: 6px;
  }
  .nums {
    color: #f2bd1b;
  }
}

/deep/ .amap-info-content {
  width: 266px;
  height: 100px;
  background: url("~@/assets/image/rentalHousing/组 63.png") no-repeat;
  background-size: 100% 100%;
}

.bottom-center .amap-info-sharp {
  bottom: -12px;
  left: 50%;
  margin-left: -15px;
  border-left: 15px solid transparent !important;
  border-right: 15px solid transparent !important;
  border-top: 20px solid transparent !important;
}
</style>
