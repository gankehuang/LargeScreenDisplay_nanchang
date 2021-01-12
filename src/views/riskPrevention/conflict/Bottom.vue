<template>
  <div class="police-stiuation-center">
    <div class="title"></div>
    <div class="title">
      矛盾纠纷同环比
    </div>
    <v-chart :options="amountOptions" class="echarts" v-if="isShow" />
  </div>
</template>

<script>
// import { alertDate } from '@/api/intelligentDecisionMaking/special'
export default {
  data() {
    return {
      amountOptions: {
        grid: {
          left: '8%',
          right: 20,
          bottom: '10%',
          top: '5%',
          height: '55%'
          //     containLabel: true,
        },
        legend: [
          {
            data: ['2019', '2020'],
            // itemWidth: 12,
            // itemHeight: 12,
            icon: 'line',
            textStyle: {
              color: '#99C1FE',
              fontSize: 14
            },
            top: '0',
            right: '26%'
          },
          {
            data: ['同比上升', '同比下降'],
            // itemWidth: 12,
            // itemHeight: 12,
            icon: 'circle',
            textStyle: {
              color: '#99C1FE',
              fontSize: 14
            },
            top: '0',
            right: '8%'
          }
        ],
        xAxis: [
          {
            type: 'category',
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
            ],
            axisLabel: {
              show: true,
              color: '#ffffff'
            },
            axisLine: {
              show: true,
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
              color: '#A9DAFF'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.7)']
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(0, 73, 104, 0.7)'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '2020',
            type: 'line',
            barWidth: '30px',
            data: [118, 228, 312, 238, 178, 118, 128, 312, 138, 178, 212],
            smooth: true,
            emphasis: {
              label: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: false, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#ffffff',
                    fontSize: 12
                  }
                },
                color: '#DEB13F'
              }
            }
          },
          {
            name: '2019',
            type: 'line',
            barWidth: '30px',
            data: [108, 128, 212, 138, 278, 378, 218, 122, 298, 118, 212],
            smooth: true,
            emphasis: {
              label: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: false, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#ffffff',
                    fontSize: 12
                  }
                },
                color: '#559AF6'
              }
            }
          },
          {
            name: '同比上升',
            type: 'line',
            data: [
              ['2月', 128],
              ['2月', 228]
            ],
            itemStyle: {
              normal: {
                color: '#F7563C'
              }
            }
          },
          {
            name: '同比上升',
            type: 'line',
            data: [
              ['3月', 212],
              ['3月', 312]
            ],
            itemStyle: {
              normal: {
                color: '#F7563C'
              }
            }
          },
          {
            name: '同比上升',
            type: 'line',
            data: [
              ['4月', 238],
              ['4月', 138]
            ],
            itemStyle: {
              normal: {
                color: '#F7563C'
              }
            }
          },
          {
            name: '同比上升',
            type: 'line',
            data: [
              ['8月', 312],
              ['8月', 122]
            ],
            itemStyle: {
              normal: {
                color: '#F7563C'
              }
            }
          },
            {
            name: '同比上升',
            type: 'line',
            data: [
              ['10月', 178],
              ['10月', 118]
            ],
            itemStyle: {
              normal: {
                color: '#F7563C'
              }
            }
          },
          {
            name: '同比下降',
            type: 'line',
            data: [
              ['5月', 178],
              ['5月', 278]
            ],
            itemStyle: {
              normal: {
                color: '#0EE0A8'
              }
            }
          },
          {
            name: '同比下降',
            type: 'line',
            data: [
              ['9月', 138],
              ['9月', 298]
            ],
            itemStyle: {
              normal: {
                color: '#0EE0A8'
              }
            }
          },
          {
            name: '同比下降',
            type: 'line',
            data: [
              ['6月', 118],
              ['6月', 378]
            ],
            itemStyle: {
              normal: {
                color: '#0EE0A8'
              }
            }
          },
          {
            name: '同比下降',
            type: 'line',
            data: [
              ['7月', 128],
              ['7月', 218]
            ],
            itemStyle: {
              normal: {
                color: '#0EE0A8'
              }
            }
          }
        ]
      },
      time: '2020',
      // timeList: ['2020', '2019', '2018', '2017', '2016'],
      isShow: true
    }
  },
  methods: {},
  created() {
    // this.alertDate()
  }
}
</script>

<style lang="scss" scoped>
.police-stiuation-center {
  position: absolute;
  left: 50%;
  margin-left: -508px;
  bottom: 16px;
  width: 1017px;
  height: 186px;
  background: url("~@/assets/image/policeSituation/center-bottom-bg.png") center
    center / 100% 100% no-repeat;
  .title {
    line-height: 40px;
    font-size: 16px;
    color: #7dbcff;
    margin-left: 20px;
    font-weight: bold;
  }
}
</style>
<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow: auto;
}
</style>
