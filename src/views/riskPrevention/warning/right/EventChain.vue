<template>
  <InfoBlock
    title="事件环比"
    height="40%"
  >
    <v-chart
      :options="echartData"
    />
  </InfoBlock>
</template>

<script>
import echarts from 'vue-echarts'
import { countEventChainRatio } from '@/api/intelligentCommand/warning'
export default {
  data () {
    return {
      nameList: [],
      dataList1: [],
      dataList2: []
    }
  },
  computed: {
    echartData () {
      return {
        grid: {
          containLabel: true,
          top: 25,
          right: 10,
          bottom: 10,
          left: 10
        },
        legend: {
          right: 10,
          icon: 'circle',
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          }
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              color: '#458CDD'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#004968'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.8)']
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
            axisLabel: {
              color: '#ffffff'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.5)']
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#004968'
              }
            },
            axisTick: {
              show: false
            },
            data: this.nameList
          }
        ],
        series: [
          {
            name: '上月',
            type: 'bar',
            barWidth: 14,
            data: this.dataList1,
            barMinHeight: 5,
            label: {
              show: true,
              position: 'insideRight'
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 1, color: '#2E78FF' },
                  { offset: 0, color: '#3B9AFE' }
                ])
              }
            }
          },
          {
            name: '本月',
            type: 'bar',
            barWidth: 14,
            data: this.dataList2,
            barMinHeight: 5,
            label: {
              show: true,
              position: 'insideRight'
            },
            itemStyle: {
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
  },
  created () {
    this.countEventChainRatio(2)
  },
  methods: {
    countEventChainRatio (type) {
      countEventChainRatio({
        type
      }).then(res => {
        const { status, data } = res
        if (status === 200) {
          const needList = [
            {
              type: 'internetPublicOpinion',
              name: '网络安全',
              num: data.internetPublicOpinionPre
            },
            {
              type: 'publicSafety',
              num: data.publicSafetyPre,
              name: '公共安全'
            },
            {
              type: 'conflict',
              num: data.conflictPre,
              name: '矛盾纠纷'
            },
            {
              type: 'socialSecurity',
              num: data.socialSecurityPre,
              name: '社会治安'
            },
            {
              type: 'politicalSecurity',
              num: data.politicalSecurityPre,
              name: '政治安全'
            }
          ]

          const newArr = needList.sort(this._compare('num'))
          newArr.forEach(item => {
            this.nameList.push(item.name)
            this.dataList1.push(item.num)
            this.dataList2.push(data[item.type])
          })
        }
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

</style>
