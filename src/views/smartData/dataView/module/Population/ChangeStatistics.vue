<template>
  <div class="change-statistics-container">
    <div class="title">
      人口变动统计
    </div>
    <v-chart
      :options="options"
      style="width:100%;height:100%"
    />
  </div>
</template>

<script>
import { populationVariation } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      code: '3601',
      monthData: [],
      data: []
    }
  },
  computed: {
    options () {
      return {
        color: ['#3497FB', '#80F4E7', '#E6B00E'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: false,
          top: '5%',
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: 50
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD'
            // interval: 0,
            // rotate: -40,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          positoin: 'bottom',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#458CDD'
            }
          },
          axisTick: {
            show: false
          },
          data: this.monthData
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#458CDD'
            // interval: 0,
            // rotate: -40,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ['rgba(0, 73, 104, 0.5)']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#458CDD'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '人口变动统计',
            smooth: true,
            lineStyle: {
              width: 3
            },
            data: this.data,
            type: 'line'
          }
          // {
          //   name: '流出人口',
          //   smooth: true,
          //   lineStyle: {
          //     width: 3
          //   },
          //   data: [
          //     -3820,
          //     -3932,
          //     -3901,
          //     -3934,
          //     -4290,
          //     -4330,
          //     -4320,
          //     -4290,
          //     -5330,
          //     -5320,
          //     -3820,
          //     -3932,
          //     -3901,
          //     -3934,
          //     -4290,
          //     -4330,
          //     -4320,
          //     -4290,
          //     -5330,
          //     -5320,
          //     -3820,
          //     -3932,
          //     -3901,
          //     -3934,
          //     -4290,
          //     -4330,
          //     -4320,
          //     -4290,
          //     -5330,
          //     -5320,
          //     -4590
          //   ].fill(0),
          //   type: 'line'
          // },
          // {
          //   name: '净流入人口',
          //   smooth: true,
          //   lineStyle: {
          //     width: 3
          //   },
          //   data: [
          //     -4820,
          //     5932,
          //     -4901,
          //     4934,
          //     -3290,
          //     3330,
          //     -3320,
          //     4350,
          //     -5340,
          //     4270,
          //     -4820,
          //     5932,
          //     -4901,
          //     4934,
          //     -3290,
          //     3330,
          //     -3320,
          //     4350,
          //     -5340,
          //     4270,
          //     -4820,
          //     5932,
          //     -4901,
          //     4934,
          //     -3290,
          //     3330,
          //     -3320,
          //     4350,
          //     -5340,
          //     4270
          //   ].fill(0),
          //   type: 'line'
          // }
        ]
      }
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  mounted () {
    this.handlePopulationVariation()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handlePopulationVariation()
    })
  },
  methods: {
    async handlePopulationVariation () {
      try {
        const { status, data } = await populationVariation({ code: this.code })
        if (status === 200) {
          this.monthData = Object.keys(data)
          this.data = Object.values(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.change-statistics-container {
  width: 425px;
  height: 280px;
  // margin: 5px;
  background: url("~@/assets/image/dataView/data-view-ground-modal.png") center
    center / 100% 100% no-repeat;
}
.title {
  font-size: 16px;
  font-weight: bold;
  color: #7ebcff;
  line-height: 28px;
  margin: 5px 0 0 10px;
}
</style>
