<template>
  <div class="data-cockpit-top">
    <div class="gauge-container">
      <v-chart :options="gaugeOption" />
    </div>
    <div
      v-for="(item, index) in pieList"
      :key="index"
      class="pie-item"
      :class="`pie-item-${index}`"
    >
      <v-chart
        :options="item.option"
        class="v-chart"
      />
    </div>
  </div>
</template>

<script>
import { querySecurityAssessInfo } from '@/api/intelligentDecisionMaking/comprehensive'
const setOptions = (name, value, color) => {
  return {
    tooltip: {
      show: false,
      formatter: '{b} : {c}'
    },
    series: [
      {
        name: '',
        type: 'gauge',
        radius: '100%',
        startAngle: 180,
        endAngle: 0,
        pointer: {
          show: false,
          // 分隔线
          shadowColor: '#fff', // 默认透明
          shadowBlur: 5,
          width: 3
        },
        title: {
          show: true,
          offsetCenter: [0, '35%'],
          color: '#A9DAFF',
          fontSize: 14
        },
        axisLine: {
          length: 10, // 属性length控制线长
          lineStyle: {
            // 属性lineStyle控制线条样式
            color,
            width: 8,
            shadowColor: '#fff' // 默认透明
            // shadowBlur: 10
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        detail: {
          formatter: '{value}',
          offsetCenter: [0, '-20%'],
          color: '#fff',
          fontSize: 18,
          fontWeight: 700
        },
        data: [{ value, name }]
      }
    ]
  }
}
export default {
  data () {
    return {
      pieList: [
        {
          title: '矛盾纠纷',
          option: setOptions('矛盾纠纷', 77.827, [
            [0.77827, '#3B9AFE'],
            [1, '#6AFFF3']
          ])
        },
        {
          title: '经济安全',
          option: setOptions('经济安全', 84.21, [
            [0.8421, '#3B9AFE'],
            [1, '#6AFFF3']
          ])
        },
        {
          title: '政治安全',
          option: setOptions('政治安全', 90.93, [
            [0.9093, '#E9D600'],
            [1, '#6AFFF3']
          ])
        },
        {
          title: '治安安全',
          option: setOptions('治安安全', 85.274, [
            [0.85274, '#FE2821'],
            [1, '#6AFFF3']
          ])
        },
        {
          title: '公共安全',
          option: setOptions('公共安全', 93.687, [
            [0.93687, '#FF7F0E'],
            [1, '#6AFFF3']
          ])
        },
        {
          title: '公共安全感',
          option: setOptions('经济安全', 98.069, [
            [0.98069, '#3B9AFE'],
            [1, '#6AFFF3']
          ])
        }
      ],
      totalScore: 88.38
    }
  },
  computed: {
    gaugeOption () {
      return {
        tooltip: {
          show: false,
          formatter: '{b} : {c}'
        },
        series: [
          {
            name: '',
            type: 'gauge',
            radius: '75%',
            min: 60,
            max: 100,
            pointer: {
              // 分隔线
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5,
              width: 3
            },
            title: {
              show: true,
              offsetCenter: [0, '35%'],
              color: '#A9DAFF',
              fontSize: 16
            },
            axisLine: {
              length: 1, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, '#3B9AFE']],
                width: 3,
                shadowColor: '#fff' // 默认透明
                // shadowBlur: 10
              }
            },
            axisTick: {
              show: false,
              // 坐标轴小标记
              length: 5, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            axisLabel: {
              color: '#87C1FF',
              fontSize: 8
            },
            splitLine: {
              // 分隔线
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 2,
                color: '#3B9AFE',
                shadowColor: '#fff' // 默认透明
                // shadowBlur: 10
              }
            },
            detail: {
              formatter: '{value}',
              offsetCenter: [0, '78%'],
              color: '#fff',
              fontSize: 24,
              fontWeight: 700
            },
            data: [{ value: this.totalScore, name: '总分' }]
          }
        ]
      }
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:datCocMapItem')
  },
  mounted () {
    this.handleQuerySecurityAssessInfo({})
    this.$EventBus.$on('update:datCocMapItem', item => {
      // console.log('----------', item)
      this.handleQuerySecurityAssessInfo(item)
    })
  },
  // 获取县区六大指标分、总分
  methods: {
    // 获取各县区安全指数统计详情
    async handleQuerySecurityAssessInfo (item) {
      try {
        const { status, data } = await querySecurityAssessInfo({
          code: item.code || '3601'
        })
        if (status === 200) {
          this.handleBackendAssessInfodata(data)
        }
      } catch (error) {}
    },
    // 处理各县区安全指数同合计后台数据
    handleBackendAssessInfodata (data) {
      this.totalScore = data.totalScore
      for (const key in data.detail) {
        if (data.detail.hasOwnProperty(key)) {
          const value = data.detail[key]
          switch (key) {
            case '矛盾纠纷':
              this.pieList[0].option = setOptions('矛盾纠纷', value, [
                [value / 100, '#3B9AFE'],
                [1, '#6AFFF3']
              ])
              break
            case '经济安全':
              this.pieList[1].option = setOptions('经济安全', value, [
                [value / 100, '#3B9AFE'],
                [1, '#6AFFF3']
              ])
              break
            case '政治安全':
              this.pieList[2].option = setOptions('政治安全', value, [
                [value / 100, '#3B9AFE'],
                [1, '#6AFFF3']
              ])
              break
            case '治安安全':
              this.pieList[3].option = setOptions('治安安全', value, [
                [value / 100, '#3B9AFE'],
                [1, '#6AFFF3']
              ])
              break
            case '公共安全':
              this.pieList[4].option = setOptions('公共安全', value, [
                [value / 100, '#3B9AFE'],
                [1, '#6AFFF3']
              ])
              break
            case '公众安全感':
              this.pieList[5].option = setOptions('公众安全感', value, [
                [value / 100, '#3B9AFE'],
                [1, '#6AFFF3']
              ])
              break
            default:
              break
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.data-cockpit-top {
  position: absolute;
  top: 35px;
  left: 50%;
  width: 950px;
  height: 230px;
  margin-left: -475px;
  // z-index: 998;
}
.gauge-container {
  position: absolute;
  width: 187px;
  height: 187px;
  left: 50%;
  margin-left: -93.5px;
  background: url("~@/assets/image/dataCockpit/椭圆 1111.png") center center /
    100% 100% no-repeat;
}
.pie-item {
  width: 98px;
  height: 70px;
  background: url("~@/assets/image/dataCockpit/组 149.png") center center / 100%
    100% no-repeat;
}
.v-chart {
  width: 86px;
  height: 86px;
  margin: 10px 0 0 7px;
}
.label {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  color: #a9daff;
}
.pie-item-0 {
  position: absolute;
  left: 15px;
  bottom: 10px;
}
.pie-item-1 {
  position: absolute;
  left: 140px;
  bottom: 65px;
}
.pie-item-2 {
  position: absolute;
  left: 270px;
  bottom: 105px;
}

.pie-item-3 {
  position: absolute;
  right: 270px;
  bottom: 105px;
}

.pie-item-4 {
  position: absolute;
  right: 140px;
  bottom: 65px;
}

.pie-item-5 {
  position: absolute;
  right: 15px;
  bottom: 10px;
}
</style>
