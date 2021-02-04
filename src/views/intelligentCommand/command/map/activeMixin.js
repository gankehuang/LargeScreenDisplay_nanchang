import { selectActivityBase } from '@/api/intelligentCommand/command'
import { createMapMarkerList, createPolymerizationMarker } from '@/common/createMapMarker'
import { renderPath } from '@/common/createTrajectory'
import { focusMap } from '@/utils/mapHelpler'

export default {
  data () {
    return {
      activePathVideoList: [],
      curActiveObj: {}
    }
  },
  methods: {
    // 更新地图上相关活动操作
    updateMapToActive (curActive) {
      this.curActiveObj = curActive
      // 渲染活动地点marker
      this.renderActivePointMarkers(curActive.activityAddresses)
      // 渲染活动路径
      this.renderActivePath(curActive.activityRoutes)

      // 渲染活动路线视频markers
      if (
        this.curOperateMapMenu &&
        this.curOperateMapMenu.active &&
        this.curOperateMapMenu.name === '雪亮工程'
      ) {
        // 底部菜单为激活状态下，且为雪亮工程
        this.renderActiveVideoMarkers(curActive.id)
      }
    },
    // 更新地图marker
    updateMapToMarker (curOperateMapMenu) {
      switch (curOperateMapMenu.name) {
        case '雪亮工程':
          this.renderActiveVideoMarkers(this.curActiveObj.id)
          break
      }
    },
    // 渲染活动地点 markers
    renderActivePointMarkers (activityAddresses) {
      if (activityAddresses && activityAddresses.length) {
        // 获取原始list数据
        const needList = activityAddresses.filter(item => item.longitude && item.latitude)
          .map(item => {
            return {
              ...item,
              lat: item.latitude,
              lon: item.longitude,
              address: item.address
            }
          })

        // 创建marker点
        const markerList = createMapMarkerList(
          this.map,
          needList,
          function (item) {
            return {
              zIndex: 999,
              icon: require('@/assets/image/command/icons.gif'),
              position: [item.lon, item.lat],
              size: [40, 60], // 图标所处区域大小
              imageSize: [40, 60], // 图标大小
              extData: item
            }
          },
          (data) => {
            const { longitude, latitude } = data
            this.$emit('clickMarkerPoint', data)
            focusMap(this.map, [longitude, latitude], 18)
          }
        )

        // 创建标记文字
        markerList.forEach(item => {
          const extData = item.w.extData
          item.setLabel({
            zIndex: 1000,
            offset: new window.AMap.Pixel(10, -30), // 设置文本标注偏移量
            content: `<div class="position-label">
                  ${extData.address}</div>` // 设置文本标注内容
          })
        })
      }
    },
    // 渲染活动路径
    renderActivePath (activityRoutes) {
      if (activityRoutes && activityRoutes.length) {
        const points = activityRoutes
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
    },
    // 渲染活动地点视频markers
    renderActiveVideoMarkers (activeId) {
      // 获取活动地点videoList数据
      selectActivityBase({ id: activeId }).then(res => {
        const { status, data } = res

        if (status === 200 && data.positionInfos) {
          this.activePathVideoList = data.positionInfos
          // 创建活动地点video markers
          if (data.positionInfos && data.positionInfos.length) {
            createPolymerizationMarker(
              this.map,
              data.positionInfos,
              {
                className: 'video-point',
                compatibleKeys: {
                  title: 'positionName'
                },
                draggable: true
              },
              data => {
                // 点击出现切换视频小弹框
                this.toggleVideoPlayWindow.visible = true
                this.toggleVideoPlayWindow.data = data
                this.toggleVideoPlayWindow.position = [data.longitude, data.latitude]
              },
              data => {
                // 将视频拖拽到页面左侧实时视频监控，进行替换
                this.$EventBus.$emit('updateVideoMarkerDragend', data)
              }
            )
          }
        }
      })
    }
  }
}
