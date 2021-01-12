<template>
  <div class="win-info">
    <div class="title">信访关注问题TOP5</div>
    <v-chart :options="options" class="echarts" />
  </div>
</template>

<script>
import { queryPetitionTop5 } from '@/api/riskPrevention/importPeople'

export default {
  data() {
    return {
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
          top: '20%',
          width: '90%',
          height: '70%',
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
          data: [
            '劳动和社会保障',
            '安置补偿',
            '房地产开发管理',
            '城乡建设',
            '房屋拆迁'
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
            name: '问题数据',
            type: 'bar',
            barWidth: '16',
            data: this.dataList.sort(function(a, b) {
              return a - b
            }),
            label: {
              show: false,
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
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      queryPetitionTop5().then(res => {
        if (res.status === 200) {
          res.data.forEach(item => {
            this.dataList.push(item.number)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.win-info {
  position: relative;
  width: 420px;
  height: 484px;
  background: url("~@/assets/image/importPeople/xf-right-bg1.png");
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 10px;
    left: 30px;
  }
  .echart {
    width: 100%;
    height: 100%;
  }
}
</style>
