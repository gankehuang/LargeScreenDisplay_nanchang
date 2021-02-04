<template>
  <InfoBlock title="事件预警趋势">
    <v-chart
      :options="options"
      class="trend-echarts"
    />
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      tab: 0,
      options: {
        name: '事件预警趋势',
        type: 'line',
        grid: {
          top: '10%',
          width: '90%',
          height: '80%'
        },
        smooth: true,
        symbol: 'none',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#0780F1'
        },
        tooltip: {
          show: true,
          formatter: '{b}<br/>{c}'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD'
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
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#458CDD'
          },
          splitLine: {
            show: true,
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
            data: [100, 132, 201, 234, 190, 230, 120, 200, 332, 101, 234, 390],
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
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
                    color: '#14ACFF00'
                  }
                ],
                global: false
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    updataTrend (curItem) {
      switch (curItem.name) {
        case '省行政中心':
          this.options.series[0].data = [100, 132, 201, 234, 190, 230, 120, 200, 332, 101, 234, 390]
          break
        case '市行政中心':
          this.options.series[0].data = [100, 230, 120, 200, 332, 101, 234, 132, 201, 234, 190, 390]
          break
        case '八一广场':
          this.options.series[0].data = [100, 332, 101, 234, 230, 120, 201, 234, 200, 132, 190, 390]
          break
        case '秋水广场':
          this.options.series[0].data = [100, 230, 120, 201, 234, 200, 332, 101, 234, 132, 190, 390]
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .trend-echarts {
    width: 100%;
    height: 100%;
  }
</style>
