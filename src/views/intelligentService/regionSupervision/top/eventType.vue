<template>
  <div class="eventType">
    <div class="title">
      督导事件分析
    </div>
    <div class="contain">
      <v-chart :options="options" />
    </div>
  </div>
</template>
<script>
import { countSuperviseEventStatus } from '@/api/intelligentService/regionSupervision'
export default {
  props: {
    num: Number
  },
  data () {
    return {
      series: []
    }
  },
  computed: {
    options () {
      return {
        color: ['#0054FF', '#5aa3df'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          right: 50,
          top: 30,
          height: 120,
          itemWidth: 10,
          itemHeight: 20,
          itemGap: 15,
          textStyle: {
            color: '#A9DAFF',
            fontSize: 16
          },
          data: ['超时未督导', '及时督导']
        },
        grid: {
          containLabel: true
        },
        series: [
          {
            name: '督导事件分析',
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'right',
              formatter: '{d}%'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            data: this.series
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
      countSuperviseEventStatus().then(res => {
        if (res.status == 200) {
          this.series = [
            {
              value: res.data.timeOutNum,
              name: '超时未督导'
            },
            {
              value: res.data.unTimeOutNum,
              name: '及时督导'
            }
          ]
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.eventType {
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
