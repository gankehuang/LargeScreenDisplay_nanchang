import {
  getVehicleSnapRecords,
  queryPeopleRecord
} from '@/api/riskPrevention/importPeople'

export default {
  data() {
    return {
      navg: null
    }
  },
  methods: {
    showPath(info, type) {
      if (type === 1) {
        // 车辆轨迹
        this.loading = true
        const fd = {
          beginTime: '2020-01-01 00:00:00',
          endTime: '2020-10-25 00:00:00',
          plateNo: '赣ADY888'
        }
        getVehicleSnapRecords(1, 20, fd).then(res => {
          this.loading = false
          if (res.status === 200) {
            const listObj = []

            res.data.list.forEach(item => {
              if (item.longitude && item.latitude) {
                listObj.push({
                  ...item,
                  lnglat: [item.longitude, item.latitude]
                })
              }
            })

            if (listObj.length > 0) {
              this.renderPath(
                listObj,
                require('@/assets/image/command/car.png'),
                24,
                48,
                true
              )
            } else {
              this.$message.warning('该人员车辆暂无轨迹！')
            }
          }
        })
      } else {
        // 人员轨迹
        const fd = {
          certificateNumber: info.idCard,
          beginTime: '2020-01-01 00:00:00',
          endTime: '2021-10-25 00:00:00'
        }
        this.loading = true
        queryPeopleRecord(1, 50, fd).then(res => {
          this.loading = false
          const list = []
          if (res.data.list) {
            res.data.list.forEach(item => {
              if (item.longitude && item.latitude) {
                list.push({
                  ...item,
                  lnglat: [item.longitude, item.latitude]
                })
              }
            })
            if (list.length > 0) {
              const list1 = list.reverse()
              this.renderPath(list1, info.imgbase64, 80, 80, false)
            }
          } else {
            this.$message.warning('该人员暂无轨迹！')
          }
        })
      }
    },
    // 渲染轨迹
    renderPath(
      path,
      personAvatar,
      width = 80,
      height = 80,
      isAutoRotate = false
    ) {
      window.pathSimplifierIns ? window.pathSimplifierIns.setData([]) : null
      this.navg ? this.navg.destroy() : null

      const that = this
      window.AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(
        PathSimplifier,
        $
      ) {
        if (!PathSimplifier.supportCanvas) {
          alert('当前环境不支持 Canvas！')
          return
        }

        const pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          // autoSetFitView:false,
          map: that.map, // 所属的地图实例
          getPath: function(pathData, pathIndex) {
            const points = pathData.points
            const lnglatList = []

            for (var i = 0, len = points.length; i < len; i++) {
              lnglatList.push(points[i].lnglat)
            }

            return lnglatList
          },
          getHoverTitle: null,
          renderOptions: {
            renderAllPointsIfNumberBelow: -1,
            pathTolerance: 2,
            keyPointTolerance: 0,
            pathLineStyle: {
              lineWidth: 3,
              strokeStyle: '#F7B538',
              borderWidth: 1,
              borderStyle: '#eeeeee',
              dirArrowStyle: false
            },
            pathLineHoverStyle: {
              lineWidth: 3,
              strokeStyle: 'rgba(204, 63, 88,1)',
              borderWidth: 1,
              borderStyle: '#cccccc',
              dirArrowStyle: false
            },
            pathLineSelectedStyle: {
              lineWidth: 6,
              strokeStyle: '#C11534',
              borderWidth: 1,
              borderStyle: '#cccccc',
              dirArrowStyle: true
            },
            dirArrowStyle: {
              stepSpace: 35,
              strokeStyle: '#ffffff',
              lineWidth: 2
            },
            startPointStyle: {
              radius: 4,
              fillStyle: '#109618',
              lineWidth: 1,
              strokeStyle: '#eeeeee'
            },
            endPointStyle: {
              radius: 4,
              fillStyle: '#dc3912',
              lineWidth: 1,
              strokeStyle: '#eeeeee'
            },
            keyPointStyle: {
              radius: 7,
              fillStyle: 'rgba(8, 126, 196, 1)',
              lineWidth: 1,
              strokeStyle: '#eeeeee'
            },
            keyPointHoverStyle: {
              radius: 4,
              fillStyle: 'yellow',
              lineWidth: 2,
              strokeStyle: '#ffa500'
            },
            keyPointOnSelectedPathLineStyle: {
              radius: 4,
              fillStyle: 'rgba(8, 126, 196, 1)',
              lineWidth: 2,
              strokeStyle: '#eeeeee'
            }
          }
        })

        window.pathSimplifierIns = pathSimplifierIns

        // 设置数据
        pathSimplifierIns.setData([
          {
            name: '路线0',
            points: path
          }
        ])

        function onload() {
          pathSimplifierIns.renderLater()
        }

        function onerror(e) {
          alert('图片加载失败！')
        }

        // 对第一条线路（即索引 0）创建一个巡航器
        that.navg = pathSimplifierIns.createPathNavigator(0, {
          loop: true, // 循环播放
          speed: 3000, // 巡航速度，单位千米/小时
          pathNavigatorStyle: {
            width: width,
            height: height,
            autoRotate: isAutoRotate,
            // 使用图片
            content: PathSimplifier.Render.Canvas.getImageContent(
              personAvatar,
              onload,
              onerror
            ),
            strokeStyle: null,
            fillStyle: null,
            pathTolerance: 5,
            keyPointTolerance: 3,
            pathLinePassedStyle: {
              lineWidth: 6,
              strokeStyle: 'green',
              dirArrowStyle: {
                stepSpace: 15,
                strokeStyle: 'yellow'
              }
            }
          }
        })

        that.navg.start()

        pathSimplifierIns.on('pointClick', function(e, info) {
          that.infoWindowData = {
            lat: e.originalEvent.lnglat.lat,
            lon: e.originalEvent.lnglat.lng,
            ...info.pathData.points[info.pointIndex]
          }
        })
      })
    },
    // 隐藏轨迹
    hidePath() {
      window.pathSimplifierIns ? window.pathSimplifierIns.setData([]) : null
      this.navg ? this.navg.destroy() : null
      this.navg = null
    }
  }
}
