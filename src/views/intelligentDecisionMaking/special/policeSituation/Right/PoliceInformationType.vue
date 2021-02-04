<template>
  <InfoBlock title="出租房数量变化">
    <div class="bottom">
      <v-chart :options="rightBottomOptions" />
    </div>
  </InfoBlock>
</template>
<script>
import { alertNumber } from '@/api/intelligentDecisionMaking/special'
export default {
  data () {
    return {
      rightBottomOptions: {
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '5%',
          width: '90%',
          left: '5%',
          height: '70%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#A9DAFF',
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
          data: ['行政（治安）', '黄赌毒', '交通事故', '刑事警情']
        },
        yAxis: {
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
              color: '#004968'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '警情类型',
            type: 'bar',
            barWidth: '60%',
            data: [],
            label: {
              show: true,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
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
        ]
      }
    }
  },
  mounted () {
    this.alertNumber()
  },
  methods: {
    alertNumber () {
      alertNumber().then(res => {
        if (res.status === 200) {
          const dataList = []
          for (var key in res.data) {
            const one = {}
            switch (key) {
              case 'securityCount':
                one.name = '行政（治安）'
                one.value = res.data[key]
                dataList.push(one)
                break
              case 'yellowGamblerCount':
                one.name = '黄赌毒'
                one.value = res.data[key]
                dataList.push(one)
                break
              case 'trafficCount':
                one.name = '交通事故'
                one.value = res.data[key]
                dataList.push(one)
                break
              case 'criminalCount':
                one.name = '刑事警情'
                one.value = res.data[key]
                dataList.push(one)
                break
            }
          }
          this.sortList(dataList)
        }
      })
    },
    sortList (dataList) {
      this.rightBottomOptions.series[0].data = []
      this.rightBottomOptions.xAxis.data = []
      const newArr = dataList.sort(this._compare('value'))
      newArr.forEach((item, index) => {
        this.rightBottomOptions.series[0].data.unshift(item.value)
        this.rightBottomOptions.xAxis.data.unshift(item.name)
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
.bottom {
  width: 420px;
  height: 275px;
}
</style>
