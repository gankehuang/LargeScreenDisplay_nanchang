export default {
  data () {
    return {
      mapMouseTool: null,
      mapRangingTool: null,
      isDrawing: false
    }
  },
  methods: {
    // 切换圈选工具
    handleMapBoxSelection (type) {
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
    // 画图工具逐渐 初始化
    createMouseTool (map) {
      this.mapMouseTool = new window.AMap.MouseTool(map)
      this.mapMouseTool.on('draw', e => {
        const obj = e.obj
        if (
          obj.CLASS_NAME === 'AMap.Polygon' ||
          obj.CLASS_NAME === 'AMap.Circle'
        ) {
          // 圈选选中的摄像头，在页面左侧进行播放
          if (
            this.activePathVideoList.length &&
            this.curOperateMapMenu.active &&
            this.curOperateMapMenu.name === '雪亮工程'
          ) {
            // 判断并从视频列表中过滤圈选范围之内的前6个摄像头
            const cameraIndexCodeList = this.activePathVideoList
              .filter(item => obj.contains([item.longitude, item.latitude]))
              .map(item => {
                return {
                  cameraIndexCode: item.gbIndexCode
                    ? item.gbIndexCode
                    : item.cameraIndexCode,
                  positionName: item.positionName
                }
              })
              .slice(0, 6)

            this.$emit('handleBoxSelect', cameraIndexCodeList)
          }

          this.isDrawing = false
          this.mapMouseTool.close(true)
        }
      })
    },
    // 测距工具 初始化
    createRangingTool (map) {
      this.mapRangingTool = new window.AMap.RangingTool(map)
      this.mapRangingTool.on('end', () => {
        this.mapRangingTool.turnOff()
      })
    },
    // 绘制矩形框选
    drawRectangle () {
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
    drawCircle () {
      if (!this.mapMouseTool) return false
      this.isDrawing = true
      this.mapMouseTool.circle({
        fillColor: '#00b0ff',
        strokeColor: '#80d8ff'
      })
    },
    // 绘制多变形框选
    drawPolygon () {
      if (!this.mapMouseTool) return false
      this.isDrawing = true
      this.mapMouseTool.polygon({
        fillColor: '#00b0ff',
        strokeColor: '#80d8ff'
      })
    }
  }
}
