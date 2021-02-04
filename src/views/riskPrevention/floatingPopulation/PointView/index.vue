<template>
  <SimpleMap @mapInit="mapInit">
    <OperateMap @updateMapMarker="updateMapMarker" />
    <SearchInput
      class="input-container"
      @searchByKeyWords="updateMapMarkerBySearch"
    />
    <CameraModal
      :visible.sync="cameraModal.visible"
      :info="cameraModal.info"
    />
  </SimpleMap>
</template>

<script>
import OperateMap from './OperateMap'
import CameraModal from './CameraModal'
import SearchInput from './SearchInput'
import { getKeyMonitorList, selectByGeo } from '@/api/riskPrevention/floatingPopulation'
export default {
  components: {
    OperateMap,
    CameraModal,
    SearchInput
  },
  data () {
    return {
      map: null,
      cameraModal: {
        visible: false,
        info: null
      },
      markList: {
        jcList: [],
        hczList: [],
        qczList: [],
        gsglList: [],
        gdList: [],
        sdList: [],
        dlkkList: [],
        searchList: []
      },
      totalListObj: {},
      curTitle: ''
    }
  },
  created () {},
  methods: {
    mapInit (map) {
      this.map = map
      this.getKeyMonitorList()
      this.map.setZoom(10.5)
    },
    updateMapMarker (data) {
      const { title } = data
      this.curTitle = title
      for (const key in this.markList) {
        this.markList[key].forEach(item => {
          item.hide()
        })
      }

      this.markList[title + 'List'].forEach(item => {
        item.show()
        this.map.setCenter([
          this.markList[title + 'List'][0].getPosition().lng,
          this.markList[title + 'List'][0].getPosition().lat
        ])
      })
      // if (visible) {
      //   // 将选中的撒点塞进总数组，作模糊查询
      //   this.totalListObj[title + 'List'] = this.markList[title + 'List']
      // } else {
      //   // this.markList[title + 'List'].forEach(item => {
      //   //   item.hide()
      //   // })
      // }
    },
    updateMapMarkerBySearch (keyWords) {
      if (this.curTitle) {
        console.log(1)
        this.markList[this.curTitle + 'List'].forEach((item, index) => {
          if (item.w.extData.name.indexOf(keyWords) > -1) {
            item.show()
          } else {
            item.hide()
          }
        })
      }
    },
    // 查询重点监控
    getKeyMonitorList () {
      if (this.map) {
        this.map.remove(this.markList.jcList)
        this.map.remove(this.markList.hczList)
        this.map.remove(this.markList.qczList)
        this.map.remove(this.markList.gsglList)
        this.map.remove(this.markList.gdList)
        this.map.remove(this.markList.sdList)
      }
      this.markList.jcList = []
      this.markList.hczList = []
      this.markList.qczList = []
      this.markList.gsglList = []
      this.markList.gdList = []
      this.markList.sdList = []

      getKeyMonitorList().then(res => {
        if (res.status === 200) {
          const list = res.data
          for (const key in list) {
            if (key === 'jcList') {
              list[key].forEach(item => {
                if (item.longitude && item.latitude) {
                  this.markList.jcList.push(
                    this.createMarker(
                      require('@/assets/image/floatingPopulation/飞机 拷贝 2.png'),
                      [item.longitude, item.latitude],
                      { ...item, typeName: 'jc' }
                    )
                  )
                }
              })
              this.map.add(this.markList.jcList)
            } else if (key === 'hczList') {
              list[key].forEach(item => {
                if (item.longitude && item.latitude) {
                  this.markList.hczList.push(
                    this.createMarker(
                      require('@/assets/image/floatingPopulation/火车 拷贝 2.png'),
                      [item.longitude, item.latitude],
                      { ...item, typeName: 'hcz' }
                    )
                  )
                }
              })
              this.map.add(this.markList.hczList)
            } else if (key === 'gdList') {
              list[key].forEach(item => {
                if (item.longitude && item.latitude) {
                  this.markList.gdListgdList.push(
                    this.createMarker(
                      require('@/assets/image/floatingPopulation/高速公路 拷贝 2.png'),
                      [item.longitude, item.latitude],
                      { ...item, typeName: 'gd' }
                    )
                  )
                }
              })
              this.map.add(this.markList.gdList)
            } else if (key === 'sdList') {
              list[key].forEach(item => {
                if (item.longitude && item.latitude) {
                  this.markList.sdList.push(
                    this.createMarker(
                      require('@/assets/image/floatingPopulation/卡口 拷贝 2.png'),
                      [item.longitude, item.latitude],
                      { ...item, typeName: 'sd' }
                    )
                  )
                }
              })
              this.map.add(this.markList.sdList)
            } else if (key === 'qczList') {
              list[key].forEach(item => {
                if (item.longitude && item.latitude) {
                  this.markList.qczList.push(
                    this.createMarker(
                      require('@/assets/image/floatingPopulation/汽车 (1) 拷贝 2.png'),
                      [item.longitude, item.latitude],
                      { ...item, typeName: 'qcz' }
                    )
                  )
                }
              })
              this.map.add(this.markList.qczList)
            } else if (key === 'gsglList') {
              list[key].forEach(item => {
                if (item.longitude && item.latitude) {
                  this.markList.gsglList.push(
                    this.createMarker(
                      require('@/assets/image/floatingPopulation/高速公路 拷贝 2.png'),
                      [item.longitude, item.latitude],
                      { ...item, typeName: 'gsgl' }
                    )
                  )
                }
              })
              this.map.add(this.markList.gsglList)
            } else if (key === 'dlkkList') {
              list[key].forEach(item => {
                if (item.longitude && item.latitude) {
                  this.markList.dlkkList.push(
                    this.createMarker(
                      require('@/assets/image/floatingPopulation/卡口 拷贝 2.png'),
                      [item.longitude, item.latitude],
                      { ...item, typeName: 'dlkk' }
                    )
                  )
                }
              })
              this.map.add(this.markList.dlkkList)
            }
          }
        }
      })
    },
    createMarker (icon, pos, mes) {
      const marker = new window.AMap.Marker({
        icon: new window.AMap.Icon({
          image: icon,
          size: new window.AMap.Size(50, 60), // 图标所处区域大小
          imageSize: new window.AMap.Size(28, 26) // 图标大小
        }),
        position: pos,
        offset: new window.AMap.Pixel(-25, -30),
        extData: mes,
        visible: false
      })
      if (mes.typeName !== 'dlkk') {
        marker.setLabel({
          offset: new window.AMap.Pixel(30, -15), // 设置文本标注偏移量
          content: `<div>${mes.name || '南昌'}</div>`, // 设置文本标注内容
          direction: 'right' // 设置文本标注方位
        })
      } else {
        marker.on('mouseover', event => {
          marker.setLabel({
            offset: new window.AMap.Pixel(30, -15), // 设置文本标注偏移量
            content: `<div>${mes.name || '南昌'}</div>` // 设置文本标注内容
          })
        })
        marker.on('mouseout', event => {
          marker.setLabel()
        })
      }
      marker.on('click', event => {
        this.getVideoInfo(mes)
      })
      return marker
    },
    getVideoInfo (mes) {
      this.cameraModal.info = mes
      const params = {
        distance: 1,
        longitude: mes.longitude,
        latitude: mes.latitude
      }
      selectByGeo(1, 1, params).then(res => {
        if (res.status === 200) {
          if (res.data.list[0]) {
            this.cameraModal.info.cameraIndexCode = res.data.list[0].gbIndexCode || res.data.list[0].cameraIndexCode
          }
        } else {
          if (mes.deviceId) {
            this.cameraModal.info.cameraIndexCode = mes.deviceId.split(',')[0]
          }
        }
        this.cameraModal.visible = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .amap-marker-label {
  background: rgba(0, 255, 255, 1);
  opacity: 0.9;
  border-radius: 6px;
  padding: 3px 5px;
  border: 1px solid rgba(0, 0, 0, 0.51);
}
.input-container {
  position: absolute;
  top: 150px;
  left: 500px;
  z-index: 999;
}
</style>
