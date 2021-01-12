<template>
  <div class="rentalHousing-map">
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
      <template v-show="zoomIndex">
        <el-amap-marker
          v-for="(item, index) in areaList"
          :key="index"
          :position="item.position"
        >
          <div class="info-window-content">
            <div class="label">{{ item.name }}</div>
            <div class="data">
              <svg-icon icon-class="building" style="font-size:18px" />
              <span>出租房数量：</span>
              <span>{{ item.num }}</span>
            </div>
          </div>
        </el-amap-marker>
      </template>
      <!-- </el-amap-ground-image> -->
    </el-amap>
  </div>
</template>

<script>
import '@/utils/amap'
import centerImage from '@/assets/image/newPage/rentalHousing-map-center.png'
export default {
  props: {},
  components: {},
  data() {
    return {
      center: [116.062547, 28.694305],
      map: null,
      zoomIndex: true,
      groundimage: {
        url: centerImage,
        bounds: [
          [115.816657, 28.660784],
          [113.816657, 27.660784]
        ]
      },
      areaList: [
        {
          name: '红谷滩区',
          position: [115.791124, 28.611357],
          num: 5888999
        },
        {
          name: '东湖区',
          position: [115.913663, 28.68035],
          num: 1231336
        },
        {
          name: '西湖区',
          position: [115.877884, 28.631968],
          num: 453272
        },
        {
          name: '青山湖区',
          position: [115.968763, 28.699145],
          num: 1584695
        },
        {
          name: '青云谱区',
          position: [115.917537, 28.603638],
          num: 1564566
        },
        {
          name: '新建区',
          position: [115.820534, 28.692595],
          num: 2345156
        },
        {
          name: '南昌县',
          position: [115.947007, 28.561349],
          num: 324566
        },
        {
          name: '进贤县',
          position: [116.240376, 28.378758],
          num: 1526854
        }
      ],
      mapEvents: {
        init: map => {
          this.map = map
          this.map.setZoom(12)
          map.setMapStyle('amap://styles/e29ab9ed3500a61eced4f02c824facee')
        }
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.rentalHousing-map {
  /deep/ .amap-marker-content {
    width: 265px;
    height: 96px;
    background: url("~@/assets/image/newPage/rentalHousing-map-modal.png")
      no-repeat;
    background-size: 100% 100%;
  }
}
.info-window-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #03f8ff;
  font-size: 16px;
  .data {
    span:nth-of-type(1) {
    }
    span:nth-of-type(2) {
      color: #f2bd1b;
    }
  }
  .label {
    font-weight: bold;
    line-height: 48px;
  }
}
</style>
