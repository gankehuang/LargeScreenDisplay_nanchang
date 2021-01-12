<template>
  <div class="win-info">
    <div class="title">信访人员县区分布</div>
    <v-chart :options="amountOptions" class="echarts" />
  </div>
</template>

<script>
import echarts from 'vue-echarts'
import { countPetitionPeopleByRegion } from '@/api/riskPrevention/importPeople'
export default {
  data() {
    return {
      totalData: [],
      nameList: []
    }
  },
  computed: {
    amountOptions() {
      return {
        grid: {
          left: '25%',
          top: '10%',
          height: '80%'
          //     containLabel: true,
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              show: false,
              color: '#458CDD'
            },
            axisLine: {
              show: false,
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
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.nameList,
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
              show: false,
              lineStyle: {
                color: '#ffffff'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '总数',
            type: 'bar',
            barWidth: '14px',
            data: this.totalData,
            stack: '堆叠',
            label: {
              show: true,
              position: 'insideRight'
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: 'rgba(79,162,255,0.2)' },
                  { offset: 1, color: '#00F5F6' }
                ])
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
    _compare(property) {
      return function(a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
      }
    },
    getList() {
      countPetitionPeopleByRegion().then(res => {
        if (res.status === 200) {
          const newArr = res.data.sort(this._compare('numVal'))
          newArr.forEach((item, index) => {
            this.nameList.push(item.name)
            this.totalData.push(item.numVal)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.win-info {
  position: relative;
  width: 420px;
  height: 484px;
  background: url("~@/assets/image/importPeople/xf-right-bg1.png") no-repeat
    center center;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 10px;
    left: 20px;
  }
}
</style>
