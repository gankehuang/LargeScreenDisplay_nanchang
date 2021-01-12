import { getDepartmentList } from '@/api/intelligentCommand/command'

export default {
  data() {
    return {
      mapMouseTool: null,
      mapRangingTool: null,
      isDrawing: false,
      departmentList: [],
      pathId: null,
      selectedDevices: [],
      modal: '',
      monitorId: '',
      voiceIds: [],
      infoWindowData: null,
      infoWindowEvents: {
        close: () => {
          this.infoWindowData = null
        }
      }
    }
  },
  computed: {
    onlineList() {
      return this.departmentList.filter(item => item.isOnline)
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('focusDevice')
    this.$EventBus.$off('schedulingVideo')
  },
  mounted() {
    this.$EventBus.$on('focusDevice', res => {
      this.focusDevice(res)
    })
    this.$EventBus.$on('schedulingVideo', res => {
      this.showMonitor(res)
    })
  },
  methods: {
    mapInit(map) {
      this.createMouseTool(map)
      this.createRangingTool(map)
    },
    // 获取使用的设备列表
    getDepartmentList() {
      getDepartmentList().then(res => {
        this.departmentList = res
      })
    },
    // 点击在线设备图标
    openDeviceModal(device) {
      if (this.isDrawing) return false
      this.map.setCenter([device.lon, device.lat])
      this.infoWindowData = device
    },
    // 查看设备轨迹
    showPath(id) {
      this.pathId = id
      this.infoWindowData = null
    },
    // 显示远程视频弹框
    showMonitor(id) {
      this.infoWindowData = null
      this.monitorId = id
      this.modal = 'monitor'
    },
    // 显示语音对讲弹框
    showVoice(ids) {
      this.voiceIds = ids
      this.infoWindowData = null
      this.modal = 'voice'
    },
    // 聚焦当前选择的在线设备
    focusDevice(pos) {
      this._focusMap(pos, 16)
    },
    // 画图工具逐渐 初始化
    createMouseTool(map) {
      this.mapMouseTool = new window.AMap.MouseTool(map)
      this.mapMouseTool.on('draw', e => {
        const obj = e.obj
        if (
          obj.CLASS_NAME === 'AMap.Polygon' ||
          obj.CLASS_NAME === 'AMap.Circle'
        ) {
          this.selectedDevices = this.onlineList.filter(device =>
            obj.contains([device.lon, device.lat])
          )
          if (this.selectedDevices.length > 0) {
            this.modal = 'device'
          }
          this.isDrawing = false
          this.mapMouseTool.close(true)
        }
      })
    },
    // 测距工具 初始化
    createRangingTool(map) {
      this.mapRangingTool = new window.AMap.RangingTool(map)
      this.mapRangingTool.on('end', () => {
        this.mapRangingTool.turnOff()
      })
    },
    // 切换圈选工具
    bindToolBtn(type) {
      switch (type) {
        case 'rectangle':
          this.drawRectangle()
          break
        case 'circle':
          this.drawCircle()
          break
        case 'polygon':
          this.drawPolygon()
          break
        case 'distance':
          this.mapRangingTool.turnOn()
          this.isDrawing = true
          break
        default:
          break
      }
    },
    // 绘制矩形框选
    drawRectangle() {
      if (!this.mapMouseTool) return false
      this.isDrawing = true
      this.mapMouseTool.rectangle({
        fillColor: '#00b0ff',
        strokeColor: '#80d8ff',
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillOpacity: 0.5,
        strokeStyle: 'solid'
      })
    },
    // 绘制圆形框选
    drawCircle() {
      if (!this.mapMouseTool) return false
      this.isDrawing = true
      this.mapMouseTool.circle({
        fillColor: '#00b0ff',
        strokeColor: '#80d8ff'
      })
    },
    // 绘制多变形框选
    drawPolygon() {
      if (!this.mapMouseTool) return false
      this.isDrawing = true
      this.mapMouseTool.polygon({
        fillColor: '#00b0ff',
        strokeColor: '#80d8ff'
      })
    }
  }
}
