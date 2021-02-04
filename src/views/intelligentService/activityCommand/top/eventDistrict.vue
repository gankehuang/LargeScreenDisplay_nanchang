<template>
  <div class="eventDistrict">
    <div class="title">
      活动数量分析
    </div>
    <div class="contain">
      <v-chart :options="options" />
    </div>
  </div>
</template>
<script>
import { countActivityBaseByMonth } from '@/api/adminIntelligentService/activityCommand'
export default {
  data () {
    return {
      series: [
        { value: 0, name: '1月' },
        { value: 0, name: '2月' },
        { value: 0, name: '3月' },
        { value: 0, name: '4月' },
        { value: 0, name: '5月' },
        { value: 0, name: '6月' },
        { value: 0, name: '7月' },
        { value: 0, name: '8月' },
        { value: 0, name: '9月' },
        { value: 0, name: '10月' },
        { value: 0, name: '11月' },
        { value: 0, name: '12月' }
      ]
    }
  },
  computed: {
    options () {
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
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
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
            name: '活动数量分析',
            type: 'bar',
            barWidth: '16',
            data: this.series,
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
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      countActivityBaseByMonth().then(res => {
        if (res.status === 200) {
          res.data.forEach((element, index) => {
            this.series[index].value = element.num
          })
        }
      })
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
