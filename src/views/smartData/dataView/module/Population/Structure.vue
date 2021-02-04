<template>
  <div class="structure-container">
    <div class="title">
      人口结构
    </div>
    <v-chart
      :options="famaleOptions"
      style="display:inline-block;width:40%;height:100%"
    />
    <v-chart
      :options="maleOptions"
      style="display:inline-block;width:60%;height:100%"
    />
  </div>
</template>

<script>
import { structure } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      famale: [-185800, -710399, -712292, -355646, -444803].fill(0).reverse(),
      male: [203146, 776508, 778802, 388851, 486993].fill(0).reverse(),
      code: '3601'
    }
  },
  computed: {
    famaleOptions () {
      return {
        tooltip: {
          trigger: 'axis',
          formatter: data => {
            return (
              data[0].name +
              '<br/> ' +
              data[0].seriesName +
              ':  ' +
              Math.abs(data[0].value)
            )
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['女'],
          textStyle: {
            color: '#fff'
          },
          top: 10,
          right: -5
        },
        grid: {
          left: '30%',
          right: '0',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            show: false,
            type: 'value'
          }
        ],
        yAxis: [
          {
            show: false,
            type: 'category',
            axisTick: {
              show: false
            },
            data: ['老年', '中年', '青年', '少年', '儿童'].reverse()
          }
        ],
        series: [
          {
            name: '女',
            type: 'bar',
            label: {
              show: true,
              position: 'left',
              textStyle: {
                color: '#A9DAFF'
              },
              formatter: ({ value }) => Math.abs(value)
            },
            barWidth: 15,
            itemStyle: {
              barBorderRadius: 40,
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(169, 218, 255, 0)'
                  },
                  {
                    offset: 1,
                    color: '#A9DAFF'
                  }
                ],
                global: false
              }
            },
            data: this.famale
          }
        ]
      }
    },
    maleOptions () {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['男'],
          textStyle: {
            color: '#fff'
          },
          top: 10,
          left: 50,
          align: 'left'
        },
        grid: {
          left: '3%',
          right: '28%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            show: false,
            type: 'value'
          }
        ],
        yAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#Fff', // 更改坐标轴文字颜色
              fontSize: 14 // 更改坐标轴文字大小
            }
          },
          data: ['老年', '中年', '青年', '少年', '儿童'].reverse()
        },
        series: [
          {
            name: '男',
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#A9DAFF'
              },
              formatter: ({ value }) => Math.abs(value)
            },
            barWidth: 15,
            itemStyle: {
              barBorderRadius: 40,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(128,244,231, 0)'
                  },
                  {
                    offset: 1,
                    color: '#80F4E7'
                  }
                ],
                global: false
              }
            },
            data: this.male
          }
        ]
      }
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  mounted () {
    this.handleStructure()
    this.$EventBus.$on('update:dataViewSeleItem', ({ code }) => {
      this.code = code
      this.handleStructure()
    })
  },
  methods: {
    async handleStructure () {
      const that = this
      try {
        const { status, data } = await structure({ code: this.code })
        if (status === 200) {
          that.groupData(data)
          console.log(data)
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    groupData (obj) {
      if (obj[0].gender === 'M') {
        delete obj[0].gender
        delete obj[0].total
        delete obj[1].gender
        delete obj[1].total
        this.male = []
        this.famale = []
        for (const key in obj[0]) {
          if (obj[0].hasOwnProperty(key)) {
            const element = obj[0][key]
            this.male.push(Number(element))
          }
        }
        for (const key in obj[1]) {
          if (obj[1].hasOwnProperty(key)) {
            const element = obj[1][key]
            this.famale.push(Number(0 - element))
          }
        }
      } else {
        delete obj[0].gender
        delete obj[0].total
        delete obj[1].gender
        delete obj[1].total
        this.male = []
        this.famale = []
        for (const key in obj[1]) {
          if (obj[1].hasOwnProperty(key)) {
            const element = obj[1][key]
            this.male.push(Number(element))
          }
        }
        for (const key in obj[0]) {
          if (obj[0].hasOwnProperty(key)) {
            const element = obj[0][key]
            this.famale.push(Number(0 - element))
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.structure-container {
  width: 425px;
  height: 280px;
  // margin: 5px;
  background: url("~@/assets/image/dataView/data-view-ground-modal.png") center
    center / 100% 100% no-repeat;
}
.title {
  font-size: 16px;
  font-weight: bold;
  color: #7ebcff;
  line-height: 28px;
  margin: 5px 0 0 25px;
}
</style>
