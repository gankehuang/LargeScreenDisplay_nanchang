<template>
  <div class="mask-container" v-if="visible">
    <div class="mask"></div>
    <div class="household-table-container">
      <img
        class="modal-close"
        src="@/assets/image/dataView/pop-modal-close.png"
        @click="closeModal"
      />
      <div class="pop-modal-title">
        <h1>{{ title }}</h1>
      </div>
      <div
        class="flex-contianer"
        v-if="!loading && list && list.length"
        v-loading="loading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="transparent"
      >
        <div class="left-list">
          <el-scrollbar style="height: 700px">
            <div
              class="left-list-item"
              v-for="(item, index) in list"
              :key="index"
            >
              <div :class="handlePerType(item, index)" />
              <div class="info">
                <el-row>
                  <el-col :span="12">
                    <span class="label">姓名：</span>
                    <span class="data">{{ item.roomUserName }}</span>
                  </el-col>
                  <el-col :span="12">
                    <span class="label">性别：</span>
                    <span class="data">{{ item.sex }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <span class="label">民族：</span>
                    <span class="data">{{
                      item.nation ? item.nation + "族" : "-"
                    }}</span>
                  </el-col>
                  <el-col :span="14">
                    <span class="label">管理类别：</span>
                    <span class="data">户籍人口</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span class="label">人员标签：</span>
                    <span class="data">-</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span class="label">身份证号码：</span>
                    <span class="data">{{ item.cardNumber }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span class="label">联系电话：</span>
                    <span class="data" v-if="item.phoneNumber">{{
                      item.phoneNumber | hidePhone
                    }}</span>
                    <span class="data" v-else>-</span>
                  </el-col>
                </el-row>
              </div>
              <div class="avatar">
                <el-image
                  :src="item.identityPhotoURL || item.collectionPhotoURL"
                  :preview-src-list="[
                    item.collectionPhotoURL || item.identityPhotoURL
                  ]"
                />
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="right-section">
          <div class="echart-legend">
            <span
              class="echart-legend-span"
              :class="{ active: curEchartName === '水' }"
              @click="handleCurEchart('水')"
              >水</span
            >
            <span
              class="echart-legend-span"
              :class="{ active: curEchartName === '电' }"
              @click="handleCurEchart('电')"
              >电</span
            >
            <span
              class="echart-legend-span"
              :class="{ active: curEchartName === '气' }"
              @click="handleCurEchart('气')"
              >气</span
            >
          </div>
          <v-chart :options="topOptions" class="top" />
          <div class="bottom">
            <div class="bottom-title">异常分析</div>
            <div class="analysis-list">
              <div
                class="analysis-list-item"
                :key="index"
                v-for="(item, index) in analysisList"
              >
                <div class="level-bg" :class="handleLevel(item, index)">
                  <img :src="levelArr[item.level]" />
                  <div class="level-tips">
                    <div
                      class="level-tips-item"
                      v-for="index in 4"
                      :key="index"
                    >
                      {{ index + "级" }}
                    </div>
                  </div>
                </div>
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-if="!loading && list.length === 0">
        <img :src="require('@/assets/image/rentalHousing/empty-icon.png')" />
      </div>
    </div>
  </div>
</template>

<script>
import { queryRoomUserByRoom } from '@/api/riskPrevention/rentalHousing'
const initLevelArr = [
  require('@/assets/image/rentalHousing/level-0.png'),
  require('@/assets/image/rentalHousing/level-1.png'),
  require('@/assets/image/rentalHousing/level-2.png'),
  require('@/assets/image/rentalHousing/level-3.png'),
  require('@/assets/image/rentalHousing/level-4.png')
]
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      photoUrl: require('@/assets/image/rentalHousing/has-avatar.png'),
      list: [],
      title: '',
      loading: false,
      tableLoading: false,
      levelArr: initLevelArr,
      analysisList: [
        {
          name: '群租房嫌疑度',
          level: 1
        },
        {
          name: '传销嫌疑度',
          level: 1
        },
        {
          name: '赌博窝点嫌疑度',
          level: 1
        }
      ],
      curUnit: 'm³',
      seriesData: [8, 9.5, 9, 10, 11, 12, 11.5, 11.8, 11.2, 10.5, 9.5],
      curEchartName: '水'
    }
  },
  computed: {
    topOptions() {
      return {
        title: {
          text: '分析',
          left: '140',
          textStyle: {
            color: '#7FBDFF',
            fontSize: 16,
            align: 'left'
          }
        },
        name: '模拟数据',
        type: 'line',
        smooth: true,
        color: ['#3B9AFE', '#00FFFF', '#0055FF'],
        legend: {
          show: false,
          data: ['水', '电', '气'],
          textStyle: {
            color: '#7FBDFF'
          }
        },
        tooltip: {
          show: true,
          formatter: '{b}<br/>{c}'
        },
        grid: {
          top: '10%',
          left: '15%'
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
            '11月',
            '12月'
          ]
        },
        yAxis: {
          name: this.curUnit,
          nameTextStyle: {
            color: '#458CDD',
            fontSize: 15
          },
          type: 'value',
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
            name: this.curEchartName,
            data: this.seriesData,
            type: 'line',
            smooth: true,
            symbol: 'none',
            symbolSize: 0,
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
    },
    bottomOptions() {
      return {}
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.getList()
      }
    }
  },
  methods: {
    async getList() {
      this.loading = true
      const { status, data } = await queryRoomUserByRoom({
        roomId: this.id
      })
      this.loading = false
      if (status === 200) {
        // 按照 业主 自住 租户 排序
        this.list = data.sort((pre, cur) => this.sortByType(pre, cur))
        this.title =
          this.list[0].unitName.replace('_', '') + this.list[0].roomName + '房'
      }
    },
    handlePerType(item, index) {
      if (item.registrationType === '业主' && index === 0) {
        return 'tip-owner'
      } else if (
        item.registrationType === '租客' ||
        item.registrationType === '租户'
      ) {
        return 'tip-tenant'
      } else {
        return 'tip-household'
      }
    },
    handleCurEchart(item) {
      this.curEchartName = item

      switch (item) {
        case '水':
          this.curUnit = 'm³'
          this.seriesData = [
            8,
            9.5,
            9,
            10,
            11,
            12,
            11.5,
            11.8,
            11.2,
            10.5,
            9.5
          ]
          break

        case '电':
          this.curUnit = 'kWh'
          this.seriesData = [
            120,
            110,
            100,
            115,
            111,
            135,
            150,
            175,
            160,
            130,
            113
          ]
          break

        case '气':
          this.curUnit = 'm³'
          this.seriesData = [5.5, 5, 4.8, 5.2, 6, 6.5, 6.8, 6.7, 6.6, 6, 5.8]
          break
      }
    },
    // 房屋人员排序
    sortByType(pre, cur) {
      switch (pre.registrationType) {
        case '业主':
          pre.weight = 3
          break
        case '家人':
        case '自住':
          pre.weight = 2
          break
        case '租户':
          pre.weight = 1
          break
        default:
          break
      }
      switch (cur.registrationType) {
        case '业主':
          cur.weight = 3
          break
        case '家人':
        case '自住':
          cur.weight = 2
          break
        case '租户':
          cur.weight = 1
          break
        default:
          break
      }
      return cur.weight - pre.weight
    },
    // 判断嫌疑指数
    handleLevel({ level }) {
      return `level-${level}`
    },
    closeModal() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss">
.mask-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 999;
}
.household-table-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 1350px;
  height: 828px;
  background: url("~@/assets/image/rentalHousing/pop-modal-bg.png") center
    center / 100% 100% no-repeat;
  z-index: 1000;
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
    padding: 50px 0 0 50px;
  }
  .modal-close {
    position: absolute;
    top: 18px;
    right: 20px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 1002;
  }
  .pop-modal-title {
    position: absolute;
    width: 650px;
    height: 70px;
    left: 50%;
    margin-left: -325px;
    background: url("~@/assets/image/rentalHousing/pop-modal-title.png") center
      center / 100% 100% no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .flex-contianer {
    display: flex;
    width: 100%;
  }
  .empty {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 36px;
    color: #fff;
    margin-top: -90px;
    margin-left: -73px;
    img {
      width: 146px;
      height: 180px;
    }
  }
  .left-list {
    flex: 0.4;
    margin: 68px 0 0 33px;
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 70px;
      right: -50px;
      width: 1px;
      height: 593px;
      background: url("~@/assets/image/rentalHousing/pop-modal-line.png") center
        center / 100% 100% no-repeat;
    }
  }
  .left-list-item {
    width: 474px;
    height: 168px;
    margin-bottom: 15px;
    position: relative;
    background: url("~@/assets/image/rentalHousing/left-list-item-bg.png")
      center center / 100% 100% no-repeat;
    display: flex;
    .avatar {
      width: 90px;
      height: 122px;
      margin: 23px 0;
    }
    .info {
      flex: 0.9;
      padding: 20px 0 0 80px;
      line-height: 28px;
      .label {
        font-size: 16px;
        color: #7fbdff;
      }
      .data {
        font-size: 16px;
        color: #a9daff;
      }
    }
  }
  .tip-owner {
    position: absolute;
    top: -24px;
    left: -24px;
    width: 96px;
    height: 96px;
    background: url("~@/assets/image/rentalHousing/tip-owner.png") center center /
      100% 100% no-repeat;
    &::after {
      content: "房主";
      display: block;
      font-size: 24px;
      font-weight: bold;
      position: absolute;
      top: 36px;
      left: 24px;
      color: #a9daff;
    }
  }
  .tip-household {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    background: url("~@/assets/image/rentalHousing/tip-household.png") center
      center / 100% 100% no-repeat;
    &::after {
      content: "自住";
      display: block;
      font-size: 24px;
      font-weight: bold;
      position: absolute;
      top: 16px;
      left: 8px;
      color: #d8eeff;
    }
  }
  .tip-tenant {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    background: url("~@/assets/image/rentalHousing/tip-tenant.png") center
      center / 100% 100% no-repeat;
    &::after {
      content: "租住";
      display: block;
      font-size: 24px;
      font-weight: bold;
      position: absolute;
      top: 16px;
      left: 8px;
      color: #d8eeff;
    }
  }
  .right-section {
    position: relative;
    flex: 0.6;
    margin-top: 100px;
    height: 728px;
    .echart-legend {
      color: #7fbdff;
      display: flex;
      position: absolute;
      z-index: 1;
      right: 10%;
      .echart-legend-span {
        text-align: center;
        flex: 0 0 50px;
        cursor: pointer;
        color: #7fbdff;
        background-color: #064f87;
        padding: 5px 20px;
      }
      .echart-legend-span.active {
        color: #fff;
        background-color: #189aff;
      }
      //& > span {
      //  text-align: center;
      //  flex: 0 0 50px;
      //  cursor: pointer;
      //}
    }
    .top {
      height: 50%;
    }
    .bottom {
      height: 50%;
    }
    .bottom-title {
      margin: 30px 0 30px 120px;
      color: #7fbdff;
      font-size: 16px;
    }
    .analysis-list {
      display: flex;
      width: 100%;
      padding-left: 50px;
    }
    .analysis-list-item {
      flex: 33.333333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;
      .level-bg {
        width: 138px;
        height: 119px;
        background: url("~@/assets/image/rentalHousing/level-0.png") center
          center / 100% 100% no-repeat;
        margin-bottom: 20px;
        img {
          width: 138px;
          height: 119px;
        }
      }
      .name {
        font-size: 16px;
        font-weight: bold;
        color: #7fbdff;
      }
    }
    .level-tips {
      position: absolute;
      top: 0;
      right: 0;
    }
    .level-tips-item {
      font-size: 14px;
      font-weight: 400;
      color: #3b9afe;
      width: 30px;
      &:nth-of-type(4) {
        position: absolute;
        top: 10px;
        right: 20px;
      }
      &:nth-of-type(3) {
        position: absolute;
        top: 40px;
        right: 35px;
      }
      &:nth-of-type(2) {
        position: absolute;
        top: 70px;
        right: 50px;
      }
      &:nth-of-type(1) {
        position: absolute;
        top: 100px;
        right: 70px;
      }
    }
  }
}
</style>
