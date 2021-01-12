<template>
  <div class="structure-container">
    <div class="title">事件来源</div>
    <div class="chart-bg"></div>
    <v-chart :options="options" class="vchart" />
  </div>
</template>

<script>
import { queryEventSource } from '@/api/smartData/dataView'
export default {
  data() {
    return {
      code: '3601',
      optionsData: [
        { name: '村社PC端上报', value: 0 },
        { name: '社会治理APP上报', value: 0 },
        { name: '平安志愿者APP上报', value: 0 },
        { name: '部门系统流转', value: 0 },
        { name: '智能预警', value: 0 }
      ]
    }
  },
  async mounted() {
    await this.getAsyncData()
    this.$EventBus.$on('update:dataViewSeleItem', async({ code }) => {
      this.code = code
      await this.getAsyncData()
    })
  },
  computed: {
    options() {
      return {
        color: ['#2B8CF1', '#A9DAFF', '#E0AC10', '#0ECDE9', '#CED42D'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          show: true,
          orient: 'vertical',
          formatter: name => {
            const value = this.optionsData.filter(item => {
              return item.name === name
            })
            return name + '  ' + value[0].value
          },
          textStyle: {
            color: '#fff',
            lineHeight: 24,
            fontSize: 14
          },
          top: 60,
          right: 30,
          data: [
            '村社PC端上报',
            '社会治理APP上报',
            '平安志愿者APP上报',
            '部门系统流转',
            '智能预警'
          ]
        },
        series: [
          {
            name: '事件来源',
            type: 'pie',
            center: ['22%', '55%'],
            radius: ['45%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.optionsData
          }
        ]
      }
    }
  },
  methods: {
    async getAsyncData() {
      try {
        const { status, data } = await queryEventSource({
          gridCode: this.code
        })
        if (status === 200) {
          for (const key in data) {
            console.log(data)
            switch (key) {
              case 'pc':
                this.optionsData.splice(0, 1, {
                  name: '村社PC端上报',
                  value: data[key]
                })
                break
              case 'app':
                this.optionsData.splice(1, 1, {
                  name: '社会治理APP上报',
                  value: data[key]
                })
                break
              case 'volunteerApp':
                this.optionsData.splice(2, 1, {
                  name: '平安志愿者APP上报',
                  value: data[key]
                })
                break
              case 'dept':
                this.optionsData.splice(3, 1, {
                  name: '部门系统流转',
                  value: data[key]
                })
                break
              case 'wisdomEvent':
                this.optionsData.splice(4, 1, {
                  name: '智能预警',
                  value: data[key]
                })
                break
              default:
                break
            }
          }
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
  position: relative;
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
.chart-bg {
  width: 160px;
  height: 160px;
  margin: 40px 0 0 15px;
  background: url("~@/assets/image/dataView/thing-handle.png") center center /
    100% 100% no-repeat;
}
.vchart {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
</style>
