<template>
  <div class="win-info">
    <div class="title">群体活动度</div>
    <div class="drop">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ level }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="width: 109px;text-align: center;line-height: 36px;background: none;border-radius: 6px;border: 1px solid #559AF6;"
        >
          <el-dropdown-item
            @click.native="tabLevel(item)"
            v-for="(item, index) in levelList"
            :key="index"
            >{{ item }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <v-chart :options="options" class="echarts" v-loading="loading" />
  </div>
</template>

<script>
import { queryReleasedWarningTrend } from '@/api/riskPrevention/importPeople'
export default {
  computed: {
    options() {
      return {
        name: '群体活动',
        type: 'line',
        smooth: true,
        symbol: 'none',
        symbolSize: 5,
        sampling: 'average',
        itemStyle: {
          color: '#0780F1'
        },
        tooltip: {
          show: true,
          formatter: '{b}<br/>{c}'
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
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
            data: this.dataList,
            type: 'line',
            smooth: true,
            // symbol: 'none',
            symbol: 'circle', // 折线点设置为实心点
            symbolSize: 4, // 折线点的大小
            itemStyle: {
              normal: {
                color: '#ffffff', // 折线点的颜色
                lineStyle: {
                  color: '#A9DAFF' // 折线的颜色
                }
              }
            }
          }
          //   {
          //     data: [2, 1, 5, 4, 6, 2, 8, 9, 7, 10, 12, 16],
          //     type: 'line',
          //     smooth: true,
          //     symbol: 'none',
          //     itemStyle: {
          //       normal: {
          //         color: '#ffffff', // 折线点的颜色
          //         lineStyle: {
          //           color: '#00FFFF' // 折线的颜色
          //         }
          //       }
          //     }
          //   },
          //   {
          //     data: [4, 13, 2, 4, 1, 1, 2, 10, 12, 10, 2, 4],
          //     type: 'line',
          //     smooth: true,
          //     // symbol: 'none',
          //     symbol: 'circle', // 折线点设置为实心点
          //     symbolSize: 4, // 折线点的大小
          //     itemStyle: {
          //       normal: {
          //         color: '#ffffff', // 折线点的颜色
          //         lineStyle: {
          //           color: '#A9DAFF' // 折线的颜色
          //         }
          //       }
          //     }
          //   }
        ]
      }
    }
  },
  data() {
    return {
      data: false,
      loading: false,
      level: '中华情',
      levelList: ['中华情', '老庆祥', '金三江', '农校委培生'],
      dataList: [0, 0, 3, 65, 70, 40, 35, 27, 55, 30, 8],
      dataList1: [0, 0, 1, 65, 70, 40, 35, 27, 55, 30, 8],
      dataList2: [0, 0, 2, 4, 6, 2, 8, 9, 7, 10, 12, 16],
      dataList3: [0, 0, 1, 4, 1, 1, 2, 10, 12, 10, 2, 4],
      dataList4: [0, 0, 1, 4, 1, 1, 2, 10, 12, 10, 2, 4]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      queryReleasedWarningTrend().then(res => {
        if (res.status === 200) {
          this.loading = false
        }
      })
    },
    tabLevel(level) {
      this.level = level
      switch (level) {
        case '中华情':
          this.dataList = this.dataList1
          break
        case '老庆祥':
          this.dataList = this.dataList2
          break
        case '金三江':
          this.dataList = this.dataList3
          break
        case '农校委培生':
          this.dataList = this.dataList3
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.win-info {
  position: relative;
  width: 420px;
  height: 275px;
  margin-bottom: 0;
  background: url("~@/assets/image/specialPeople/right-bg3.png") no-repeat
    center;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 24px;
    position: absolute;
    top: 15px;
    left: 20px;
  }
  .echart {
    width: 100%;
    height: 100%;
  }
  .tabs {
    position: absolute;
    top: 13px;
    right: 16px;
    width: 162px;
    height: 30px;
    display: flex;
    background: url("~@/assets/image/interviewSituation/left-active.png")
      no-repeat center;
    background-size: 100% 100%;
    z-index: 99;
    .tabItem {
      flex: 1;
      line-height: 30px;
      font-size: 16px;
      color: #7ebdff;
      text-align: center;
      cursor: pointer;
    }
    &.active {
      background: url("~@/assets/image/interviewSituation/right-active.png")
        no-repeat center;
    }
  }
  .drop {
    position: absolute;
    right: 0px;
    top: 13px;
    z-index: 40;
  }
  .el-dropdown {
    margin-right: 20px;
  }
  .el-dropdown-link {
    display: inline-block;
    width: 110px;
    line-height: 31px;
    text-align: center;
    font-size: 12px;
    color: #b2d9fb;
    background: url("~@/assets/image/importPeople/button-bg.png") no-repeat
      center;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>
