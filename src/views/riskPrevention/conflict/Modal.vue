<template>
  <div class="mask-container" v-if="visible">
    <div class="mask"></div>
    <div class="conflict-modal-container">
      <div class="close" @click="close"></div>
      <div v-if="modalType === 'zhq'">
        <div class="left-top">
          <div class="title">群体事件简介</div>
          <p>
            2020年4月17日，南昌市公安局新建分局发布警方通告：中华情老年公寓法人代表章国兴因涉嫌非法吸收公众存款，2020年4月16日被南昌市公安局新建分局立案侦查，目前公安机关已经成立专案组，全面开展案件侦查。
          </p>
        </div>
        <div class="left-bottom">
          <div class="title">人员信息</div>
          <PeopleInfo />
        </div>
        <div class="center">
          <h1 class="center-title">中华情</h1>
        </div>
        <div class="right-top">
          <div class="title">群体活跃度</div>
          <v-chart :options="option" />
        </div>
        <div class="right-bottom">
          <div class="title">信访事件</div>
          <div class="list">
            <el-scrollbar style="height:85%;">
              <div class="item" v-for="(item, index) in list" :key="index">
                <span class="orgName">
                  <svg-icon icon-class="build"></svg-icon>
                  {{ item.name }}
                </span>
                <span class="time">{{ item.time }}</span>
                <div class="info">{{ item.content }}</div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <iframe
        v-else
        :src="modalValue"
        style="width:1300px;height:780px;margin:20px 25px 0;"
      ></iframe>
    </div>
  </div>
</template>

