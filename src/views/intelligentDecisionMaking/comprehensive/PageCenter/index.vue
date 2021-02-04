<template>
  <div class="samrt-make-policy-center">
    <div class="total-score">
      总分：<span>{{ selectedItem.total }}</span>
      <div class="select-box">
        <el-select
          v-model="yearValue"
          placeholder="请选择"
          class="yearSelect"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in yearOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="monthValue"
          placeholder="请选择"
          class="monthSelect"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in monthOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <v-chart
      id="nanChang"
      style="width:100%;height:100%"
      :options="options"
    />
  </div>
</template>

<script>
import ECharts from 'echarts'
import nanChangMap from './nanChang.json'

import { buttonList, initTotalData } from '../mock'
import {
  querySecurityAssessList,
  querySecurityAssessInfo,
  monthDataList
} from '@/api/intelligentDecisionMaking/comprehensive'
ECharts.registerMap('nanChang', nanChangMap)

export default {
  data () {
    return {
      yearOptions: [
        {
          value: '2020',
          label: '2020'
        }
      ],
      monthOptions: [
        {
          value: '1',
          label: '1月'
        },
        {
          value: '2',
          label: '2月'
        },
        {
          value: '3',
          label: '3月'
        },
        {
          value: '4',
          label: '4月'
        },
        {
          value: '5',
          label: '5月'
        },
        {
          value: '6',
          label: '6月'
        },
        {
          value: '7',
          label: '7月'
        },
        {
          value: '8',
          label: '8月'
        },
        {
          value: '9',
          label: '9月'
        },
        {
          value: '10',
          label: '10月'
        },
        {
          value: '11',
          label: '11月'
        },
        {
          value: '12',
          label: '12月'
        }
      ],
      monthValue: '1',
      yearValue: '2020',
      time: 1,
      selectedItem: initTotalData,
      nanChangMapEchart: undefined,
      buttonList: buttonList,
      monthNumber: new Date().getMonth()
    }
  },
  computed: {
    options () {
      return {
        geo: {
          type: 'map',
          map: 'nanChang',
          aspectScale: 1,
          zoom: 0.9,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#5293D6'
            // normal: {
            //   shadowBlur: 10,
            //   shadowColor: 'rgba(2,64,116,1)',
            //   shadowOffsetX: -10,
            //   shadowOffsetY: 20
            // }
          }
        },
        dataRange: {
          x: 'right',
          y: '100px',
          textStyle: {
            color: '#A9DAFF'
          },
          splitList: [
            { start: 98, end: 100 },
            { start: 96, end: 98 },
            { start: 94, end: 96 },
            { start: 90, end: 94 }
          ],
          color: ['#F82A36', '#F16C00', '#C9A73A', '#0D2861'].reverse()
        },
        series: [
          {
            name: '综合评分',
            type: 'map',
            mapType: 'nanChang',
            data: this.buttonList,
            // roam: true, // 禁止缩放
            aspectScale: 1,
            zlevel: 2,
            zoom: 0.9,
            itemStyle: {
              normal: {
                borderWidth: 2, // 区域边框宽度
                borderColor: '#76B8FC' // 区域边框颜色
                // areaColor: '#0D2861' // 区域颜色
                // shadowColor: 'rgba(0, 0, 0, 0.5)',
                // shadowBlur: 5
                // shadowOffsetX: 0,
                // shadowOffsetY: 0,
              },
              // 高亮提示
              emphasis: {
                label: {
                  fontSize: 24,
                  fontWeight: 'bold'
                },
                borderWidth: 2,
                borderColor: '#5293D6',
                areaColor: '#025ABA'
              }
            },

            label: {
              show: true,
              position: 'top',
              margin: 8,
              textStyle: {
                fontSize: 16,
                color: '#fff'
              },
              formatter: function (params) {
                return params.name + '\n' + params.value
              },
              emphasis: {
                // 对应的鼠标悬浮效果
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    selectedItem (item) {
      this.handleMonthDataList()
    }
  },
  async created () {
    await this.handleQuerySecurityAssessList()
    await this.handleQuerySecurityAssessInfo()
    await this.handleMonthDataList()
    await this.changeData(this.selectedItem)
    this.initMapClick()
  },
  methods: {
    // 初始化地图添加点击事件
    initMapClick () {
      const that = this
      that.$nextTick(() => {
        that.nanChangMapEchart = ECharts.init(
          document.getElementById('nanChang')
        )
        that.nanChangMapEchart.on('click', ({ data }) => {
          this.handleSelectedByMapClick(data)
          that.changeData(data)
        })
      })
    },
    // 整合地图分数后端联调数据
    handleBackenddata (data, buttonList) {
      this.buttonList = data.map(item => {
        for (let index = 0; index < buttonList.length; index++) {
          const element = buttonList[index]
          if (item.gridCode === element.code) {
            return {
              ...element,
              value: item.score
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
        // console.log(this.selectedItem)
      } else {
        const that = this
        this.selectedItem = that.buttonList.filter(
          button => button.code === that.selectedItem.code
        )[0]
        this.selectedItem.scoreList = this.selectedItem.scoreList.map(
          (item, index) => data.detail[flagArr[index]]
        )
        this.selectedItem.total = data.totalScore
        // console.log(this.selectedItem)
      }
    },
    // 地图选中
    handleSelectedByMapClick (data) {
      const that = this
      this.buttonList = this.buttonList.map(item => {
        if (item.code === data.code && item.code !== that.selectedItem.code) {
          return {
            ...item,
            selected: true
          }
        } else {
          return {
            ...item,
            selected: false
          }
        }
      })
    },
    // 切换数据
    async changeData (item) {
      if (item.name === this.selectedItem.name) {
        this.selectedItem = initTotalData
      } else {
        this.selectedItem = item
      }
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
          this.handleBackenddata(data, this.buttonList)
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
    }
  }
}
</script>

<style lang="scss">
.samrt-make-policy-center {
  position: fixed;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 970px;
  height: 832px;
}
.echart-map {
  width: 100%;
  height: 100%;
}
.button {
  position: absolute;
  z-index: 999;
  cursor: pointer;
  background-color: rgba(31, 85, 142, 0.28);
  border-radius: 6px;
  text-align: center;
  color: #fff;
}
.total-score {
  position: absolute;
  top: 60px;
  left: 10px;
  color: #a9daff;
  font-size: 26px;
  font-weight: bold;

  span {
    color: #1bd7f9;
    font-size: 26px;
    font-weight: bold;
  }
}
.select-box {
  width: 171px;
  height: 48px;
  background: url("~@/assets/image/comprehensive/select-bgm.png") no-repeat;
  position: absolute;
  top: 40px;
  left: -10px;
  z-index: 2;
  .el-select {
    width: 85px;
    height: 48px;
  }
  .el-input--small .el-input__inner {
    width: 85px !important;
    height: 48px !important;
    border: none;
  }
}

.yearSelect {
  .el-select-dropdown {
    min-width: 170px !important;
    background-color: #00285b !important;
  }
  .popper__arrow {
    left: 77px !important;
  }
  .el-select-dropdown__item span {
    font-size: 14px !important;
    color: #fff;
    font-weight: normal !important;
  }
  .el-select-dropdown__item {
    text-align: center;
  }
}

.monthSelect {
  .el-select-dropdown {
    min-width: 170px !important;
    left: 486px !important;
    background-color: #00285b !important;
  }
  .popper__arrow {
    left: 77px !important;
  }
  .el-select-dropdown__item {
    text-align: center;
  }
  .el-select-dropdown__item span {
    font-size: 14px !important;
    color: #fff;
    font-weight: normal !important;
  }
}
</style>
