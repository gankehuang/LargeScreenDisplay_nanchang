<template>
  <div class="win-info">
    <div class="title">
      信访渠道
    </div>
    <v-chart
      :options="amountOptions"
      class="echarts"
    />
  </div>
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
          width: '85%',
          height: '65%',
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
        console.log(res)
        if (res.status === 200) {
          const newArr = res.data.sort(this._compare('value'))
          newArr.forEach((item, index) => {
            this.amountOptions.xAxis[0].data.unshift(item.name)
            this.amountOptions.series[0].data.unshift(item.value)
          })
        }
        // this.amountOptions.series[0].data = [
        //   res.data.data[1].number,
        //   res.data.data[2].number,
        //   res.data.data[3].number,
        //   res.data.data[4].number
        // ]
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
.win-info {
  width: 420px;
  height: 274px;
  background: url("~@/assets/image/interviewSituation/right2-bg.png") no-repeat
    center;
  background-size: 100% 100%;
  .title {
    line-height: 40px;
    font-size: 16px;
    color: #7dbcff;
    margin-left: 29px;
    font-weight: bold;
  }
}
</style>
<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow: auto;
}
</style>
