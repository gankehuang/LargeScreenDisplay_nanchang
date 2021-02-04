<template>
  <Container>
    <Map
      ref="map"
      :cur-operate-map-menu="curOperateMapMenu"
      @clickMarkerPoint="onClickMarkerPoint"
      @handleBoxSelect="onHandleBoxSelect"
      @switchVideoPlay="onSwitchVideoPlay"
    />

    <ToolSelector
      @bindToolBtn="bindToolBtn"
    />

    <SwitchActiveRoute @switchActiveRoute="onSwitchActiveRoute" />

    <MapOperate @menuUpdate="onMenuUpdate" />

    <template v-slot:pageLeft>
      <Left
        :camera-index-code-list="cameraIndexCodeList"
        :active-mes="curActiveInfo"
        :cur-marker-video-info="curMarkerVideoInfo"
      />
    </template>
    <template v-slot:pageRight>
      <Right
        :grid-name="curClickPointName"
        :active-mes="curActiveInfo"
      />
    </template>
  </Container>
</template>

<script>
import Map from './map'
import ToolSelector from './ToolSelector'
import SwitchActiveRoute from './active/SwitchActiveRoute'
import MapOperate from './MapOperate'
import Left from './left'
import Right from './right'
import { pointVideoList } from './mocks.js'

const initCameraIndexCodeList = [
  {
    cameraIndexCode: '36015603001320000845',
    positionName: ''
  },
  {
    cameraIndexCode: '36012120001320000099',
    positionName: ''
  },
  {
    cameraIndexCode: '36015602001320001610',
    positionName: ''
  },
  {
    cameraIndexCode: '36015602001320001774',
    positionName: ''
  },
  {
    cameraIndexCode: '36012102001310993251',
    positionName: ''
  },
  {
    cameraIndexCode: '36015603001320000553',
    positionName: ''
  }
]
export default {
  components: {
    Map,
    ToolSelector,
    SwitchActiveRoute,
    MapOperate,
    Left,
    Right
  },
  data () {
    return {
      cameraIndexCodeList: [], // 左侧底部摄像头code列表
      curOperateMapMenu: null, // 当前点击的菜单（雪亮工程、无人机...）
      curActiveInfo: null, // 当前活动信息
      curClickPointName: '', // 当前点击的活动地点
      curMarkerVideoInfo: null // 当前点击的视频marker信息
    }
  },
  mounted () {
    // 初始化左侧底部视频列表
    this.cameraIndexCodeList = initCameraIndexCodeList
  },
  methods: {
    // 监听更新地图菜单
    onMenuUpdate (item) {
      // 记录当前操作的菜单信息
      this.curOperateMapMenu = item
      // 先重置
      this.$refs.map.resetMapMarker()
      // 如果菜单是激活状态，则更新
      if (item.active) {
        this.$refs.map.updateMapToMarker(this.curOperateMapMenu)
      }
    },
    // 监听切换框选工具
    bindToolBtn (type) {
      this.$refs.map.handleMapBoxSelection(type)
    },
    // 监听操作地图框选工具
    onHandleBoxSelect (cameraIndexCodeList) {
      // 此处逻辑移动到这边，是为了使用this.cameraIndexCodeList.splice !!!
      // 如果过滤的摄像有6个，则直接替换
      if (cameraIndexCodeList.length) {
        if (cameraIndexCodeList.length === 6) {
          this.cameraIndexCodeList = cameraIndexCodeList
        } else {
          // 如果不够6个，则进行部分替换
          cameraIndexCodeList.forEach((item, index) => {
            this.cameraIndexCodeList.splice(index, 1, item)
          })
        }
      }
    },
    // 监听切换活动路线
    onSwitchActiveRoute (activeItem) {
      this.curActiveInfo = activeItem
      this.$refs.map.updateMapToActive(activeItem)
    },
    // 监听切换视频
    onSwitchVideoPlay (curMarkerVideoInfo) {
      this.curMarkerVideoInfo = curMarkerVideoInfo
    },
    // 监听点击地图地点图标
    onClickMarkerPoint (item) {
      this.curClickPointName = item.address
      // 左侧视频数据mock
      switch (this.curClickPointName) {
        case '南昌市公安局':
          this.cameraIndexCodeList = pointVideoList[0]
          break
        case '南昌“城市大脑”':
          this.cameraIndexCodeList = pointVideoList[6]
          break
        case '南昌市综治中心':
          this.cameraIndexCodeList = pointVideoList[2]
          break
        case '青山湖区南钢街道综治中心':
          this.cameraIndexCodeList = pointVideoList[3]
          break
        case '青山湖区人民法院':
          this.cameraIndexCodeList = pointVideoList[4]
          break
        case '南昌县综治中心':
          this.cameraIndexCodeList = pointVideoList[5]
          break
        case '省行政中心':
          this.cameraIndexCodeList = pointVideoList[7]
          break
        default:
          this.cameraIndexCodeList = pointVideoList[0]
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
