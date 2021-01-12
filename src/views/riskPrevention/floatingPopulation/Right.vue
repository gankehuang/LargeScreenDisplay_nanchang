<template>
  <div class="page-right">
    <div class="right-top">
      <div class="title">流动人口结构</div>
      <v-chart
        :options="famaleOptions"
        style="display:inline-block;width:43%;height:100%"
      />
      <v-chart
        :options="maleOptions"
        style="display:inline-block;width:57%;height:100%"
      />
      <!-- <div class="title" v-if="rightTopTab === '落脚点'">流动人口分析</div>
      <div class="title" v-else>流动人口就业情况分析</div>
      <div class="tab">
        <span
          @click="rightTopTab = '落脚点'"
          :class="rightTopTab === '落脚点' ? 'selected-tab' : ''"
          >落脚点</span
        >
        <span
          @click="rightTopTab = '就业情况'"
          :class="rightTopTab === '就业情况' ? 'selected-tab' : ''"
          >就业情况</span
        >
      </div>
      <v-chart
        style="width:100%;height:100%"
        :options="ljdOptions"
        v-if="rightTopTab === '落脚点'"
      />
      <v-chart :options="jyqkOptions" v-else /> -->
    </div>
    <div class="right-middle">
      <div class="title">高危地区流入TOP5</div>
      <v-chart style="width:100%;height:100%" :options="rklrOptions" />
    </div>
    <div class="right-bottom">
      <div class="title">人员流动实时预警</div>
      <div class="list">
        <el-scrollbar style="height:100%;">
          <div
            class="item"
            v-for="(item, index) in rightBottomList"
            :key="index"
          >
            <div class="time">{{ item.time }}</div>
            <div class="detail">
              <el-image
                style="width:64px;height:64px"
                :src="item.imageUrl"
              ></el-image>
              <div class="info">
                <div class="thing">{{ item.thing }}</div>
                <div class="veh-name">{{ item.vehName }}</div>
                <div class="veh-address">{{ item.vehAddress }}</div>
              </div>
              <div class="icon"></div>
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
      rightTopTab: '落脚点',
      rightBottomList: [
        {
          time: '2020-10-28 17:24:23',
          warningLevel: '二级警报',
          imageUrl: require('@/assets/image/floatingPopulation/has-avatar.png'),
          thing: '7天内来自新疆人员同时入住xxx宾馆',
          vehName: '人脸微卡口',
          vehAddress: '南昌市高新区艾溪湖管理处xx宾馆'
        },
        {
          time: '2020-11-03 21:34:09',
          warningLevel: '二级警报',
          imageUrl: require('@/assets/image/floatingPopulation/has-avatar.png'),
          thing: '流动人口在东湖区XXX小区聚集',
          vehName: '人脸微卡口',
          vehAddress: '东湖区XXX小区'
        }
      ]
    }
  },
  computed: {
    ljdOptions() {
      return {
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
        grid: {
          top: '30%',
          height: '60%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              show: true,
              color: '#458CDD',
              rotate: 45
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
            },
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
            ]
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
            name: '数据',
            type: 'bar',
            barWidth: '50%',
            emphasis: {
              label: {
                show: true
              }
            },
            // 配置样式
            itemStyle: {
              // 通常情况下：
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 10, 10],
                // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function(params) {
                  var colorList = [
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
                  ]
                  return colorList[params.dataIndex]
                }
              },
              // 鼠标悬停时：
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            data: [87, 78, 89, 87, 78, 89, 87, 78, 89, 87, 78, 89]
          }
        ]
      }
    },
    jyqkOptions() {
      return {
        color: ['#3C9AFE', '#00FFFF', '#0056FF', '#E6B00E', '#AADAFF'],
        angleAxis: {
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        radiusAxis: {
          type: 'category',
          data: [
            '定向委托培养定向就业 5.07%',
            '公务员招考 7.05%',
            '事业单位招考 9.16%',
            '灵活就业 20.5%',
            '自主就业 58.22%'
          ],
          z: 10,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {
          center: ['20%', '50%'],
          radius: '250%'
        },
        series: [
          {
            type: 'bar',
            data: [5.07],
            coordinateSystem: 'polar',
            name: '定向委托培养定向就业 5.07%'
          },
          {
            type: 'bar',
            data: [7.05],
            coordinateSystem: 'polar',
            name: '公务员招考 7.05%'
          },
          {
            type: 'bar',
            data: [9.16],
            coordinateSystem: 'polar',
            name: '事业单位招考 9.16%'
          },
          {
            type: 'bar',
            data: [20.5],
            coordinateSystem: 'polar',
            name: '灵活就业 20.5%'
          },
          {
            type: 'bar',
            data: [58.22],
            coordinateSystem: 'polar',
            name: '自主就业 58.22%'
          }
        ],
        legend: {
          show: true,
          orient: 'vertical',
          right: 10,
          top: 80,
          data: [
            '定向委托培养定向就业 5.07%',
            '公务员招考 7.05%',
            '事业单位招考 9.16%',
            '灵活就业 20.5%',
            '自主就业 58.22%'
          ],
          textStyle: {
            color: '#7EBDFF',
            fontSize: 16
          },
          formatter: name => {
            return name
          }
        }
      }
    },
    rklrOptions() {
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
          top: '30%',
          width: '80%',
          height: '60%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD',
            interval: 0
            // rotate: -40
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
          data: ['新疆', '天津', '宁夏', '西藏', '安徽颍上']
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
            name: '人数',
            type: 'bar',
            barWidth: '60%',
            data: [2618, 385, 209, 66, 12],
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
    },
    famaleOptions() {
      return {
        tooltip: {
          trigger: 'axis',
          formatter: data => {
            return (
              data[0].name +
              '<br/> ' +
              data[0].seriesName +
              ':  ' +
              Math.abs(data[0].value)
            )
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['女'],
          textStyle: {
            color: '#fff'
          },
          top: 35,
          left: 135
        },
        grid: {
          left: '15%',
          right: '4%',
          bottom: -20,
          containLabel: true
        },
        xAxis: [
          {
            show: false,
            type: 'value'
          }
        ],
        yAxis: [
          {
            show: false,
            type: 'category',
            axisTick: {
              show: false
            },
            data: ['老年', '中年', '青年', '少年', '儿童'].reverse()
          }
        ],
        series: [
          {
            name: '女',
            type: 'bar',
            label: {
              show: true,
              position: 'left',
              textStyle: {
                color: '#A9DAFF'
              },
              formatter: ({ value }) => Math.abs(value)
            },
            barWidth: 15,
            itemStyle: {
              barBorderRadius: 40,
              color: {
                type: 'linear',
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(169, 218, 255, 0)'
                  },
                  {
                    offset: 1,
                    color: '#A9DAFF'
                  }
                ],
                global: false
              }
            },
            data: [-51476, -104186, -118757, -52475, -34794].reverse()
          }
        ]
      }
    },
    maleOptions() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['男'],
          textStyle: {
            color: '#fff'
          },
          left: 50,
          top: 35,
          align: 'left'
        },
        grid: {
          left: '3%',
          right: '20%',
          bottom: -20,
          containLabel: true
        },
        xAxis: [
          {
            show: false,
            type: 'value'
          }
        ],
        yAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#Fff', // 更改坐标轴文字颜色
              fontSize: 14 // 更改坐标轴文字大小
            }
          },
          data: ['老年', '中年', '青年', '少年', '儿童'].reverse()
        },
        series: [
          {
            name: '男',
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#A9DAFF'
              },
              formatter: ({ value }) => Math.abs(value)
            },
            barWidth: 15,
            itemStyle: {
              barBorderRadius: 40,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(128,244,231, 0)'
                  },
                  {
                    offset: 1,
                    color: '#80F4E7'
                  }
                ],
                global: false
              }
            },
            data: [52526, 109158, 126245, 60545, 38675].reverse()
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-right {
  .title {
    position: absolute;
    top: 12px;
    left: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #aadaff;
    line-height: 18px;
  }
  .right-top {
    position: relative;
    width: 420px;
    height: 275px;
    background: url('~@/assets/image/floatingPopulation/floatingPopulation-all.png')
      center center / 100% 100% no-repeat;
    .tab {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 999;
      span {
        cursor: pointer;
        display: inline-block;
        width: 80px;
        height: 30px;
        line-height: 30px;
        color: #7ebdff;
        text-align: center;
        background: #061222;
      }
      .selected-tab {
        color: #fff;
        background: #3498fb;
      }
    }
  }
  .right-middle {
    position: relative;
    width: 420px;
    height: 275px;
    background: url('~@/assets/image/floatingPopulation/floatingPopulation-all.png')
      center center / 100% 100% no-repeat;
  }
  .right-bottom {
    position: relative;
    width: 420px;
    height: 275px;
    background: url('~@/assets/image/floatingPopulation/floatingPopulation-all.png')
      center center / 100% 100% no-repeat;
    .list {
      width: 100%;
      height: 100%;
      padding-top: 50px;
      color: #fff;
      /deep/.el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
    .item {
      margin: 5px auto;
      width: 356px;
      height: 100%;
    }
    .time,
    .warning-level {
      display: inline-block;
    }
    .time {
      color: #00ffff;
      padding-right: 20px;
    }
    .warning-level {
      background: #ec6100;
      padding: 5px;
      border-radius: 20px;
    }
    .detail {
      width: 100%;
      height: 100%;
      margin-top: 5px;
      border: 1px solid #0c62a0;
    }
    .info {
      display: inline-block;
      padding: 5px 0 0 5px;
      vertical-align: top;
    }
  }
}
</style>