<script>
import PeopleInfo from './PeopleInfo'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    modalType: {
      type: String,
      dafault: 'zhq'
    },
    modalValue: {
      type: String,
      dafault: ''
    }
  },
  computed: {
    option() {
      return {
        color: ['#14ACFF', '#E6B00E'],
        name: '模拟数据',
        type: 'line',
        sampling: 'average',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD'
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
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月'
          ]
        },
        yAxis: {
          type: 'value',
          max: 100,
          axisLabel: {
            color: '#458CDD'
          },
          splitLine: {
            show: true,
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
          }
        },
        series: [
          {
            name: '群众活跃度',
            data: [0, 0, 3, 65, 70, 40, 35, 27, 55, 30, 8],
            type: 'line',
            smooth: true,
            // symbol: 'none',
            symbolSize: 5,
            lineStyle: {
              color: '#14ACFF'
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#14ACFF4d'
                  },
                  {
                    offset: 1,
                    color: '#14ACFF00'
                  }
                ],
                global: false
              }
            }
          }
        ]
      }
    }
  },
  data() {
    return {
      list: [
        {
          name: '省信访局',
          time: '2020-10-16 14:22:54',
          content: '300余名中华情受损人员陆续到省信访局聚集。'
        },
        {
          name: '省信访局',
          time: '2020-10-15 11:23:54',
          content:
            '80余名中华情受伤人员到八一公园聚集，登记收养养老证人员信息。'
        },
        {
          name: '省信访局',
          time: '2020-10-14 09:55:54',
          content: '20余名中华情受损人员到省信访局上访。'
        },
        // {
        //   name: '省信访局',
        //   content: '20余名中华情受损人员到省信访局上访。',
        //   time: '2020-10-14 08:30:50'
        // },
        {
          name: '省信访局',
          content: '10余名中华情受损人员到省信访局上访。',
          time: '2020-10-13 09:20:00'
        },
        // {
        //   name: '省信访局',
        //   time: '2020-10-13 14:43:20',
        //   content: '10余名中华情受损人员到省信访局上访。'
        // },
        // {
        //   name: '省信访局',
        //   content: '近百名中华情受损人员到省信访局上访。',
        //   time: '2020-10-12 17:26:32'
        // },
        {
          name: '省信访局',
          time: '2020-10-12 10:21:33',
          content: '百余名中华情受损人员到省信访局上访。'
        },
        {
          name: '省信访局',
          content: '300余名中华情受损人员陆续到省信访局聚集。',
          time: '2020-09-27 13:55:00'
        },
        {
          name: '省信访局',
          content: '近百名中华情受损人员陆续到省信访局聚集维权。',
          time: '2020-09-10 16:30:00'
        },
        {
          name: '省信访局',
          content: '30余名中华情受损人员在省信访局门口聚集。',
          time: '2020-09-09 19:20:30'
        },
        {
          name: '省信访局',
          content: '200余名中华情受损人员陆续到省信访局聚集维权。',
          time: '2020-09-08 11:44:02'
        },
        {
          name: '省信访局',
          content:
            '200余名中华情群体人员陆续赴省信访局聚集维权，该批人员在现场进行了签名活动，部分人员高举写有“还我救命钱”、“见省长”字样等牌子。18时许，大部分人员被劝离，仍有20余人携带草席等物品在现场滞留。',
          time: '2020-09-07 10:33:02'
        },
        {
          name: '省信访局',
          content: '近百名中华情受损人员到新建区中华情接待点聚集。',
          time: '2020-08-17 18:24:02'
        },
        {
          name: '省信访局',
          content: '60余名中华情受损人员到省信访局聚集。',
          time: '2020-07-06 13:24:02'
        },
        {
          name: '省信访局',
          content: '近百名中华情受损人员到省信访局聚集。',
          time: '2020-06-30 10:45:55'
        },
        {
          name: '省信访局',
          content: '近百名中华情受损人员到八一公园北门聚集。',
          time: '2020-06-21 08:00:00'
        },
        {
          name: '省信访局',
          content: '80余名中华情受损人员到市信访局聚集。',
          time: '2020-06-18 18:50:00'
        },
        {
          name: '省信访局',
          content: '40余名中华情受损人员到市信访局聚集。',
          time: '2020-06-15 17:24:02'
        },
        {
          name: '省信访局',
          content: '30余名中华情受损人员到市政府北门聚集。',
          time: '2020-06-12 15:24:02'
        },
        {
          name: '省信访局',
          content: '40余名中华情受损人员到市信访局聚集。',
          time: '2020-06-08 14:20:02'
        },
        {
          name: '省信访局',
          content: '200余名中华情受损人员陆续到八一公园聚集。',
          time: '2020-05-30 11:00:02'
        },
        {
          name: '省信访局',
          content: '50余名中华情受损人员到中华情接待点聚集。',
          time: '2020-05-23 19:33:02'
        },
        {
          name: '省信访局',
          content:
            '80余名中华情受损人员到八一公园聚集，登记收集养老证人员信息。',
          time: '2020-05-16 15:55:02'
        },
        {
          name: '省信访局',
          content: '20余名中华情受损人员陆续到市政府聚集。',
          time: '2020-05-07 16:40:02'
        },
        {
          name: '省信访局',
          content:
            '70余名中华情受损人员到市信访局聚集，并有10余名人员到省信访局上访。',
          time: '2020-05-06 13:25:05'
        },
        {
          name: '省信访局',
          content:
            '近百名中华情受损人员陆续到该养老公寓门口聚集，并有3人携带被褥滞留现场扬言过夜。',
          time: '2020-04-25 11:32:00'
        },
        {
          name: '省信访局',
          content:
            '近300名中华情受损人员到中华情老年公寓门口和中华情接待点聚集。',
          time: '2020-04-21 09:20:02'
        },
        {
          name: '省信访局',
          content:
            '70余名中华情受损人员陆续到省行政中心附近聚集，后被劝往中华情新建区接待点。',
          time: '2020-04-20 18:24:02'
        }
      ]
    }
  },
  components: {
    PeopleInfo
  },
  created() {},
  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.mask-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 999;
}
.iframe {
  width: 100%;
  height: 100%;
}
.conflict-modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 1350px;
  height: 828px;
  z-index: 1000;
  background: url("~@/assets/image/conflict/conflict_modal_bg.png") center
    center / 100% 100% no-repeat;
}
.close {
  cursor: pointer;
  z-index: 1001;
  position: absolute;
  top: 40px;
  right: 25px;
  width: 30px;
  height: 30px;
  background: url("~@/assets/image/dataView/pop-modal-close.png") center center /
    100% 100% no-repeat;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 330px;
  height: 470px;
  margin-left: -165px;
  margin-top: -285px;
  background: url("~@/assets/image/conflict/modal_center.png") center center /
    100% 100% no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  .center-title {
    color: #ffffff;
  }
}
.title {
  position: absolute;
  top: 15px;
  left: 30px;
  font-size: 16px;
  font-weight: bold;
  color: #7dbcff;
  line-height: 18px;
}
.left-top,
.right-top {
  position: absolute;
  width: 430px;
  height: 266px;
  background: url("~@/assets/image/conflict/modal_top_bg.png") center center /
    100% 100% no-repeat;
}
.left-top {
  left: 76px;
  top: 65px;
  padding: 40px 20px 0 20px;
  .el-image {
    width: 238px;
    height: 90px;
  }
  p {
    text-indent: 2em;
    color: #a9daff;
    line-height: 24px;
  }
}
.right-top {
  right: 65px;
  top: 65px;
}
.left-bottom,
.right-bottom {
  position: absolute;
  width: 430px;
  height: 405px;
  background: url("~@/assets/image/conflict/modal_bottom_bg.png") center center /
    100% 100% no-repeat;
}
.left-bottom {
  left: 76px;
  bottom: 67px;
  padding: 40px 20px 0 20px;
}
.right-bottom {
  right: 65px;
  bottom: 67px;
  padding: 40px 40px 0 40px;
  .list {
    width: 90%;
    height: 100%;
    .item {
      padding: 20px 0;
      border-bottom: 1px solid #033b85;
    }
    .orgName {
      display: inline-block;
      width: 50%;
      text-align: left;
      font-size: 16px;
      color: #a9daff;
    }
    .time {
      display: inline-block;
      width: 50%;
      font-size: 14px;
      color: #00ffff;
      text-align: right;
    }
    .info {
      font-size: 14px;
      color: #a9daff;
      line-height: 24px;
    }
  }
}
</style>
