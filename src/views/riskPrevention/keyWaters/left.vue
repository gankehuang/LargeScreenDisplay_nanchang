<template>
  <div class="page-left">
    <div class="top">
      <div class="title">
        渔民信息
      </div>
      <div class="total">
        <div class="number">
          4242
        </div>
        <div class="label">
          渔民总数
        </div>
      </div>
      <div class="detail-list">
        <div
          v-for="(item, index) in leftTopList"
          :key="index"
          class="item"
        >
          <span class="item-label">{{ item.label }}</span>
          <span class="item-number">
            <font>{{ item.number }}</font>人
          </span>
        </div>
      </div>
      <div class="type-list">
        <div
          v-for="(item, index) in typeList"
          :key="index"
          class="type-item"
        >
          <div class="label">
            {{ item.label }}
          </div>
          <div class="number">
            {{ item.number }}
          </div>
        </div>
      </div>
      <div class="market-list">
        <div
          v-for="(item, index) in marketList"
          :key="index"
          class="market-item"
        >
          <span class="icon" />
          <span class="label">{{ item.label }}</span>
          <span class="number">
            <font>{{ item.number }}</font>个
          </span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title">
        渔民人均收入
      </div>
      <p class="pieces">
        单位:元
      </p>
      <v-chart :options="options" />
    </div>
  </div>
</template>

<script>
import { fishingIncome } from '@/api/riskPrevention/keyWaters'
export default {
  data () {
    return {
      fishCount: {},
      leftTopList: [],
      typeList: [],
      marketList: [
        {
          label: '水产交易市场',
          number: 1
        },
        {
          label: '涉渔市场',
          number: 9
        }
      ],
      options: {}
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      fishingIncome({}).then(res => {
        if (res.status === 200) {
          this.fishCount = res.data
          this.leftTopList = [
            { number: 1120, label: '专业渔民' },
            { number: 4242, label: '退捕渔民' },
            { number: 32, label: '转护渔民' }
          ]
          this.typeList = [
            {
              label: '回收渔船',
              number: 3400
            },
            {
              label: '码头',
              number: 42
            },
            {
              label: '渔村',
              number: 24
            }
          ]

          const lists = [
            res.data.thirdIncome.toFixed(2),
            res.data.twoIncome.toFixed(2),
            res.data.oneIncome.toFixed(2)
          ]
          // 渔民收入情况
          this.options = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              top: '10%',
              width: '80%',
              height: '70%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              axisLabel: {
                color: '#458CDD'
                // interval: 0,
                // rotate: -40,
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
              data: ['2017', '2018', '2019']
            },
            yAxis: {
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
                name: '渔民人均收入',
                type: 'bar',
                barWidth: '60%',
                data: lists,
                label: {
                  show: true,
                  position: 'top',
                  color: '#AADAFF'
                },
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#3C9AFE'
                      },
                      {
                        offset: 1,
                        color: '#00FFFF'
                      }
                    ],
                    global: false
                  }
                }
              }
            ]
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top,
.bottom {
  position: relative;
  width: 420px;
  height: 420px;
  background: url("~@/assets/image/keyWaters/left-top.png") center center / 100%
    100% no-repeat;
  .title {
    margin: 10px 0 20px 30px;
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
  }
  .pieces {
    position: absolute;
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    top: 30px;
    right: 30px;
  }
}
.top {
  .total {
    position: relative;
    width: 244px;
    height: 112px;
    display: inline-block;
    background: url("~@/assets/image/keyWaters/left-top-total.png") center
      center / 100% 100% no-repeat;
    text-align: center;
    &::after {
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50px;
      left: 230px;
      background: url("~@/assets/image/keyWaters/left-top-arrow.png") center
        center / 100% 100% no-repeat;
    }
    .number {
      margin: 36px 0 0 104px;
      font-size: 24px;
      font-weight: bold;
      color: #e6b00e;
    }
    .label {
      margin-left: 104px;
      font-weight: bold;
      color: #a9daff;
    }
  }
  .detail-list {
    display: inline-block;
    margin-left: 45px;
    vertical-align: bottom;
    .item {
      margin-top: 15px;
      font-weight: bold;
      color: #a9daff;
      font {
        display: inline-block;
        margin: 0 5px;
        font-size: 18px;
        font-weight: bold;
        color: #00ffff;
      }
    }
  }
  .type-list {
    padding: 25px 15px 25px 15px;
    display: flex;
    align-content: center;
    justify-content: space-around;
    .type-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 110px;
      height: 80px;
      font-weight: bold;
      color: #a9daff;
      line-height: 18px;
      background: url("~@/assets/image/keyWaters/left-top-type-item.png") center
        center / 100% 100% no-repeat;
      .number {
        font-size: 24px;
        font-weight: bold;
        line-height: 36px;
      }
    }
  }

  .market-list {
    padding: 15px 15px 25px 15px;
    display: flex;
    align-content: center;
    justify-content: space-around;
    .market-item {
      font-weight: bold;
      color: #a9daff;
      line-height: 18px;
      .icon {
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
        width: 32px;
        height: 32px;
        background: url("~@/assets/image/keyWaters/left-top-market-icon.png")
          center center / 100% 100% no-repeat;
      }
      .label {
        display: inline-block;
        vertical-align: middle;
      }
      .number {
        display: inline-block;
        vertical-align: middle;
        font {
          display: inline-block;
          margin: 0 5px;
          font-size: 18px;
          font-weight: bold;
          color: #00ffff;
        }
      }
    }
  }
}
</style>
