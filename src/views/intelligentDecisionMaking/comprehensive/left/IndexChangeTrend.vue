<template>
  <InfoBlock
    title="指数变化趋势"
    height="40%"
  >
    <v-chart
      :options="expChaOption"
      class="exp-cha-chart"
    />
  </InfoBlock>
</template>

<script>

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      monthNumber: new Date().getMonth(),
      monthData: []
    }
  },
  computed: {
    monthList () {
      const arr = []
      for (let index = 0; index < this.monthNumber; index++) {
        arr.push('' + this.monthNumber - index)
      }
      return arr
    },
    expChaOption () {
      return {
        tooltip: {
          trigger: 'axis'
        },
        color: [
          '#00FFFF',
          '#0056FF',
          '#AADAFF',
          '#3C9AFE',
          '#E6B00E',
          '#FF7200'
        ],
        legend: {
          data: [
            '政治安全指数',
            '治安安全指数',
            '经济安全指数',
            '公共安全指数',
            '矛盾纠纷指数',
            '公众安全感'
          ],
          top: '15%',
          left: '10%',
          textStyle: {
            color: '#AADAFF'
          }
          // selected: {
          //   政治安全指数: false,
          //   治安安全指数: true,
          //   经济安全指数: true,
          //   公共安全指数: false,
          //   矛盾纠纷指数: false,
          //   公众安全感: false
          // }
        },
        grid: {
          width: '90%',
          height: '60%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#4E9CF4'
            }
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: []
            }
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value',
          min: this.handleMonthDataMin(this.monthData),
          max: 100,
          axisLabel: {
            textStyle: {
              color: '#4E9CF4'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            length: 10
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(0,73,104,0.32)']
            }
          }
        },
        series: [
          {
            name: '政治安全指数',
            data: this.monthData['政治安全指数'],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '治安安全指数',
            data: this.monthData['治安安全指数'],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '经济安全指数',
            data: this.monthData['经济犯罪指数'],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '公共安全指数',
            data: this.monthData['公共安全指数'],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '矛盾纠纷指数',
            data: this.monthData['矛盾纠纷指数'],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '公众安全感',
            data: this.monthData['公众安全感指数'],
            type: 'line',
            symbol: 'none',
            smooth: true
          }
        ]
      }
    }
  },
  beforeDestroy () {},
  mounted () {
    const that = this
    this.$EventBus.$on('backendMonthDataData', res => {
      that.handleMonthData(res)
    })
  },
  methods: {
    // 处理月份数据
    handleMonthData (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const length = data[key].length
          for (let index = 0; index < this.monthNumber - length; index++) {
            data[key].unshift(undefined)
          }
        }
      }
      this.monthData = data
    },
    // 得出月份数据最小值
    handleMonthDataMin (obj) {
      let min = 100
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const arr = obj[key].filter(item => item)
          min = Math.min(...arr) > min ? min : Math.min(...arr)
        }
      }
      return parseInt(min)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
