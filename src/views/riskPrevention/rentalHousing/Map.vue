<template>
  <SimpleMap
    :is-need-render-grid="true"
    @mapInit="mapInit"
  >
    <el-amap-marker
      v-for="(item, index) in markingPointList"
      :key="index"
      :vid="index"
      :position="[item.longitude, item.latitude]"
      :offset="[-100, -100]"
      :top-when-click="true"
      :z-index="999"
    >
      <div
        class="eventMarker"
        @click="handleOpenBuildModal(item)"
      >
        <div>{{ item.name }}</div>
        <div>
          <svg-icon
            icon-class="build"
            class="position-icon"
          />出租数量
          <span class="nums">{{ item.num }}</span>
        </div>
      </div>
    </el-amap-marker>
    <BuildModal :visible.sync="buildModalVisible" />
  </SimpleMap>
</template>
<script>
import BuildModal from '../BuildModal'
import { queryRentRoomDistributed } from '@/api/riskPrevention/rentalHousing'
import { focusMap } from '@/utils/mapHelpler'

export default {
  components: {
    BuildModal
  },
  data () {
    return {
      map: null,
      buildModalVisible: false,
      markingPointList: []
    }
  },
  methods: {
    mapInit (map) {
      this.map = map
      this.getRengionNum()
      focusMap(this.map, [116.002424, 28.692519], 10)
    },
    getRengionNum () {
      queryRentRoomDistributed().then(res => {
        if (res.status === 200) {
          this.markingPointList = [...res.data]
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
    // 打开出租房弹窗
    handleOpenBuildModal ({ name }) {
      if (name === '红谷滩区') {
        this.buildModalVisible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
