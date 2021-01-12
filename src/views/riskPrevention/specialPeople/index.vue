<template>
  <div class="page-container">
    <Tabs :tab-list="tabList" width="600px" :cur-index="2" />
    <SimpleMap @mapInit="mapInit">
      <el-amap-marker
        v-for="(item, index) in list"
        :key="index"
        :position="[item.zb.split(',')[0], item.zb.split(',')[1]]"
        :offset="[-70, -153]"
        :topWhenClick="true"
        :zIndex="999"
      >
        <div
          :class="['eventMarker', { twinkle1: selectedItem.zb === item.zb }]"
        >
          <div class="img"></div>
          <!--          <div>{{ item.xm }}</div>-->
        </div>
      </el-amap-marker>
    </SimpleMap>

    <transition name="ani-left" mode="out-in" appear>
      <left />
    </transition>

    <transition name="ani-right" mode="out-in" appear>
      <right />
    </transition>
  </div>
</template>
<script>
import SimpleMap from '@/components/SimpleMap'
import left from './left'
import right from './right'
import commonMixin from '../commonMixin'
import { getZhqList } from '@/api/riskPrevention/specialPeople'
export default {
  components: {
    left,
    right,
    SimpleMap
  },
  mixins: [commonMixin],
  data() {
    return {
      map: null,
      list: [],
      selectedItem: {}
    }
  },
  mounted() {
    this.$EventBus.$on('update: selectedItem', item => {
      this.selectedItem = item
      this.map.setCenter([item.zb.split(',')[0], item.zb.split(',')[1]])
      this.map.setZoom(18)
    })
    this.getList()
  },
  beforeDestroy() {
    this.$EventBus.$off('update: selectItem')
  },
  methods: {
    mapInit(map) {
      this.map = map
      this.map.setCenter([115.870275, 28.650335])
      this.map.setZoom(12)
      // this.map.add([this.ploygon, this.ploygon1, this.ploygon2, this.ploygon3])
    },
    getList() {
      getZhqList({ name: '中华情' }).then(res => {
        if (res.status === 200) {
          this.list = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.eventMarker {
  width: 140px;
  height: 153px;
  padding-top: 25px;
  background-size: 100% 100%;
  border-radius: 6px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #58a7fe;
  text-align: center;
  .img {
    width: 49px;
    height: 60px;
    background: url("~@/assets/image/specialPeople/icon-feeling.png") no-repeat
      center;
    background-size: 100% 100%;
  }
}
</style>
