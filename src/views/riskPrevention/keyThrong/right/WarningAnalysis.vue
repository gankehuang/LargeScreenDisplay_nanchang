<template>
  <InfoBlock title="预警事件分析">
    <v-chart
      :options="amountOptions"
      class="echarts-analysis"
    />
  </InfoBlock>
</template>

<script>
import echarts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
export default {
  data () {
    return {
      amountOptions: {
        grid: {
          left: '20%',
          top: '20%',
          height: '80%'
        },
        legend: {
          data: ['总数', '超时处置数'],
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          textStyle: {
            color: '#AADAFF',
            fontSize: 14
          },
          top: '16%',
          right: '6%'
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              show: false,
              color: '#458CDD',
              interval: 0,
              rotate: 40
            },
            axisLine: {
              show: false,
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
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['人员聚集', '重点人员'],
            axisLabel: {
              color: '#AADAFF',
              itemStyle: {
                textAlign: 'center'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.5)']
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(0, 73, 104, 0.5)'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '总数',
            type: 'bar',
            barWidth: '20px',
            data: [42, 38],
            label: {
              normal: {
                show: true,
                position: 'insideRight',
                color: '#000'
              }
            },
            itemStyle: {
              emphasis: {},
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 1, color: '#2E78FF' },
                  { offset: 0, color: '#3B9AFE' }
                ])
              }
            }
          },
          {
            name: '超时处置数',
            type: 'bar',
            barWidth: '20px',
            data: [5, 7],
            label: {
              normal: {
                show: true,
                position: 'insideRight',
                color: '#000'
              }
            },
            itemStyle: {
              emphasis: {},
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#4FC7FF' },
                  { offset: 1, color: '#68E0CF' }
                ])
              }
            }
          }
        ]
      }
    }
  },

  methods: {
    updataAnalysis (curItem) {
      switch (curItem.name) {
        case '省行政中心':
          this.amountOptions.series[0].data = [42, 38]
          this.amountOptions.series[0].data = [5, 7]
          break
        case '市行政中心':
          this.amountOptions.series[0].data = [18, 28]
          this.amountOptions.series[0].data = [8, 7]
          break
        case '八一广场':
          this.amountOptions.series[0].data = [35, 46]
          this.amountOptions.series[0].data = [9, 7]
          break
        case '秋水广场':
          this.amountOptions.series[0].data = [32, 35]
          this.amountOptions.series[0].data = [8, 6]
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts-analysis {
  width: 100%;
  height: 100%;
}
</style>
