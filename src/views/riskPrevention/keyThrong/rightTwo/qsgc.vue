<template>
  <div class="win-info">
    <div class="title">预警事件分析</div>
    <v-chart :options="amountOptions" class="echarts" />
  </div>
</template>

<script>
import echarts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue
export default {
  props: {
    type: String
  },
  data() {
    return {}
  },
  methods: {},
  computed: {
    amountOptions() {
      return {
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
            data: [32, 35],
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
            data: [8, 6],
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
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 95%;
}
.win-info {
  position: relative;
  width: 420px;
  height: 275px;
  background: url("~@/assets/image/KeyThrong/left0ne.png") no-repeat 100% 100%;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 24px;
    position: absolute;
    top: 10px;
    left: 30px;
  }
}
</style>
