<template>
  <InfoBlock title="出租房数量变化">
    <v-chart
      :options="amountChangeOptions"
    />
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      nameList: [],
      dataList: []
    }
  },
  computed: {
    amountChangeOptions () {
      return {
        type: 'line',
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
        grid: {
          containLabel: true,
          top: 25,
          right: 10,
          bottom: 10,
          left: 10
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
            data: [
              40089,
              41340,
              39805,
              40177,
              39790,
              41300,
              41520,
              41220,
              41332,
              41352,
              41608
            ],
            type: 'line',
            smooth: true,
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
                    color: '#14ACFF4d'
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

  }
}
</script>

<style lang="scss" scoped>

</style>
