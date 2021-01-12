<template>
  <div class="BarBlock-container">
    <div class="BarBlock-title">靠后二级指标</div>
    <div class="echarts-container">
      <div></div>
      <v-chart :options="options" style="width:100%;height:100%" />
    </div>
  </div>
</template>

<script>
import { superviseStatisticByRegion } from '@/api/intelligentDecisionMaking/comprehensive'
export default {
  props: {
    code: {
      type: String,
      default: () => '3601'
    }
  },
  data() {
    return {
      options: {
        color: ['#00FFFF', '#3B9AFE'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['平均', '本月'],
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '5%',
          right: '4%',
          bottom: '10%',
          width: '85%',
          height: '75%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD',
            interval: 0,
            rotate: -20
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          },
          data: []
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#458CDD',
            interval: 0
            // rotate: -40
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '本月',
            type: 'bar',
            barWidth: 15, // 柱图宽度
            data: [],
            markLine: {
              lineStyle: {
                type: 'dashed'
              },
              data: [
                {
                  name: '平均线',
                  // 支持 'average', 'min', 'max'
                  type: 'average'
                }
              ]
            }
          },
          {
            name: '平均',
            type: 'bar',
            barWidth: 15, // 柱图宽度
            data: [],
            markLine: {
              lineStyle: {
                type: 'dashed'
              },
              data: [
                {
                  name: '平均线',
                  // 支持 'average', 'min', 'max'
                  type: 'average'
                }
              ]
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const list = {
        code: this.code
      }
      superviseStatisticByRegion(list).then(res => {
        console.log(res)
        if (res.status === 200) {
          res.data.lowRank2Indicators.forEach(item => {
            this.options.xAxis.data.push(item.indicatorName)
            this.options.series[0].data.push(item.score)
            this.options.series[1].data.push(item.average)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.BarBlock-container {
  width: 675px;
  padding: 10px 0 0 30px;
  display: inline-block;
}
.BarBlock-title {
  font-size: 18px;
  font-weight: bold;
  color: #a9daff;
  letter-spacing: 10px;
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
}
</style>
