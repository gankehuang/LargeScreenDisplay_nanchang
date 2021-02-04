import {
  getVehicleSnapRecords,
  queryPeopleRecord
} from '@/api/riskPrevention/importPeople'
import { renderPath } from '@/common/createTrajectory'

export default {
  data () {
    return {
      showCloseButton: false
    }
  },
  methods: {
    showPath (info, type) {
      if (type === 1) {
        this._createVehicleTrajectory(info)
      } else {
        this._createPersonTrajectory(info)
      }
    },
    // 车辆轨迹
    _createVehicleTrajectory () {
      const fd = {
        beginTime: '2020-01-01 00:00:00',
        endTime: '2021-10-25 00:00:00',
        plateNo: '赣ADY888'
      }
      getVehicleSnapRecords(1, 20, fd).then(res => {
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
            renderPath(this.map, listObj, {
              width: 24,
              height: 48,
              isAutoRotate: true,
              avatar: require('@/assets/image/command/car.png'),
              speed: 3000
            })
          } else {
            this.$message.warning('该人员车辆暂无轨迹！')
          }
        }
      })
    },
    // 人员轨迹
    _createPersonTrajectory (info) {
      console.log('info', info)
      const fd = {
        certificateNumber: info.idCard,
        beginTime: '2020-01-01 00:00:00',
        endTime: '2021-10-25 00:00:00'
      }
      queryPeopleRecord(1, 50, fd).then(res => {
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
            this.showCloseButton = true
            const list1 = list.reverse()
            renderPath(
              this.map,
              list1,
              {
                width: 80,
                height: 80,
                isAutoRotate: false,
                avatar: info.imgbase64,
                speed: 3000
              },
              (e, info) => {
                this.infoWindowData = {
                  lat: e.originalEvent.lnglat.lat,
                  lon: e.originalEvent.lnglat.lng,
                  ...info.pathData.points[info.pointIndex]
                }
              }
            )
          } else {
            this.$message.warning('抓拍图没有经纬度信息，未查询到轨迹信息!')
          }
        } else {
          this.$message.warning('该人员暂无轨迹！')
        }
      })
    },
    // 关闭轨迹
    closeTrajectory () {
      this.showCloseButton = false
      if (window.pathSimplifierIns) {
        window.pathSimplifierIns.setData([])
      }
      if (window.navg) {
        window.navg.destroy()
      }
    }
  }
}
