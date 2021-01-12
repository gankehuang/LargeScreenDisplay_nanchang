<template>
  <div class="rentalHousing-right-container">
    <div class="top-one">
      <div class="title">租客人数</div>
      <v-chart :options="amountOptions" class="echarts" />
    </div>
    <div class="top-two">
      <div class="title">出租房时长</div>
      <v-chart :options="durationOptions" class="echarts" />
    </div>
    <div class="top-three">
      <div class="title">群租事件</div>
      <div class="list-container">
        <div class="list-item">
          <span class="item-no">序号</span>
          <span class="item-name">县区</span>
          <span class="item-date">小区名称</span>
          <span class="item-type">租客人数</span>
        </div>
        <el-scrollbar style="height:88%;">
          <div class="list-item">
            <div class="item-no">
              2351
            </div>
            <div class="item-name">
              高新区
            </div>
            <div class="item-date">
              旭日家园
            </div>
            <div class="item-type">
              299
            </div>
          </div>
          <div class="list-item">
            <div class="item-no">
              2351
            </div>
            <div class="item-name">
              高新区
            </div>
            <div class="item-date">
              旭日家园
            </div>
            <div class="item-type">
              299
            </div>
          </div>
          <div class="list-item">
            <div class="item-no">
              2351
            </div>
            <div class="item-name">
              高新区
            </div>
            <div class="item-date">
              旭日家园
            </div>
            <div class="item-type">
              299
            </div>
          </div>
          <div class="list-item">
            <div class="item-no">
              2351
            </div>
            <div class="item-name">
              高新区
            </div>
            <div class="item-date">
              旭日家园
            </div>
            <div class="item-type">
              299
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <div class="top-four">
      <div class="title">小区出租房排行</div>
      <div class="list-container">
        <div class="list-item">
          <span class="item-no">序号</span>
          <span class="item-name">小区名称</span>
          <span class="item-date">房屋总数</span>
          <span class="item-type">出租房屋</span>
          <span class="item-type">出租房占比</span>
        </div>
        <el-scrollbar style="height:88%;">
          <div class="list-item">
            <div class="item-no">
              1
            </div>
            <div class="item-name">
              旭日家园
            </div>
            <div class="item-date">
              600
            </div>
            <div class="item-type">
              200
            </div>
            <div class="item-type">
              200
            </div>
          </div>
          <div class="list-item">
            <div class="item-no">
              1
            </div>
            <div class="item-name">
              旭日家园
            </div>
            <div class="item-date">
              600
            </div>
            <div class="item-type">
              200
            </div>
            <div class="item-type">
              200
            </div>
          </div>
          <div class="list-item">
            <div class="item-no">
              1
            </div>
            <div class="item-name">
              旭日家园
            </div>
            <div class="item-date">
              600
            </div>
            <div class="item-type">
              200
            </div>
            <div class="item-type">
              200
            </div>
          </div>
          <div class="list-item">
            <div class="item-no">
              1
            </div>
            <div class="item-name">
              旭日家园
            </div>
            <div class="item-date">
              600
            </div>
            <div class="item-type">
              200
            </div>
            <div class="item-type">
              200
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amountOptions: {
        color: [
          '#0055FF',
          '#E6B00E',
          '#00FFFF',
          '#3B9AFE',
          '#ADD14D',
          '#0DE0A7',
          '#4A8CAE',
          '#042D80',
          '#E35500',
          '#067B7B',
          '#B1CBFF',
          '#7000EE'
        ],
        legend: {
          icon: 'circle',
          orient: 'horizontal',
          top: 40,
          right: 0,
          width: '110%',
          data: [
            '安义县',
            '湾里管理局',
            '新建区',
            '经开区',
            '红谷滩',
            '西湖区',
            '东湖区',
            '青山湖',
            '高新区',
            '青云谱',
            '南昌县',
            '进贤县'
          ],
          textStyle: {
            color: '#A9DAFF',
            size: 12
          }
        },
        grid: {
          // left: '3%',
          // right: '4%',
          // bottom: '3%',
          top: '45%',
          height: '40%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              show: false,
              color: '#458CDD'
            },
            axisLine: {
              lineStyle: {
                color: '#004968'
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.5)']
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
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
          }
        ],
        series: [
          {
            name: '安义县',
            type: 'bar',
            barWidth: '5%',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [8765]
          },
          {
            name: '湾里管理局',
            type: 'bar',
            barWidth: '5%',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [7986]
          },
          {
            name: '新建区',
            type: 'bar',
            barWidth: '5%',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [8986]
          },
          {
            name: '经开区',
            type: 'bar',
            barWidth: '5%',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [8986]
          },
          {
            name: '红谷滩',
            type: 'bar',
            barWidth: '5%',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [8986]
          },
          {
            name: '西湖区',
            type: 'bar',
            barWidth: '5%',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [8986]
          },
          {
            name: '东湖区',
            type: 'bar',
            barWidth: '5%',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [8986]
          },
          {
            name: '青山湖',
            type: 'bar',
            barWidth: '5%',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [8986]
          },
          {
            name: '高新区',
            type: 'bar',
            barWidth: '5%',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [8986]
          },
          {
            name: '青云谱',
            type: 'bar',
            barWidth: '5%',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [8986]
          },
          {
            name: '南昌县',
            type: 'bar',
            barWidth: '5%',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [8986]
          },
          {
            name: '进贤县',
            type: 'bar',
            barWidth: '5%',
            emphasis: {
              label: {
                show: true
              }
            },
            data: [8986]
          }
        ]
      },
      durationOptions: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '30%',
          width: '80%',
          height: '60%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD',
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
            '1-2月',
            '3-6个月',
            '6-12个月',
            '12-24个月',
            '24-36个月',
            '36个月以上'
          ]
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
            name: '出租房个数',
            type: 'bar',
            barWidth: '60%',
            data: [900, 900, 900, 900, 900, 900]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rentalHousing-right-container {
  position: absolute;
  top: 0;
  right: 16px;
  //   width: 100%;
  height: 98%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
.echarts {
  width: 100%;
  height: 100%;
}
.top-one {
  position: relative;
  width: 420px;
  height: 220px;
  background: url("~@/assets/image/newPage/rentalHousing-left-two.png")
    no-repeat center center;
  background-size: 100% 100%;
}
.top-two {
  position: relative;
  width: 420px;
  height: 185px;
  background: url("~@/assets/image/newPage/rentalHousing-right-two.png")
    no-repeat center center;
  background-size: 100% 100%;
}
.top-three {
  position: relative;
  width: 420px;
  height: 210px;
  background: url("~@/assets/image/newPage/rentalHousing-right-three.png")
    no-repeat center center;
  background-size: 100% 100%;
  .list-container {
    width: 95%;
    height: 150px;
    margin: 35px auto 0;
    /deep/ .el-scrollbar__wrap {
      overflow: auto;
    }
    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid rgba(50, 166, 255, 0.25);
      cursor: pointer;
      color: #9ccbff;
      .item-no {
        flex: 0 0 10%;
        text-align: center;
      }
      .item-name {
        flex: 0 0 20%;
        text-align: center;
      }
      .item-type,
      .item-content {
        flex: 0 0 20%;
        text-align: center;
      }
      .item-date {
        flex: 0 0 20%;
        text-align: center;
      }
      // &:nth-child(2n + 1) {
      //   background-color: rgba(79, 162, 255, 0.12);
      // }
    }
  }
}
.top-four {
  position: relative;
  width: 420px;
  height: 210px;
  background: url("~@/assets/image/newPage/rentalHousing-right-three.png")
    no-repeat center center;
  background-size: 100% 100%;
  .list-container {
    width: 95%;
    height: 150px;
    margin: 35px auto 0;
    /deep/ .el-scrollbar__wrap {
      overflow: auto;
    }
    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid rgba(50, 166, 255, 0.25);
      cursor: pointer;
      color: #9ccbff;
      .item-no {
        flex: 0 0 10%;
        text-align: center;
      }
      .item-name {
        flex: 0 0 20%;
        text-align: center;
      }
      .item-type,
      .item-content {
        flex: 0 0 20%;
        text-align: center;
      }
      .item-date {
        flex: 0 0 20%;
        text-align: center;
      }
      // &:nth-child(2n + 1) {
      //   background-color: rgba(79, 162, 255, 0.12);
      // }
    }
  }
}
</style>
