<template>
  <InfoBlock title="出租房使用类型">
    <v-chart
      :options="useTypeOptions"
    />
  </InfoBlock>
</template>

<script>
import { queryUseTypeRoomRentCount } from '@/api/riskPrevention/rentalHousing'

export default {
  data () {
    return {
      nameList: [],
      dataList: []
    }
  },
  computed: {
    useTypeOptions () {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          containLabel: true,
          top: 25,
          right: 10,
          bottom: 10,
          left: 10
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD',
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
          data: this.nameList
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#458CDD'
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
            name: '出租房使用类型',
            type: 'bar',
            barWidth: 40,
            data: this.dataList,
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
  created () {
    this.getData()
  },
  methods: {
    getData () {
      queryUseTypeRoomRentCount({ gridCode: '' }).then(res => {
        if (res.status === 200) {
          res.data.forEach(item => {
            this.nameList.push(item.name)
          })
          this.dataList = [
            {
              name: '住宅',
              value: 37508
            },
            {
              name: '工商区',
              value: 2939
            },
            {
              name: '仓库',
              value: 658
            },
            {
              name: '其他',
              value: 247
            }
          ]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
