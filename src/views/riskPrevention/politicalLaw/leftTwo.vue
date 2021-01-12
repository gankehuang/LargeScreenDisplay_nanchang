<template>
  <div class="leftTwo">
    <div class="title">七天舆情分析</div>
    <v-chart :options="options" class="echarts" />
  </div>
</template>
<script>
import echarts from 'vue-echarts'
import { getBeforeDate } from '@/utils/dateTime'
export default {
  data() {
    return {
      xList: [],
      dataList: []
    }
  },
  computed: {
    options() {
      return {
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '15%',
          width: '90%',
          height: '85%',
          left: '10',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#7DBCFF',
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
          data: this.xList
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
              color: '#7DBCFF'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '七天舆情分析',
            type: 'bar',
            barWidth: '20',
            data: this.dataList,
            label: {
              show: false,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#4FA2FF' },
                  { offset: 1, color: '#68E0CF' }
                ])
              }
            }
          }
        ]
      }
    }
  },
  created() {
    for (let i = 0; i < 7; i++) {
      this.xList.unshift(
        getBeforeDate(i + 1)
          .slice(5)
          .split('-')
          .join('/')
      )
    }
    const data1 = [111, 222, 333, 444, 555, 666, 661]
    this.xList.forEach((item, index) => {
      this.dataList.push({
        value: data1[index],
        name: item
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.leftTwo {
  position: relative;
  width: 420px;
  height: 275px;
  background: url("~@/assets/image/politicalLaw/leftTwo.png") no-repeat center
    center;
  background-size: 100% 100%;
  padding: 50px 15px 10px 15px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 10px;
    left: 30px;
  }
}
</style>
