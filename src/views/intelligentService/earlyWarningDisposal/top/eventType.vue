<template>
  <div class="eventType">
    <div class="title">
      事件类型分析
    </div>
    <div class="contain">
      <v-chart :options="options" />
    </div>
  </div>
</template>
<script>
import { countEventByType } from '@/api/intelligentCommand/warning'
export default {
  data () {
    return {
      eventTypeObj: {
        conflict: 0,
        internetPublicOpinion: 0,
        politicalSecurity: 0,
        publicSafety: 0,
        socialSecurity: 0
      }
    }
  },
  computed: {
    options () {
      return {
        color: ['#0054FF', '#3B9AFE', '#0DE0A7', '#ADD14D', '#E6B00E'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          right: 80,
          top: 40,
          height: 140,
          itemWidth: 8,
          itemHeight: 20,
          itemGap: 15,
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          },
          data: ['政治安全', '社会治安', '矛盾纠纷', '公共安全', '网络安全']
        },
        grid: {
          containLabel: true
        },
        series: [
          {
            name: '事件类型分析',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['30%', '50%'],
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
            data: [
              { value: this.eventTypeObj.conflict, name: '矛盾纠纷' },
              { value: this.eventTypeObj.socialSecurity, name: '社会治安' },
              { value: this.eventTypeObj.internetPublicOpinion, name: '网络安全' },
              { value: this.eventTypeObj.publicSafety, name: '公共安全' },
              { value: this.eventTypeObj.politicalSecurity, name: '政治安全' }
            ]
            // 判断数据量是否达到一定的基数，否则不显示
            // data: [
            //   this.eventTypeObj.conflict > 2000 ? { value: this.eventTypeObj.conflict, name: '矛盾纠纷' } : null,
            //   this.eventTypeObj.socialSecurity > 2000 ? { value: this.eventTypeObj.socialSecurity, name: '社会治安' } : null,
            //   this.eventTypeObj.internetPublicOpinion > 2000 ? { value: this.eventTypeObj.internetPublicOpinion, name: '网络安全' } : null,
            //   this.eventTypeObj.publicSafety > 2000 ? { value: this.eventTypeObj.publicSafety, name: '公共安全' } : null,
            //   this.eventTypeObj.politicalSecurity > 2000 ? { value: this.eventTypeObj.politicalSecurity, name: '政治安全' } : null
            // ]
          }
        ]
      }
    }
  },
  mounted () {
    this.countEventByType()
  },
  methods: {
    countEventByType () {
      countEventByType().then(res => {
        const { status, data } = res
        if (status === 200) {
          this.eventTypeObj = {
            conflict: data.conflict,
            internetPublicOpinion: data.internetPublicOpinion,
            politicalSecurity: data.politicalSecurity,
            publicSafety: data.publicSafety,
            socialSecurity: data.socialSecurity
          }
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
