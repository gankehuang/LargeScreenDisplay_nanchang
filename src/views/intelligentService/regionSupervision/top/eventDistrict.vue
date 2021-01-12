<template>
  <div class="eventDistrict">
    <div class="title">督导事件分布</div>
    <div class="contain">
      <v-chart :options="options" />
    </div>
  </div>
</template>
<script>
import { queryEventList } from '@/api/intelligentService/regionSupervision'
export default {
  data() {
    return {
      num: null
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
          data: [
            '南昌县',
            '青云谱区',
            '东湖区',
            '进贤县',
            '安义县',
            '新建区',
            '西湖区',
            '经开区',
            '青山湖区',
            '红谷滩区',
            '高新区',
            '湾里管理局'
          ]
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
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
            data: [
              { value: this.percentage(0.12), name: '南昌县' },
              { value: this.percentage(0.1), name: '青云谱区' },
              { value: this.percentage(0.1), name: '东湖区' },
              { value: this.percentage(0.09), name: '进贤县' },
              { value: this.percentage(0.08), name: '安义县' },
              { value: this.percentage(0.08), name: '新建区' },
              { value: this.percentage(0.08), name: '西湖区' },
              { value: this.percentage(0.08), name: '经开区' },
              { value: this.percentage(0.08), name: '青山湖区' },
              { value: this.percentage(0.07), name: '红谷滩区' },
              { value: this.percentage(0.07), name: '高新区' },
              { value: this.percentage(0.05), name: '湾里管理局' }
            ],
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
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      queryEventList(1, 10, {}).then(res => {
        if (res.status === 200) {
          this.num = res.data.total
        }
      })
    },
    percentage(per) {
      return parseInt(this.num * per)
    }
  }
}
</script>
<style lang="scss" scoped>
.eventDistrict {
  width: 618px;
  height: 275px;
  background-color: #1d293b;
  background: url('~@/assets/image/intelligentService/con_top_bgm.png')
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
