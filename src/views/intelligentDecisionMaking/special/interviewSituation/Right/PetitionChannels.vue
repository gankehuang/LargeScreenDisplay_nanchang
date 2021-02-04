<template>
  <InfoBlock
    height="32%"
    title="信访渠道"
  >
    <v-chart
      :options="amountOptions"
      class="echarts"
    />
  </InfoBlock>
</template>
<script>
import { queryPetitionByChannel } from '@/api/intelligentDecisionMaking/mood'
export default {
  data () {
    return {
      amountOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '5%',
          top: '10%',
          width: '90%',
          height: '88%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              color: '#A9DAFF',
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: '#004968'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.5)']
              }
            },
            axisTick: {
              show: false
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: '#A9DAFF'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.5)']
              }
            },
            axisLine: {
              lineStyle: {
                color: '#A9DAFF'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            barWidth: '30px',
            data: [],
            emphasis: {
              label: {
                show: true,
                position: 'top',
                color: '#AADAFF'
              }
            },
            itemStyle: {
              normal: {
                label: {},
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#3C9AFE'
                    },
                    {
                      offset: 1,
                      color: '#00FFFF'
                    }
                  ],
                  global: false
                }
              }
            }
          }
        ]
      }
    }
  },
  created () {
    this.queryPetitionByChannel()
  },
  methods: {
    queryPetitionByChannel () {
      queryPetitionByChannel().then(res => {
        if (res.status === 200) {
          const newArr = res.data.sort(this._compare('value'))
          newArr.forEach((item, index) => {
            this.amountOptions.xAxis[0].data.unshift(item.name)
            this.amountOptions.series[0].data.unshift(item.value)
          })
        }
      })
    },
    _compare (property) {
      return function (a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow: auto;
}
</style>
