<template>
  <div class="page-left">
    <div class="top-two">
      <div class="title">房屋数量</div>
      <v-chart :options="distributeOptions" class="echart" />
      <div class="info">
        <p class="all-num">
          <span>{{ roomCount.totalRoomCount }}</span
          >房屋总数
        </p>
        <p class="all-one">
          <span class="dots"></span>自住房屋<span>{{
            roomCount.roomSelfCount
          }}</span>
        </p>
        <p class="all-two">
          <span class="dots"></span>租住房屋<span>{{
            roomCount.roomRentCount
          }}</span>
        </p>
        <p class="all-three">
          <span class="dots"></span>空置房屋<span>{{
            roomCount.roomLeisureCount
          }}</span>
        </p>
        <p class="all-four">
          <span class="dots"></span>其它<span>{{ roomCount.otherCount }}</span>
        </p>
      </div>
    </div>
    <div class="top-three">
      <div class="title">出租房使用类型</div>
      <v-chart :options="useTypeOptions" class="echart" />
    </div>
    <div class="top-four">
      <div class="title">出租房数量变化</div>
      <v-chart :options="amountChangeOptions" class="echart" />
    </div>
  </div>
</template>

<script>
import {
  queryRoomCount,
  queryUseTypeRoomRentCount
} from '@/api/riskPrevention/rentalHousing'
export default {
  data() {
    return {
      roomCount: {
        totalRoomCount: ''
      },
      roomData: [],
      dataType2: [],
      dataNums: [],
      amountChangeOptions: {
        name: '模拟数据',
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
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
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
            data: [
              40089,
              41340,
              39805,
              40177,
              39790,
              41300,
              41520,
              41220,
              41332,
              41352,
              41608
            ],
            type: 'line',
            smooth: true,
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
  computed: {
    distributeOptions() {
      return {
        color: ['#3B9AFE', '#E6B00E', '#0055FF', '#D3DA1D'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: 40,
          right: 30,
          height: '70%',
          show: false,
          data: ['自住房屋', '租住房屋', '空置房屋', '其它'],
          textStyle: {
            color: '#A9DAFF'
          }
        },
        series: [
          {
            name: '房屋数量',
            type: 'pie',
            center: ['28%', '55%'],
            radius: ['25%', '45%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter: '{d}%',
              textStyle: {
                color: '#7EBDFF'
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false,
              length: 1
            },
            data: this.roomData
          }
        ]
      }
    },
    useTypeOptions() {
      return {
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '22%',
          left: '4%',
          width: '90%',
          height: '70%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD',
            interval: 0
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
          data: this.dataType2
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
            name: '出租房使用类型',
            type: 'bar',
            barWidth: '40%',
            data: this.dataNums,
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
  },
  mounted() {
    this.getList()
    this.getTypeList()
  },
  methods: {
    getList() {
      queryRoomCount({ gridCode: '' }).then(res => {
        if (res.status === 200) {
          // this.roomCount = res.data
          // this.roomData = [
          //   { value: res.data.roomSelfCount, name: '自住房屋' },
          //   { value: res.data.roomRentCount, name: '租住房屋' },
          //   { value: res.data.roomLeisureCount, name: '空置房屋' },
          //   { value: res.data.otherCount, name: '其它' }
          // ]
          this.roomCount = {
            totalRoomCount: 430254,
            roomSelfCount: 126929,
            roomRentCount: 41352,
            roomLeisureCount: 258152,
            otherCount: 3821
          }
          this.roomData = [
            { value: 126929, name: '自住房屋' },
            { value: 41352, name: '租住房屋' },
            { value: 258152, name: '空置房屋' },
            { value: 3821, name: '其它' }
          ]
        }
      })
    },
    getTypeList() {
      queryUseTypeRoomRentCount({ gridCode: '' }).then(res => {
        if (res.status === 200) {
          const that = this
          const arrs = res.data
          arrs.forEach(item => {
            that.dataType2.push(item.name)
            // that.dataNums.push({
            //   name: item.name,
            //   value: item.numVal
            // })
          })
          that.dataNums = [
            {
              name: '住宅',
              value: 37508
            },
            {
              name: '工商区',
              value: 2939
            },
            {
              name: '仓库',
              value: 658
            },
            {
              name: '其他',
              value: 247
            }
          ]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-left {
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
.top-one {
  width: 420px;
  height: 140px;
  background: url("~@/assets/image/rentalHousing/rentalHousing-left-one.png")
    no-repeat center center;
  background-size: 100% 100%;
  padding: 10px;
  .list {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .data {
      font-size: 24px;
      color: #e6b00e;
      font-weight: bold;
    }
    .label {
      font-weight: bold;
      color: #a9daff;
      line-height: 27px;
    }
  }
}
.top-two,
.top-three,
.top-four {
  position: relative;
  width: 420px;
  height: 275px;
  background: url("~@/assets/image/rentalHousing/left-box.png") no-repeat;
  background-size: 100% 100%;
  .echart {
    width: 100%;
    height: 100%;
  }
}
.info {
  position: absolute;
  top: 44px;
  right: 15px;
  .all-num {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #aadaff;
    span {
      display: inline-block;
      padding-right: 4px;
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #e6b00e;
      line-height: 30px;
    }
  }

  .all-one,
  .all-two,
  .all-three,
  .all-four {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #7ebdff;
    line-height: 34px;
    margin: 0 !important;
    .dots {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 12px;
      margin-right: 4px;
    }
    span {
      display: inline-block;
      margin-left: 4px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #00ffff;
      line-height: 34px;
    }
  }
  .all-one .dots {
    background-color: #3c9afe;
  }
  .all-two .dots {
    background-color: #e6b00e;
  }
  .all-three .dots {
    background-color: #0056ff;
  }
  .all-four .dots {
    background-color: #d3da1d;
  }
}
</style>
