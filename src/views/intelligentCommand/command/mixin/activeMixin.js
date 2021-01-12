import { renderPath } from '@/common/createTrajectory'
import { selectActivityBase } from '@/api/intelligentCommand/command'
import { createPolymerizationMarker } from '@/common/createMapMarker'
import { pointVideoList } from '../mocks.js'
export default {
  data() {
    return {
      markingPointList: [],
      videoMarkerList: [],
      videoPlaybackModal: {
        visible: false,
        info: null
      },
      addActiveModal: {
        visible: false,
        info: null
      },
      curActiveObj: null
    }
  },
  beforeDestroy() {
    window.clusterer = null
    window.pathSimplifierIns = null
    window.navg = null
  },
  methods: {
    // 增加活动报备
    openAddActiveModal() {
      this.addActiveModal.visible = true
    },
    // 切换活动地点
    toggleActivePoint(item) {
      const { longitude, latitude } = item
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

      this._focusMap([longitude, latitude], 18)
      // 左侧视频数据接口
      // selectByGeo(1, 6, {
      //   latitude: latitude,
      //   longitude: longitude,
      //   distance: '0.5'
      // }).then(res => {
      //   this.loading = false
      //   const { status, data } = res
      //   if (status === 200) {
      //     this.cameraIndexCodeList = data.list.map(item => {
      //       if (item.gbIndexCode) {
      //         return item.gbIndexCode
      //       } else {
      //         return item.cameraIndexCode
      //       }
      //     })
      //     this._focusMap([longitude, latitude], 18)
      //   }
      // })
    },
    // 切换活动路线，活动相关在地图上的渲染
    switchActiveRoute(curActiveItem) {
      this.curActiveObj = curActiveItem
      this._renderActiveToMap(curActiveItem)
      if (
        this.curMenuItem &&
        this.curMenuItem.active &&
        this.curMenuItem.name === '雪亮工程'
      ) {
        this._resetMapMarker()
        this._getActiveVideoList(curActiveItem.id)
      }
    },
    // 渲染活动相关
    _renderActiveToMap(curActive) {
      // 渲染活动地点marker
      if (curActive.activityAddresses && curActive.activityAddresses.length) {
        this.markingPointList = curActive.activityAddresses
          .filter(item => item.longitude && item.latitude)
          .map(item => {
            return {
              ...item,
              lat: item.latitude,
              lon: item.longitude,
              address: item.address
            }
          })
      }

      // 渲染活动路径
      if (curActive.activityRoutes && curActive.activityRoutes.length) {
        const points = curActive.activityRoutes
          .filter(item => item.longitude && item.latitude)
          .map(item => {
            return {
              ...item,
              lnglat: [item.longitude, item.latitude]
            }
          })

        renderPath(this.map, points, {
          width: 24, // 巡航器图片宽度
          height: 48, // 巡航器图片高度
          avatar: require('@/assets/image/command/car.png'), // 巡航器头像
          speed: 6500, // 普通巡航器速度
          loop: true,
          autoSetFitView: false
        })
      }
      this._focusMap()
    },
    // 视频聚合撒点
    _getActiveVideoList(id) {
      selectActivityBase({ id: id }).then(res => {
        const { status, data } = res
        if (status === 200) {
          if (data.positionInfos && data.positionInfos.length) {
            this.createVideoMarkers(data.positionInfos)
          }
        }
      })
    },
    // 创建视频点聚合标记
    createVideoMarkers(videoMakerList) {
      this.videoMarkerList = videoMakerList
      createPolymerizationMarker(
        this.map,
        videoMakerList,
        {
          className: 'video-point',
          compatibleKeys: {
            title: 'positionName'
          },
          draggable: true
        },
        data => {
          this.toggleVideoPlayWindow.visible = true
          this.toggleVideoPlayWindow.data = data
          this.toggleVideoPlayWindow.position = [data.longitude, data.latitude]
        },
        data => {
          this.$EventBus.$emit('updateVideoMarkerDragend', data)
        }
      )
    }
  }
}
