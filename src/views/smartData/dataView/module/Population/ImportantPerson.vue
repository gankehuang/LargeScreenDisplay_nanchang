<template>
  <div class="important-person-container">
    <div class="title">重点关注人员</div>
    <div class="total">
      <svg-icon icon-class="population-people" class="icon" />
      <span>重点关注人员：</span>
      <span>{{ parseInt(importantPersonTotal) }}</span>
      <span>人</span>
    </div>
    <v-chart :options="options" style="width:100%;height: 100%" />
  </div>
</template>

<script>
import { queryKeyPersonnel } from '@/api/smartData/dataView'

export default {
  data() {
    return {
      importantPersonTotal: 0,
      initFriMax: 0,
      initSecMax: 0,
      initThiMax: 0,
      initFourMax: 0,
      initFiveMax: 0,
      initSixMax: 0,
      // 精神障碍 重点信访 退役重点  刑释解戒 社区矫正
      optionsData: [],
      code: '3601',
      nameList: []
    }
  },
  computed: {
    options() {
      const that = this
      return {
        tooltip: {},
        legend: {
          show: false
        },
        radar: {
          // shape: 'circle',
          center: ['50%', '35%'],
          startAngle: 180,
          radius: 65,
          name: {
            textStyle: {
              color: '#fff',
              // backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitArea: {
            areaStyle: {
              color: ['#0B3C77', '#0F4684', '#15549A'],
              opacity: 0.5
            }
          },
          indicator: [
            { name: this.nameList[0], max: that.importantPersonTotal },
            { name: this.nameList[1], max: that.importantPersonTotal },
            { name: this.nameList[2], max: that.importantPersonTotal },
            { name: this.nameList[3], max: that.importantPersonTotal },
            { name: this.nameList[4], max: that.importantPersonTotal }
          ]
        },
        series: [
          {
            name: '重点人员',
            type: 'radar',
            symbol: 'none',
            label: {
              formatter: '[{a}{c}]'
            },
            lineStyle: {
              show: false,
              color: 'transparent'
            },
            areaStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(128, 244, 231, 0.2)'
                  },
                  {
                    offset: 1,
                    color: '#80F4E7'
                  }
                ],
                global: false
              }
            },
            data: [
              {
                value: that.optionsData,
                name: '重点人员'
              }
            ]
          }
        ]
      }
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('update:dataViewSeleItem')
  },
  async mounted() {
    this.handleQueryKeyPersonnel()
    this.$EventBus.$on('update:dataViewSeleItem', async({ code }) => {
      this.code = code
      await this.handleQueryKeyPersonnel()
      this.updateRadar()
    })
  },
  methods: {
    async handleQueryKeyPersonnel() {
      const that = this
      try {
        const { status, data } = await queryKeyPersonnel({ code: this.code })
        if (status === 200) {
          that.importantPersonTotal = 0
          that.nameList = []
          that.optionsData = []
          data.forEach(element => {
            if (
              element.name.indexOf('重点人员') === -1 &&
              element.name.indexOf('退役') === -1
            ) {
              that.nameList.push(element.name)
              that.optionsData.push(element.sum)
              that.importantPersonTotal += element.sum
            }
            if (element.name.indexOf('退役') !== -1) {
              that.nameList.push('退役重点人员')
              that.optionsData.push(element.sum)
              that.importantPersonTotal += element.sum
            }
          })
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 更新雷达图
    updateRadar() {
      this.importantPersonTotal += 0.01
    }
  }
}
</script>

<style lang="scss" scoped>
.important-person-container {
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
  margin: 5px 0 0 10px;
}
.total {
  margin: 0 0 0 160px;

  .icon {
    font-size: 16px;
    color: #3497fb;
  }
  span:nth-of-type(1) {
    color: #3497fb;
    line-height: 24px;
    margin-left: 5px;
  }
  span:nth-of-type(2) {
    display: inline-block;
    line-height: 24px;
    font-weight: bold;
    font-size: 28px;
    margin: 0 5px 0 0;
    color: #aadaff;
  }
  span:nth-of-type(3) {
    color: #aadaff;
  }
}
</style>
