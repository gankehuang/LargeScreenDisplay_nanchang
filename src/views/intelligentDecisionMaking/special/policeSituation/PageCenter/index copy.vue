<template>
  <div class="police-stiuation-center">
    <div class="title" />
    <div class="title">
      警情环比同比
    </div>
    <div class="drop">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ area }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="width: 110px;
    text-align: center;
     background: #559AF6 url('~@/assets/image/policeSituation/button-bg.png')no-repeat center;
    background-size: 100% 100%;
    border: 0;"
        >
          <el-dropdown-item
            v-for="(item, index) in areaList"
            :key="index"
            @click.native="areaClick(item)"
          >
            {{ item }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ time }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="width: 110px;
    text-align: center;
     background: #559AF6 url('~@/assets/image/policeSituation/button-bg.png')no-repeat center;
    background-size: 100% 100%;
    border: 0;"
        >
          <el-dropdown-item
            v-for="(item, index) in timeList"
            :key="index"
            @click.native="timeclick(item)"
          >
            {{ item }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ kind }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="width: 110px;
    text-align: center;
     background: #559AF6 url('~@/assets/image/policeSituation/button-bg.png')no-repeat center;
    background-size: 100% 100%;
    border: 0;"
        >
          <el-dropdown-item
            v-for="(item, index) in kindList"
            :key="index"
            @click.native="kindClick(item)"
          >
            {{ item }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <v-chart
      v-if="isShow"
      :options="amountOptions"
      class="echarts"
    />
  </div>
</template>

<script>
import { alertDate } from '@/api/intelligentDecisionMaking/special'
export default {
  data () {
    return {
      amountOptions: {
        grid: {
          left: '8%',
          right: 20,
          bottom: '15%',
          top: '5%',
          height: '55%'
          //     containLabel: true,
        },
        legend: [
          {
            data: ['2020', '2019'],
            // itemWidth: 12,
            // itemHeight: 12,
            icon: 'line',
            textStyle: {
              color: '#99C1FE',
              fontSize: 14
            },
            top: '0',
            left: '26%'
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
            left: '8%'
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
            data: [118, 228, 312, 238, 178, 118, 128, 312, 138, 178, 412, 338],
            smooth: true,
            emphasis: {
              label: {
                show: false
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
            data: [88, 128, 212, 138, 278, 378, 218, 122, 298, 118, 212, 308],
            smooth: true,
            emphasis: {
              label: {
                show: false
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
            data: [],
            itemStyle: {
              normal: {
                color: '#F7563C'
              }
            }
          },
          {
            name: '同比下降',
            type: 'line',
            data: [],
            itemStyle: {
              normal: {
                color: '#0EE0A8'
              }
            }
          },
          {
            name: '同比上升',
            type: 'line',
            data: [
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
            ],
            itemStyle: {
              normal: {
                color: '#F7563C'
              }
            }
          }

        ]
      },
      area: '市县',
      areaList: [
        '南昌县',
        '进贤县',
        '安义县',
        '东湖区',
        '西湖区',
        '青云谱区',
        '湾里局',
        '青山湖区',
        '新建区',
        '高新区',
        '经开区',
        '红谷滩区'
      ],
      time: '2020',
      timeList: ['2020', '2019', '2018', '2017', '2016'],
      kind: '全部',
      kindList: [
        '行政(治安)',
        '刑事案件',
        '举报',
        '救助',
        '交通类警情',
        '诈骗',
        '盗窃',
        '抢劫',
        '抢夺',
        '涉黄',
        '涉赌',
        '金融诈骗',
        '其他'
      ],
      areaData: '',
      kindData: '',
      isShow: true,
      chartTime: [],
      chartData: [],
      chartData1: [],
      chartData2: []
    }
  },
  created () {
    this.alertDate()
  },
  methods: {
    areaClick (item) {
      this.area = item
      this.alertDate()
    },
    kindClick (item) {
      this.kind = item
      this.alertDate()
    },
    timeclick (item) {
      this.time = item
      this.alertDate()
    },
    traverseFun (data) {
      const arrayList = []
      for (let i = 0; i < data.length; i++) {
        arrayList.push(parseInt(data[i].value))
      }
      return arrayList
    },
    alertDate () {
      switch (this.area) {
        case '南昌县':
          this.areaData = '360121'
          break
        case '进贤县':
          this.areaData = '360124'
          break
        case ' 安义县':
          this.areaData = '360123'
          break
        case '东湖区':
          this.areaData = '360102'
          break
        case '西湖区':
          this.areaData = '360103'
          break
        case '青云谱区':
          this.areaData = '360104'
          break
        case '湾里管理局':
          this.areaData = '360105'
          break
        case '青山湖区':
          this.areaData = '360111'
          break
        case '新建区':
          this.areaData = '360122'
          break
        case '高新区':
          this.areaData = '360107'
          break
        case '经开区':
          this.areaData = '360125'
          break
        case '红谷滩新区':
          this.areaData = '360106'
          break
        default:
          this.areaData = ''
      }
      switch (this.kind) {
        case '行政(治安)':
          this.kindData = 'pa_val1'
          break
        case '刑事案件':
          this.kindData = 'pa_val2'
          break
        case '举报':
          this.kindData = 'pa_val4'
          break
        case '救助':
          this.kindData = 'pa_val5'
          break
        case '交通类警情':
          this.kindData = 'pa_val6'
          break
        case '诈骗':
          this.kindData = 'pa_val7'
          break
        case '盗窃':
          this.kindData = 'pa_val8'
          break
        case '抢劫':
          this.kindData = 'pa_val9'
          break
        case '抢夺':
          this.kindData = 'pa_val10'
          break
        case '涉黄':
          this.kindData = 'pa_val11'
          break
        case '涉赌':
          this.kindData = 'pa_val12'
          break
        case '涉毒':
          this.kindData = 'pa_val13'
          break
        case '金融诈骗':
          this.kindData = 'pa_val14'
          break
        case '其他':
          this.kindData = 'pa_val13'
          break
        default:
          this.kindData = ''
      }
      const objects = {
        date: this.time,
        orgCode: this.areaData,
        type: this.kindData
      }
      this.isShow = false
      this.$nextTick(() => {
        this.chartData = []
        alertDate(objects).then(res => {
          if (res.status === 200) {
            this.isShow = true
            this.chartTime = Object.keys(res.data)
            this.amountOptions.legend[0].data = this.chartTime
            this.amountOptions.series[0].name = this.chartTime[0]
            this.amountOptions.series[1].name = this.chartTime[1]
            for (var i in res.data) {
              this.chartData.push(res.data[i])
            }
            this.chartData1 = this.chartData[0]
            this.chartData2 = this.chartData[1]
            this.amountOptions.series[0].data = this.traverseFun(
              this.chartData1
            )
            this.amountOptions.series[1].data = this.traverseFun(
              this.chartData2
            )
            this.amountOptions.series[2].data = []
            this.amountOptions.series[3].data = []
            if (
              parseInt(this.chartData2[1].value) -
                parseInt(this.chartData1[1].value) >
              0
            ) {
              this.amountOptions.series[2].data = [
                ['2月', parseInt(this.chartData1[1].value)],
                ['2月', parseInt(this.chartData2[1].value)]
              ]
              this.amountOptions.series[4].data = [
                ['1月', parseInt(this.chartData1[0].value)],
                ['1月', parseInt(this.chartData2[0].value)]
              ]
              this.amountOptions.series[5].data = [
                ['3月', parseInt(this.chartData1[2].value)],
                ['3月', parseInt(this.chartData2[2].value)]
              ]
              this.amountOptions.series[6].data = [
                ['4月', parseInt(this.chartData1[3].value)],
                ['4月', parseInt(this.chartData2[3].value)]
              ]
              this.amountOptions.series[7].data = [
                ['7月', parseInt(this.chartData1[6].value)],
                ['7月', parseInt(this.chartData2[6].value)]
              ]
              this.amountOptions.series[3].data = [
                ['8月', parseInt(this.chartData1[7].value)],
                ['8月', parseInt(this.chartData2[7].value)]
              ]
            } else {
              this.amountOptions.series[3].data = [
                ['2月', parseInt(this.chartData1[1].value)],
                ['2月', parseInt(this.chartData2[1].value)]
              ]
            }
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.police-stiuation-center {
  position: absolute;
  left: 50%;
  margin-left: -508px;
  bottom: 24px;
  width: 1017px;
  height: 186px;
  background: url("~@/assets/image/policeSituation/center-bottom-bg.png") center
    center / 100% 100% no-repeat;
  .title {
    line-height: 40px;
    font-size: 16px;
    color: #7dbcff;
    margin-left: 29px;
    font-weight: bold;
  }
  .drop {
    position: absolute;
    right: 30px;
    top: 20px;
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
    background: url("~@/assets/image/policeSituation/button-bg.png") no-repeat
      center;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>
<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow: auto;
}
</style>
