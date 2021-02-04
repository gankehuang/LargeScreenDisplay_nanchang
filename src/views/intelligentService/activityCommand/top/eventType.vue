<template>
  <div class="eventType">
    <div class="title">
      活动规模统计
    </div>
    <div class="contain">
      <v-chart :options="options" />
    </div>
  </div>
</template>
<script>
import { selectActivity } from '@/api/adminIntelligentService/activityCommand'
export default {
  data () {
    return {
      dataList: [
        { value: 0, name: '超大型' },
        { value: 0, name: '大型' },
        { value: 0, name: '中型' },
        { value: 0, name: '小型' }
      ]
    }
  },
  computed: {
    options () {
      return {
        color: ['#0054FF', '#5aa3df', '#0DE0A7', '#ADD14D'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          right: 50,
          top: 50,
          height: 120,
          itemWidth: 10,
          itemHeight: 20,
          itemGap: 15,
          textStyle: {
            color: '#A9DAFF',
            fontSize: 16
          },
          data: ['超大型', '大型', '中型', '小型']
        },
        grid: {
          containLabel: true
        },
        series: [
          {
            name: '活动规模统计',
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
            data: this.dataList
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
      selectActivity({}, 1, 1000).then(res => {
        if (res.status === 200) {
          this.total = res.data.length
          res.data.forEach(item => {
            if (item.scaleText === '超大型') {
              this.dataList[0].value++
            } else if (item.scaleText === '大型') {
              this.dataList[1].value++
            } else if (item.scaleText === '中型') {
              this.dataList[2].value++
            } else if (item.scaleText === '小型') {
              this.dataList[3].value++
            }
          })
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
