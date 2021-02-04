<template>
  <InfoBlock
    title="出租房县区分布"
    height="513px"
    :bg-url="require('@/assets/image/common/info-block-big-bg.png')"
  >
    <v-chart
      :options="chartData"
    />
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      YTypeList: [
        '西湖区',
        '新建区',
        '高新区',
        '青山湖区',
        '安义县',
        '青云谱区',
        '东湖区',
        '红谷滩区',
        '南昌县',
        '湾里局',
        '经开区',
        '进贤县'
      ]
    }
  },
  computed: {
    chartData () {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          top: 0,
          right: 0,
          textStyle: {
            color: '#A9DAFF'
          }
        },
        grid: {
          containLabel: true,
          top: 25,
          bottom: 10,
          left: 10
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            color: '#72B0F1'
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
        yAxis: {
          type: 'category',
          axisLabel: {
            color: '#A9DAFF ',
            interval: 0
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
          data: this.YTypeList
        },
        series: [
          {
            name: '出租房屋数',
            type: 'bar',
            barWidth: '30%',
            data: [
              7722,
              6551,
              5376,
              4733,
              4421,
              3873,
              3400,
              2732,
              982,
              708,
              586,
              277
            ].reverse(),
            label: {
              show: false,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 1, color: '#2E78FF' },
                  { offset: 0, color: '#3B9AFE' }
                ],
                global: false
              }
            }
          },
          {
            name: '租住人员数',
            type: 'bar',
            barWidth: '30%',
            data: [
              15444,
              13102,
              10743,
              9466,
              8842,
              7746,
              6800,
              5464,
              1964,
              1416,
              1172,
              554
            ].reverse(),
            label: {
              show: false,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: '#4FC7FF' },
                  { offset: 1, color: '#68E0CF' }
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

  }
}
</script>

<style lang="scss" scoped>

</style>
