<template>
  <div class="page-left">
    <div class="left-top">
      <div class="title">
        流动人口县区分布图
      </div>
      <v-chart
        style="width:100%;height:100%"
        :options="rkfbOptions"
      />
    </div>
    <div class="left-bottom">
      <div class="title">
        流动人口流入趋势分析
      </div>
      <v-chart
        style="width:100%;height:100%"
        :options="rklrfxOptions"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    rkfbOptions () {
      return {
        color: ['#3288E4', '#02FBFF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: false,
          // data: ['登记流动人口', '流入人口'],
          data: ['流入人口'],
          top: 30,
          right: 10,
          textStyle: {
            color: '#02DCE5'
          }
        },
        grid: {
          width: '90%',
          left: '2%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
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
          }
        },
        yAxis: {
          type: 'category',
          data: [
            '青山湖区',
            '经开区',
            '西湖区',
            '高新区',
            '青云谱区',
            '东湖区',
            '南昌县',
            '红谷滩区',
            '进贤县',
            '安义县',
            '新建区',
            '湾里局'
          ].reverse(),
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
            name: '流入人口',
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#fff'
              }
            },
            barWidth: 20,
            itemStyle: {
              // 柱形图圆角，初始化效果
              // barBorderRadius: [10, 10, 10, 10],
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
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
            },
            data: [
              219985,
              122340,
              97814,
              83192,
              64401,
              49961,
              33089,
              23260,
              20857,
              14921,
              13464,
              5553
            ].reverse()
          }
        ]
      }
    },
    rklrfxOptions () {
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
        // legend: {
        //   data: ['流出人口', '流入人口'],
        //   top: 30,
        //   right: 10,
        //   textStyle: {
        //     color: '#02DCE5'
        //   }
        // },
        series: [
          {
            name: '流出人口',
            data: [
              15828,
              16286,
              15656,
              14026,
              16632,
              21458,
              22645,
              23713,
              24067,
              16666,
              16556
            ],
            type: 'line',
            smooth: true,
            symbol: 'none',
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
          // {
          //   name: '流入人口',
          //   smooth: true,
          //   symbol: 'none',
          //   data: [
          //     200,
          //     332,
          //     401,
          //     534,
          //     790,
          //     430,
          //     520,
          //     200,
          //     332,
          //     401,
          //     534,
          //     790
          //   ].reverse(),
          //   type: 'line',
          //   lineStyle: {
          //     color: '#E6B00E'
          //   },
          //   areaStyle: {
          //     color: {
          //       type: 'linear',
          //       x: 0,
          //       y: 0,
          //       x2: 0,
          //       y2: 1,
          //       colorStops: [
          //         {
          //           offset: 0,
          //           color: '#E6B00E'
          //         },
          //         {
          //           offset: 1,
          //           color: 'rgba(230,176,14,.1)'
          //         }
          //       ],
          //       global: false
          //     }
          //   }
          // }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-left {
  .title {
    position: absolute;
    top: 12px;
    left: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #aadaff;
    line-height: 18px;
  }
  .left-top {
    position: relative;
    width: 420px;
    height: 555px;
    background: url("~@/assets/image/floatingPopulation/floatingPopulation-left-top.png")
      center center / 100% 100% no-repeat;
  }
  .left-bottom {
    position: relative;
    width: 420px;
    height: 275px;
    background: url("~@/assets/image/floatingPopulation/floatingPopulation-all.png")
      center center / 100% 100% no-repeat;
  }
}
</style>
