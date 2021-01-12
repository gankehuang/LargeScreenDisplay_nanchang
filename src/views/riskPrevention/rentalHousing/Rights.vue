<template>
  <div class="page-right">
    <div class="top-two">
      <div class="title">出租房县区分布</div>
      <!--      <div :class="['tabs', { active: tab == 1 }]">-->
      <!--        <div class="tabItem" @click="tab = 0">出租房屋</div>-->
      <!--        <div class="tabItem" @click="tab = 1">租住人员</div>-->
      <!--      </div>-->
      <div style="margin: 40px 0; width: 100%; height: calc(100% - 40px)">
        <v-chart :options="useTypeOptions" class="echart" />
      </div>
      <!--      <div-->
      <!--        v-if="tab == 1"-->
      <!--        style="margin: 50px 0; width: 100%; height: calc(100% - 50px)"-->
      <!--      >-->
      <!--        <v-chart :options="amountChangeOptions" class="echart" />-->
      <!--      </div>-->
    </div>
    <div class="top-three">
      <div class="title">实时预警</div>
      <div class="item-box">
        <div class="item-list" v-for="(item, index) in listArr" :key="index">
          <p class="item-title">
            {{ item.time }}
          </p>
          <div class="item-con">
            <!--            <div class="imgs"><img :src="item.img" /></div>-->
            <div class="things">
              <div>{{ item.title }}</div>
              <div>群租人数：{{ item.num }}</div>
              <div>
                群租地址：{{ item.address }}
                <svg-icon icon-class="position" class="position-icon" />
              </div>
              <div class="types">已审核</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryRentRoomDistributed } from '@/api/riskPrevention/rentalHousing'
export default {
  data() {
    return {
      tab: 0,
      yType: [],
      czNums: [],
      listArr: [
        {
          time: '2020-11-19 17:24:02',
          alemType: '二级警报',
          img: require('@/assets/image/rentalHousing/组 78.png'),
          title: '人员群租事件',
          num: '13',
          address: '青山湖区北京东路258号京东小区A区7栋3单元301',
          type: '未核查'
        },
        {
          time: '2020-10-24 12:01:45',
          alemType: '二级警报',
          img: require('@/assets/image/rentalHousing/组 78.png'),
          title: '人员群租事件',
          num: '16',
          address: '青云谱区井冈山大道533号锦绣花园9号楼1单元604',
          type: '已核查'
        },
        {
          time: '2020-10-15 17:45:26',
          alemType: '二级警报',
          img: require('@/assets/image/rentalHousing/组 78.png'),
          title: '人员群租事件',
          num: '18',
          address: '红谷滩区会展路89号丰和花园A区6栋1单元401',
          type: '已核查'
        }
      ]
    }
  },
  computed: {
    useTypeOptions() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          orient: 'horizontal',
          top: 0,
          right: 30,
          width: '100%',
          height: '70%',
          data: ['出租房屋数', '租住人员数'],
          textStyle: {
            color: '#A9DAFF'
          }
        },
        grid: {
          top: '9%',
          left: '3%',
          right: '6%',
          bottom: '2%',

          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            color: '#72B0F1'
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
        yAxis: {
          type: 'category',
          axisLabel: {
            color: '#A9DAFF ',
            interval: 0
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
          data: this.yType.reverse()
        },
        series: [
          {
            name: '出租房屋数',
            type: 'bar',
            barWidth: '30%',
            data: [
              7722,
              6551,
              5376,
              4733,
              4421,
              3873,
              3400,
              2732,
              982,
              708,
              586,
              277
            ].reverse(),
            label: {
              show: false,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 1, color: '#2E78FF' },
                  { offset: 0, color: '#3B9AFE' }
                ],
                global: false
              }
            }
          },
          {
            name: '租住人员数',
            type: 'bar',
            barWidth: '30%',
            data: [
              15444,
              13102,
              10743,
              9466,
              8842,
              7746,
              6800,
              5464,
              1964,
              1416,
              1172,
              554
            ].reverse(),
            label: {
              show: false,
              position: 'top',
              color: '#AADAFF'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: '#4FC7FF' },
                  { offset: 1, color: '#68E0CF' }
                ],
                global: false
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      queryRentRoomDistributed({}).then(res => {
        if (res.status === 200) {
          // const arrs = res.data
          // arrs.forEach(item => {
          //   this.yType.push(item.name)
          //   this.czNums.push(item.num)
          // })
          this.yType = [
            '西湖区',
            '新建区',
            '高新区',
            '青山湖区',
            '安义县',
            '青云谱区',
            '东湖区',
            '红谷滩区',
            '南昌县',
            '湾里局',
            '经开区',
            '进贤县'
          ]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-right {
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 10px;
    left: 30px;
  }
}

.top-two {
  position: relative;
  width: 420px;
  height: 513px;
  background: url("~@/assets/image/rentalHousing/right-one.png") no-repeat;
  background-size: 100% 100%;
  .tabs {
    position: absolute;
    top: 13px;
    right: 16px;
    width: 162px;
    height: 30px;
    display: flex;
    background: url("~@/assets/image/rentalHousing/left-active.png") no-repeat
      center;
    background-size: 100% 100%;
    .tabItem {
      flex: 1;
      line-height: 30px;
      font-size: 16px;
      color: #7ebdff;
      text-align: center;
      cursor: pointer;
    }
    &.active {
      background: url("~@/assets/image/rentalHousing/right-active.png")
        no-repeat center;
    }
  }
}
.top-three {
  position: relative;
  width: 420px;
  height: 326px;
  background: url("~@/assets/image/rentalHousing/right-two.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 60px;
  .item-box {
    width: 100%;
    height: 240px;
    overflow-y: auto;
  }
  /* 设置滚动条的样式 */
  .item-box::-webkit-scrollbar {
    width: 12px;
  }

  /* 滚动槽 */
  .item-box::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  /* 滚动条滑块 */
  .item-box::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #04335d;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
  .item-list {
    width: 100%;
    padding: 0 15px;
    margin-bottom: 20px;
    .item-title {
      background-size: 100% 100%;
      padding-left: 30px;
      color: #00ffff;
      margin-bottom: 10px;
      span {
        display: inline-block;
        width: 67px;
        height: 20px;
        line-height: 20px;
        margin-left: 10px;
        text-align: center;
        background: url("~@/assets/image/rentalHousing/矩形 1299.png") no-repeat;
        background-size: 100% 100%;
        color: #ffffff;
      }
    }
    .item-con {
      display: flex;
      margin-left: 30px;
      width: 356px;
      background: rgba(0, 85, 255, 0.26);
      border: 1px solid #0b61a0;
      .imgs {
        align-self: center;
      }
      .things {
        padding-left: 10px;
        font-size: 14px;
        font-weight: 400;
        color: #a9daff;
        line-height: 25px;
        position: relative;
        .position-icon {
          font-size: 18px;
          color: #3397fb;
          cursor: pointer;
          display: inline-block;
          margin-left: 50px;
        }
        .types {
          position: absolute;
          top: 6px;
          right: 0;
          width: 56px;
          height: 19px;
          line-height: 19px;
          background: rgba(48, 85, 146, 0);
          border: 1px solid #e6b00e;
          border-radius: 4px;
          color: #e6b00e;
          text-align: center;
        }
      }
    }
  }
}
</style>
