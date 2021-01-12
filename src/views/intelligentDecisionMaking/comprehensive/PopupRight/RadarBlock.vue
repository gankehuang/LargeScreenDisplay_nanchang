<template>
  <div class="RadarBlock-container">
    <div class="RadarBlock-title">一级指标得分</div>
    <div class="echarts-container">
      <div class="legend">
        <p><span></span></p>
        <p><span></span></p>
      </div>
      <v-chart :options="options" style="width:100%;height:100%" />
    </div>
  </div>
</template>

<script>
import { querySecurityAssessInfo } from '@/api/intelligentDecisionMaking/comprehensive'
export default {
  props: {
    code: {
      type: String,
      default: () => '3601'
    },
    codeName: {
      type: String,
      default: () => '南昌市'
    }
  },
  data() {
    return {
      options: {
        legend: {
          data: [this.codeName, '全市平均指标'],
          textStyle: {
            color: '#fff'
          },
          top: '2%'
        },
        color: ['#00FFFF', '#A9DAFF'],
        radar: [
          {
            indicator: [
              { text: '公众安全感', max: 100 },
              { text: '公共安全', max: 100 },
              { text: '政治安全', max: 100 },
              { text: '治安安全', max: 100 },
              { text: '矛盾纠纷', max: 100 },
              { text: '经济犯罪', max: 100 }
            ],
            center: ['50%', '50%'],
            radius: 120,
            startAngle: 90,
            splitNumber: 4,
            // nameGap: 10,
            shape: 'circle',
            name: {
              formatter: '{value}',
              textStyle: {
                color: '#72ACD1'
              }
            },
            splitArea: {
              areaStyle: {
                color: [
                  'rgba(0, 85, 255, 0.16)',
                  'rgba(0, 85, 255, 0.32)',
                  'rgba(0, 85, 255, 0.48);'
                ],
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 10
              }
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.5)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.5)'
              }
            }
          }
        ],
        series: [
          {
            name: '雷达图',
            type: 'radar',
            emphasis: {
              lineStyle: {
                width: 4
              }
            },
            data: [
              {
                value: [],
                name: this.codeName,
                // symbol: 'none',
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.value
                  },
                  position: 'insideTop',
                  textStyle: {
                    color: '#fff',
                    fontSize: 16
                  }
                },
                areaStyle: {
                  color: '#00FFFF'
                },
                lineStyle: {
                  color: '#00FFFF'
                }
              },
              {
                value: [],
                name: '全市平均指标',
                // symbol: 'none',
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.value
                  },
                  // position: 'insideTop',
                  textStyle: {
                    color: '#fff',
                    fontSize: 16
                  }
                },
                areaStyle: {
                  color: '#A9DAFF'
                },
                lineStyle: {
                  color: '#A9DAFF'
                }
              }
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.cityTnfo()
    this.regionInfo()
  },
  methods: {
    cityTnfo() {
      querySecurityAssessInfo({
        code: '3601'
      }).then(res => {
        const that = this
        Object.keys(res.data.detail).forEach(function(key) {
          that.options.series[0].data[1].value.push(res.data.detail[key])
        })
      })
    },
    regionInfo() {
      querySecurityAssessInfo({
        code: this.code
      }).then(res => {
        const that = this
        Object.keys(res.data.detail).forEach(function(key) {
          that.options.series[0].data[0].value.push(res.data.detail[key])
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.RadarBlock-container {
  width: 675px;
  padding: 10px 0 0 50px;
  display: inline-block;
}
.RadarBlock-title {
  letter-spacing: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #a9daff;
  writing-mode: vertical-rl;
  height: 376px;
  text-align: center;
  display: inline-block;
}
.echarts-container {
  width: 562px;
  height: 376px;
  margin-left: 20px;
  background: url("~@/assets/image/comprehensive/echarts-bg.png") center center /
    100% 100% no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  display: inline-block;
  position: relative;
  .legend {
    position: absolute;
  }
}
</style>
