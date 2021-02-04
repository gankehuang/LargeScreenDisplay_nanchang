<template>
  <div class="structure-container">
    <div class="title">
      事件分类
    </div>
    <v-chart
      :options="options"
      style="display:inline-block;width:100%;height:100%"
    />
  </div>
</template>

<script>
import { queryEventType } from '@/api/smartData/dataView'
export default {
  data () {
    return {
      code: '3601',
      typeList: [],
      optionData: [].fill(undefined, 0, 7)
    }
  },
  computed: {
    options () {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '10%',
          height: '90%',
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
          data: this.typeList.reverse()
        },
        series: [
          {
            name: '事件分类',
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
                    color: '#00DFFF'
                  },
                  {
                    offset: 1,
                    color: '#0C94EB'
                  }
                ],
                global: false
              }
            },
            data: this.optionData.reverse()
          }
        ]
      }
    }
  },
  mounted () {
    this.getAsyncData()
    this.$EventBus.$on('update:dataViewSeleItem', async ({ code }) => {
      this.code = code
      await this.getAsyncData()
    })
  },
  methods: {
    async getAsyncData () {
      try {
        const { status, data } = await queryEventType({
          gridCode: this.code
        })
        if (status === 200) {
          this.optionData = []
          this.typeList = []
          const arr = Object.keys(data).sort((a, b) => {
            return data[b] - data[a]
          })
          arr.forEach(item => {
            switch (item) {
              case 'conflict':
                this.typeList.push('矛盾纠纷')
                this.optionData.push(data.conflict)
                break
              case 'cityManage':
                this.typeList.push('城市管理')
                this.optionData.push(data.cityManage)
                break
              case 'cityBuild':
                this.typeList.push('隐患排查')
                this.optionData.push(data.cityBuild)
                break
              case 'environment':
                this.typeList.push('公共服务')
                this.optionData.push(data.environment)
                break
              case 'lifeService':
                this.typeList.push('环境保护')
                this.optionData.push(data.lifeService)
                break
              case 'socialSecurity':
                this.typeList.push('社会保障')
                this.optionData.push(data.socialSecurity)
                break
              case 'commonService':
                this.typeList.push('生活服务')
                this.optionData.push(data.commonService)
                break
              case 'hiddenPerils':
                this.typeList.push('城市建设')
                this.optionData.push(data.hiddenPerils)
                break
              default:
                break
            }
          })
        }
      } catch (error) {}
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
