<template>
  <div class="index-map-contianer">
    <SimpleMap
      ref="AMap"
      class="map"
      :z-index="999"
      @mapInit="mapInit"
    >
      <div class="total-score">
        {{ selectedItem.name }}总分：<span>{{ selectedItem.total }}</span>
      </div>
      <div class="index-img-map-legend">
        <div
          v-for="(item, index) in colorLegend"
          :key="index"
          class="item"
        >
          <span
            class="color"
            :style="{ background: item.color }"
          />
          <span class="data">{{ item.score }}</span>
        </div>
      </div>
    </SimpleMap>
  </div>
</template>

<script>
import { buttonList, initTotalData } from './mock'
import {
  querySecurityAssessList,
  querySecurityAssessInfo,
  monthDataList
} from '@/api/intelligentDecisionMaking/comprehensive'
import { queryGridThreeLine } from '@/api/smartData/gridView'
export default {
  data () {
    return {
      map: null,
      buttonList: buttonList,
      selectedItem: initTotalData,
      textList: [],
      colorLegend: [
        { score: '90 ~ 100', color: '#073E7E' },
        { score: '87.5 ~ 90', color: '#3B9AFE' },
        { score: '85 ~ 87.5', color: '#0148D7' },
        { score: '0 ~ 85', color: '#F82A36' }
      ]
    }
  },
  async mounted () {
    // await this.handleQuerySecurityAssessList()
    await this.handleQuerySecurityAssessInfo()
    await this.handleMonthDataList()
    await this.changeData(this.selectedItem)
  },
  methods: {
    async mapInit (map) {
      this.map = map
      await this.handleQuerySecurityAssessList()
      await this.renderGrid()
      this.map.setCenter([116.026842, 28.688883])
      this.map.setZoom(10)
    },
    // 整合地图分数后端联调数据
    handleBackenddata (data, buttonList) {
      this.buttonList = data.map(item => {
        for (let index = 0; index < buttonList.length; index++) {
          const element = buttonList[index]
          if (item.gridCode === element.code) {
            return {
              ...element,
              value: item.score,
              total: item.score
            }
          }
        }
      })
    },
    // 整合指数详情后端联调数据
    handleBackendAssessInfodata (data, buttonList) {
      const flagArr = [
        '政治安全',
        '治安安全',
        '经济犯罪',
        '公共安全',
        '矛盾纠纷',
        '公众安全感'
      ]
      if (this.selectedItem.code === '3601') {
        this.selectedItem.scoreList = this.selectedItem.scoreList.map(
          (item, index) => data.detail[flagArr[index]]
        )
        this.selectedItem.total = data.totalScore
      } else {
        const that = this
        this.selectedItem = that.buttonList.filter(
          button => button.code === that.selectedItem.code
        )[0]
        this.selectedItem.scoreList = this.selectedItem.scoreList.map(
          (item, index) => data.detail[flagArr[index]]
        )
        this.selectedItem.total = data.totalScore
      }
    },
    // 切换数据
    async changeData (item) {
      if (item.name === this.selectedItem.name) {
        this.selectedItem = initTotalData
      } else {
        this.selectedItem = item
      }
      await this.handleQuerySecurityAssessList()
      await this.handleQuerySecurityAssessInfo()
      this.$EventBus.$emit('selectedItemData', this.selectedItem)
      this.$EventBus.$emit('selectedItemCode', this.selectedItem.code)
    },
    // 获取各县区得分
    async handleQuerySecurityAssessList () {
      try {
        const { status, data } = await querySecurityAssessList({
          indicatorName: '综合',
          level: 0
        })
        if (status === 200) {
          this.$nextTick(() => {
            this.handleBackenddata(data, this.buttonList)
          })
        }
      } catch (error) {}
    },
    // 获取各县区安全指数统计详情
    async handleQuerySecurityAssessInfo () {
      try {
        const { status, data } = await querySecurityAssessInfo({
          code: this.selectedItem.code
        })
        if (status === 200) {
          this.handleBackendAssessInfodata(data, this.buttonList)
        }
      } catch (error) {}
    },
    // 安全评分按按月变化情况
    async handleMonthDataList () {
      try {
        const { status, data } = await monthDataList({
          code: this.selectedItem.code,
          dataCount: this.monthNumber
        })
        if (status === 200) {
          this.$EventBus.$emit('backendMonthDataData', data)
        }
      } catch (error) {}
    },
    // 绘制地图 初始化图层
    async renderGrid () {
      let gridArr = []
      const polygons = []
      const { status, data } = await queryGridThreeLine()
      if (status === 200) {
        gridArr = data
      }
      //   console.log('-------', this.buttonList)
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
        // 点击区县切换分数排名、详情
        ploygon.on(
          'click',
          ({
            target: {
              w: { extData }
            }
          }) => {
            this.changeData(extData)
          }
        )
        polygons.push(ploygon)
        // 悬浮色块出现分数和名称
        ploygon.on(
          'mouseover',
          ({
            target: {
              w: { extData }
            }
          }) => {
            // console.log(extData)
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
          // 点击区县切换分数排名、详情
          text.on(
            'click',
            ({
              target: {
                w: { extData }
              }
            }) => {
              this.changeData(extData)
            }
          )
          // 悬浮色块出现分数和名称
          text.on(
            'mouseover',
            ({
              target: {
                w: { extData }
              }
            }) => {
              // console.log(extData)
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
    handleColor (total) {
      if (total >= 90) {
        return this.colorLegend[0].color
      } else if (total < 90 && total >= 87.5) {
        return this.colorLegend[1].color
      } else if (total < 87.5 && total >= 85) {
        return this.colorLegend[2].color
      } else if (total < 85 && total >= 0) {
        return this.colorLegend[3].color
      } else {
        return this.colorLegend[3].color
      }
    },
    // 悬浮处理
    handleAmapText (flag) {
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
