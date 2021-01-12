<template>
  <div class="win-info">
    <div class="title">事件总览</div>
    <div class="top-title">
      预警事件数<span>{{ eventStatusObj.totalCount }}</span
      >件
    </div>
    <div class="lists">
      <div class="list">
        <div class="item">
          待派发
        </div>
        {{ eventStatusObj.unProcessedCount }}件
      </div>
      <div class="list">
        <div class="item">
          处置中
        </div>
        {{ eventStatusObj.processingCount + eventStatusObj.reminderCount }}件
      </div>
      <div class="list">
        <div class="item">
          已处置
        </div>
        {{
          eventStatusObj.completedCount +
            eventStatusObj.processedCount +
            eventStatusObj.timeoutCount
        }}件
      </div>
    </div>
    <v-chart :options="options" />
  </div>
</template>

<script>
import {
  countEventByStatus,
  countEventByType
} from '@/api/intelligentCommand/warning'
export default {
  data() {
    return {
      eventStatusObj: {
        unProcessedCount: 0,
        processingCount: 0,
        completedCount: 0,
        totalCount: 0,
        timeoutCount: 0,
        processedCount: 0,
        reminderCount: 0
      },
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
    options() {
      return {
        color: ['#A9DAFF', '#00FFFF', '#0055FF', '#E6B00E', '#FE573B'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          right: 20,
          top: 80,
          height: 130,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          },
          data: ['政治安全', '社会治安', '矛盾纠纷', '公共安全', '网络安全']
        },
        grid: {
          left: '20%',
          height: '50%'
        },
        series: [
          {
            name: '事件情况',
            type: 'pie',
            radius: ['30%', '40%'],
            center: ['34%', '33%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'right',
              formatter: '{d}%'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '20',
                position: 'center',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: this.eventTypeObj['politicalSecurity'],
                name: '政治安全'
              },
              { value: this.eventTypeObj['socialSecurity'], name: '社会治安' },
              { value: this.eventTypeObj['conflict'], name: '矛盾纠纷' },
              { value: this.eventTypeObj['publicSafety'], name: '公共安全' },
              {
                value: this.eventTypeObj['internetPublicOpinion'],
                name: '网络安全'
              }
            ]
          }
        ]
      }
    }
  },
  created() {
    this.countEventByStatus()
    this.countEventByType()
  },
  methods: {
    countEventByStatus() {
      countEventByStatus().then(res => {
        const { status, data } = res
        if (status === 200) {
          this.eventStatusObj = {
            unProcessedCount: data.unProcessedCount,
            processingCount: data.processingCount,
            completedCount: data.completedCount,
            reminderCount: data.reminderCount,
            totalCount: data.totalCount,
            timeoutCount: data.timeoutCount,
            processedCount: data.processedCount
          }
        }
      })
    },
    countEventByType() {
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
.win-info {
  position: relative;
  width: 420px;
  height: 470px;
  background: url("~@/assets/image/warning/block-bg.png") no-repeat center
    center;
  background-size: 100% 100%;
  overflow: hidden;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 10px;
    left: 30px;
  }
  .top-title {
    padding: 46px 0 0 30px;
    line-height: 24px;
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    span {
      font-size: 24px;
      color: #eeae15;
      margin: 0 4px;
    }
  }
  .lists {
    display: flex;
    margin: 10px 10px 0;
    justify-content: space-between;
    .list {
      padding-top: 12px;
      width: 95px;
      height: 77px;
      margin: 0 auto;
      line-height: 24px;
      font-size: 20px;
      font-weight: bold;
      color: #7dbcff;
      text-align: center;
      background: url("~@/assets/image/importPeople/sqjz-right-icon1.png")
        no-repeat center;
      background-size: 100% 100%;
      .item {
        display: block;
        line-height: 24px;
        margin-bottom: 5px;
        font-size: 14px;
        color: #aadaff;
      }
    }
  }
}
.line-list {
  display: flex;
  margin-top: 15px;
  .line-item {
    padding-top: 12px;
    width: 95px;
    height: 77px;
    margin: 0 auto;
    line-height: 24px;
    font-size: 14px;
    font-weight: bold;
    color: #aadaff;
    text-align: center;
    background: url("~@/assets/image/importPeople/sqjz-right-icon1.png")
      no-repeat center;
    background-size: 100% 100%;
    span {
      display: block;
      line-height: 34px;
      font-size: 24px;
      color: #00ffff;
    }
  }
}
</style>
