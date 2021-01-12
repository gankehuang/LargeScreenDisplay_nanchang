<template>
  <div class="index-map-contianer">
    <SimpleMap class="map" ref="AMap" @mapInit="mapInit" :zIndex="999">
    </SimpleMap>
  </div>
</template>

<script>
import { buttonList } from './mock'
import { queryGridThreeLine } from '@/api/smartData/gridView'
import { alertDistribution } from '@/api/intelligentDecisionMaking/special'
import SimpleMap from '@/components/SimpleMap'
export default {
  components: {
    SimpleMap
  },
  data() {
    return {
      map: null,
      buttonList: buttonList,
      textList: [],
      colorLegend: [
        { score: '220000 ~ 370000', color: '#073E7E' },
        { score: '150000 ~ 220000', color: '#3B9AFE' },
        { score: '45000 ~ 150000', color: '#0148D7' },
        { score: '0 ~ 45000', color: '#07B7D8' }
      ]
    }
  },
  methods: {
    async mapInit(map) {
      this.map = map
      await this.handleQuerySecurityAssessList()
      await this.renderGrid()
      this.map.setCenter([115.954058, 28.67804])
      this.map.setZoom(10)
    },
    // 获取各县区得分
    async handleQuerySecurityAssessList() {
      try {
        const { status, data } = await alertDistribution({})
        if (status === 200) {
          this.$nextTick(() => {
            this.handleBackenddata(data, this.buttonList)
          })
        }
      } catch (error) {}
    },
    // 整合地图分数后端联调数据
    handleBackenddata(data, buttonList) {
      this.buttonList = data.map(item => {
        for (let index = 0; index < buttonList.length; index++) {
          const element = buttonList[index]
          if (item.name === element.name) {
            return {
              ...element,
              value: item.value,
              total: item.value
            }
          }
        }
      })
    },
    // 绘制地图 初始化图层
    async renderGrid() {
      let gridArr = []
      const polygons = []
      const { status, data } = await queryGridThreeLine()
      if (status === 200) {
        gridArr = data
      }
      gridArr.forEach((item, index) => {
        this.buttonList.forEach(button => {
          if (button.code === item.gridCode) {
            item.total = button.total
          }
        })
        const ploygon = new window.AMap.Polygon({
          path: item.gps,
          strokeColor: '#2FD1D2',
          fillOpacity: 0.6,
          fillColor: this.handleColor(item.total),
          strokeStyle: 'dashed',
          zIndex: 9,
          strokeWeight: 2,
          bubble: true,
          cursor: 'pointer',
          extData: {
            code: item.gridCode,
            path: item.gridPath,
            gridLevel: item.gridLevel,
            name: item.gridName,
            total: item.total
          }
        })

        polygons.push(ploygon)
        // 悬浮色块出现分数和名称
        ploygon.on(
          'mouseover',
          ({
            target: {
              w: { extData }
            }
          }) => {
            this.handleAmapText(extData.code)
          }
        )
        ploygon.on(
          'mouseout',
          ({
            target: {
              w: { extData }
            }
          }) => {
            this.handleAmapText(undefined)
          }
        )
        // 绘制县区名称和分数
        if (item.gridLevel === 3) {
          let position = []
          if (item.gridName === '青云谱区') {
            position = [115.919124, 28.626145]
          } else if (item.gridName === '红谷滩区') {
            position = [115.772439, 28.605425]
          } else if (item.gridName === '青山湖区') {
            position = [115.980493, 28.639178]
          } else if (item.gridName === '新建区') {
            position = [116.011049, 28.979415]
          } else if (item.gridName === '经开区') {
            position = [115.87166, 28.768364]
          } else if (item.gridName === '东湖区') {
            position = [115.908738, 28.733148]
          }

          const text = new window.AMap.Text({
            text: item.gridName + '<br/>' + item.total,
            anchor: 'center', // 设置文本标记锚点
            // cursor: 'pointer',
            style: {
              'font-size': '24px',
              'text-align': 'center',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#00ffff'
            },
            extData: {
              code: item.gridCode,
              path: item.gridPath,
              gridLevel: item.gridLevel,
              name: item.gridName,
              total: item.total
            },
            visible: false,
            position: position.length ? position : [item.cenLon, item.cenLat]
          })

          // 悬浮色块出现分数和名称
          text.on(
            'mouseover',
            ({
              target: {
                w: { extData }
              }
            }) => {
              this.handleAmapText(extData.code)
            }
          )
          text.on(
            'mouseout',
            ({
              target: {
                w: { extData }
              }
            }) => {
              this.handleAmapText(undefined)
            }
          )
          this.textList.push(text)
        }
      })
      this.map.add(polygons)
      this.map.add(this.textList)
    },
    // 处理地区颜色
    handleColor(total) {
      if (total >= 370000) {
        return this.colorLegend[0].color
      } else if (total < 220000 && total >= 150000) {
        return this.colorLegend[1].color
      } else if (total < 150000 && total >= 45000) {
        return this.colorLegend[2].color
      } else if (total < 45000 && total >= 0) {
        return this.colorLegend[3].color
      } else {
        return this.colorLegend[3].color
      }
    },
    // 悬浮处理
    handleAmapText(flag) {
      if (!flag) {
        this.textList.forEach(item => {
          item.hide()
        })
      } else {
        this.textList.forEach(item => {
          if (flag === item.w.extData.code) {
            item.show()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index-map-contianer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 100%;
  height: 100%;
}
.map {
  width: 100%;
  height: 100%;
}
.index-img-map-legend {
  position: absolute;
  top: 150px;
  right: 500px;
  color: #a9daff;
  font-size: 26px;
  font-weight: bold;
  z-index: 1000;
  .color {
    width: 26px;
    height: 13px;
    background: #0d2861;
    border-radius: 7px;
    display: inline-block;
    margin-right: 10px;
  }
  .data {
    color: #a9daff;
    font-size: 18px;
  }
}
.total-score {
  position: absolute;
  top: 120px;
  left: 480px;
  color: #a9daff;
  font-size: 26px;
  font-weight: bold;
  z-index: 1000;
  span {
    color: #1bd7f9;
    font-size: 26px;
    font-weight: bold;
  }
}
</style>
