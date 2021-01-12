<template>
  <div class="eventDistrict">
    <div class="title">事件县区分布</div>
    <div class="contain">
      <v-chart :options="options" />
    </div>
  </div>
</template>
<script>
import { countEventByRegion } from '@/api/intelligentCommand/warning'
export default {
  data() {
    return {
      regionlist: [],
      countList: []
    }
  },
  created() {
    this.countEventByRegion()
  },
  methods: {
    countEventByRegion() {
      countEventByRegion().then(res => {
        const { status, data } = res
        if (status === 200) {
          const newArr = data.sort(this._compare('totalCount'))
          newArr.forEach((item, index) => {
            this.regionlist.push(item.regionCode)
            this.countList.push({
              value: item.totalCount,
              name: item.regionCode
            })
          })
        }
      })
    },
    _compare(property) {
      return function(a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
      }
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
          top: '10%',
          width: '90%',
          height: '85%',
          left: '10',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#7DBCFF',
            interval: 0,
            rotate: -40
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
          data: this.regionlist.reverse()
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
            name: '事件县区分布',
            type: 'bar',
            barWidth: '16',
            data: this.countList.reverse(),
            label: {
              show: false,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
              color: '#3B9AFE'
            }
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.eventDistrict {
  width: 618px;
  height: 275px;
  background-color: #1d293b;
  background: url("~@/assets/image/intelligentService/con_top_bgm.png")
    no-repeat;
  background-size: 100% 100%;
  padding: 15px;
  .title {
    margin: 0 0 15px 10px;
    font-size: 16px;
    font-weight: bold;
    color: #a9daff;
    line-height: 18px;
  }
  .contain {
    width: 100%;
    height: 227px;
  }
}
</style>
