<template>
  <div class="page-container">
    <Tabs
      :tab-list="tabList"
      width="600px"
      :cur-index="2"
    />
    <p
      class="btns"
      @click="changeClisk()"
    />
    <SimpleMap @mapInit="mapInit">
      <el-amap-marker
        v-for="item in markingPointList"
        :key="item.id + 'z'"
        :vid="item.id"
        :position="[item.lon, item.lat]"
        :offset="[-70, -153]"
        :top-when-click="true"
        :z-index="999"
      >
        <div class="eventMarker twinkle1">
          <div>{{ item.name }}</div>
        </div>
      </el-amap-marker>
    </SimpleMap>

    <transition
      name="ani-left"
      mode="out-in"
      appear
    >
      <left />
    </transition>

    <transition
      name="ani-right"
      mode="out-in"
      appear
    >
      <right />
    </transition>
  </div>
</template>

<script>
import left from './left'
import right from './right'
import commonMixin from '../commonMixin'
import { largeBuilding, jinjiang, ganjiang, poyanghu } from './mock'
export default {
  components: {
    left,
    right
  },
  mixins: [commonMixin],
  data () {
    return {
      map: null,
      markingPointList: [
        {
          id: 1,
          lon: '116.076269',
          lat: '28.342611',
          name: '抚河',
          num: '555666'
        },
        {
          id: 2,
          lon: '115.699136',
          lat: '28.408217',
          name: '锦江',
          num: '355666'
        },
        {
          id: 3,
          lon: '115.902343',
          lat: '28.716092',
          name: '赣江',
          num: '155666'
        },
        {
          id: 4,
          lon: '116.225099',
          lat: '29.065322',
          name: '鄱阳湖',
          num: '451866'
        }
      ]
    }
  },
  methods: {
    mapInit (map) {
      this.map = map
      // 抚河
      let list = ''
      list = largeBuilding
      list = list.split(';')
      const needList = []
      list.forEach(item => {
        const longitude = item.split(',')[0]
        const latitude = item.split(',')[1]
        needList.push([longitude, latitude])
      })
      this.ploygon = new window.AMap.Polygon({
        path: needList,
        strokeColor: '#00FFFF',
        fillOpacity: 0.3,
        fillColor: '#6367a1',
        strokeStyle: 'solid',
        strokeWeight: 2,
        extData: {}
      })
      // 锦江
      let list1 = ''
      list1 = jinjiang
      list1 = list1.split(';')
      const needList1 = []
      list1.forEach(item => {
        const longitude = item.split(',')[0]
        const latitude = item.split(',')[1]
        needList1.push([longitude, latitude])
      })
      this.ploygon1 = new window.AMap.Polygon({
        path: needList1,
        strokeColor: '#00FFFF',
        fillOpacity: 0.3,
        fillColor: '#6367a1',
        strokeStyle: 'solid',
        strokeWeight: 2,
        extData: {}
      })
      // 赣江
      let list2 = ''
      list2 = ganjiang
      list2 = list2.split(';')
      const needList2 = []
      list2.forEach(item => {
        const longitude = item.split(',')[0]
        const latitude = item.split(',')[1]
        needList2.push([longitude, latitude])
      })
      this.ploygon2 = new window.AMap.Polygon({
        path: needList2,
        strokeColor: '#00FFFF',
        fillOpacity: 0.3,
        fillColor: '#6367a1',
        strokeStyle: 'solid',
        strokeWeight: 2,
        extData: {}
      })

      // 鄱阳
      let list3 = ''
      list3 = poyanghu
      list3 = list3.split(';')
      const needList3 = []
      list3.forEach(item => {
        const longitude = item.split(',')[0]
        const latitude = item.split(',')[1]
        needList3.push([longitude, latitude])
      })
      this.ploygon3 = new window.AMap.Polygon({
        path: needList3,
        strokeColor: '#00FFFF',
        fillOpacity: 0.3,
        fillColor: '#6367a1',
        strokeStyle: 'solid',
        strokeWeight: 2,
        extData: {}
      })
      this.map.setCenter([115.97619, 28.870983])
      this.map.setZoom(10)
      this.map.add([this.ploygon, this.ploygon1, this.ploygon2, this.ploygon3])
    },
    changeClisk () {
      window.open('http://172.118.210.198:9000/#/me/homepage', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.btns {
  position: absolute;
  bottom: 14px;
  right: 450px;
  z-index: 3;
  width: 70px;
  height: 70px;
  background: url("~@/assets/image/keyWaters/组 118 拷贝.png") no-repeat;
  background-size: 100% 100%;
  border: none;
  cursor: pointer;
}
.eventMarker {
  width: 140px;
  height: 153px;
  padding-top: 25px;
  background: url("~@/assets/image/keyWaters/组 112.png") no-repeat;
  background-size: 100% 100%;
  border-radius: 6px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #b3ffff;
  text-align: center;
}
</style>
