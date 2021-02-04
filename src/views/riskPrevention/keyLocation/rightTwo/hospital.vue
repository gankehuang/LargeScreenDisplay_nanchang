<template>
  <div class="info-block">
    <div class="title">
      医疗安全隐患
    </div>
    <div class="drop">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ level }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="width: 109px;text-align: center;line-height: 36px;background:#00225C;border-radius: 6px;border: 1px solid #559AF6;"
        >
          <el-dropdown-item
            v-for="(item, index) in levelList"
            :key="index"
            @click.native="tabLevel(item)"
          >
            {{ item }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <v-chart
      :options="useTypeOptions"
      class="echart"
    />
  </div>
</template>

<script>
import echarts from 'vue-echarts'
export default {
  data () {
    return {
      level: '本日',
      levelList: ['本日', '本周', '本月', '本季度'],
      useTypeOptions: {
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '28%',
          left: '4%',
          width: '90%',
          height: '70%',
          containLabel: true
        },
        legend: {
          data: ['总数', '未整治'],
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          },
          top: '15%',
          right: '40%'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD',
            interval: 0,
            formatter: function (value) {
              let valueTxt = ''
              if (value.length > 3) {
                valueTxt = value.substring(0, 4) + '...'
              } else {
                valueTxt = value
              }
              return valueTxt
            }
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
          data: [
            '医疗事故',
            '重大纠纷',
            '治安防控(重点人员出现、精神病、信访人员等)'
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
            name: '未整治',
            type: 'bar',
            barWidth: '35%',
            data: [12, 10, 9],
            stack: '堆叠',
            label: {
              show: true,
              position: 'inside',
              color: '#000'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 1, color: '#2E78FF' },
                { offset: 0, color: '#3B9AFE' }
              ])
            }
          },
          {
            name: '总数',
            type: 'bar',
            barWidth: '35%',
            data: [2620, 1500, 780],
            stack: '堆叠',
            label: {
              show: true,
              position: 'inside',
              color: '#000'
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#4FC7FF' },
                { offset: 1, color: '#68E0CF' }
              ])
            }
          }
        ]
      }
    }
  },
  methods: {
    tabLevel (item) {
      this.level = item
      switch (this.level) {
        case '本日':
          this.useTypeOptions = {
            // color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              top: '28%',
              left: '4%',
              width: '90%',
              height: '70%',
              containLabel: true
            },
            legend: {
              data: ['总数', '未整治'],
              itemWidth: 8,
              itemHeight: 8,
              icon: 'circle',
              textStyle: {
                color: '#A9DAFF',
                fontSize: 14
              },
              top: '15%',
              right: '40%'
            },
            xAxis: {
              type: 'category',
              axisLabel: {
                color: '#458CDD',
                interval: 0,
                formatter: function (value) {
                  let valueTxt = ''
                  if (value.length > 3) {
                    valueTxt = value.substring(0, 4) + '...'
                  } else {
                    valueTxt = value
                  }
                  return valueTxt
                }
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
              data: [
                '医疗事故',
                '重大纠纷',
                '治安防控(重点人员出现、精神病、信访人员等)'
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
                name: '未整治',
                type: 'bar',
                barWidth: '35%',
                data: [22, 18, 13],
                stack: '堆叠',
                label: {
                  show: true,
                  position: 'inside',
                  color: '#000'
                },
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 1, color: '#2E78FF' },
                    { offset: 0, color: '#3B9AFE' }
                  ])
                }
              },
              {
                name: '总数',
                type: 'bar',
                barWidth: '35%',
                data: [2620, 1500, 608],
                stack: '堆叠',
                label: {
                  show: true,
                  position: 'inside',
                  color: '#000'
                },
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#4FC7FF' },
                    { offset: 1, color: '#68E0CF' }
                  ])
                }
              }
            ]
          }
          break
        case '本周':
          this.useTypeOptions = {
            // color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              top: '28%',
              left: '4%',
              width: '90%',
              height: '70%',
              containLabel: true
            },
            legend: {
              data: ['总数', '未整治'],
              itemWidth: 8,
              itemHeight: 8,
              icon: 'circle',
              textStyle: {
                color: '#A9DAFF',
                fontSize: 14
              },
              top: '15%',
              right: '40%'
            },
            xAxis: {
              type: 'category',
              axisLabel: {
                color: '#458CDD',
                interval: 0,
                formatter: function (value) {
                  let valueTxt = ''
                  if (value.length > 3) {
                    valueTxt = value.substring(0, 4) + '...'
                  } else {
                    valueTxt = value
                  }
                  return valueTxt
                }
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
              data: [
                '医疗事故',
                '重大纠纷',
                '治安防控(重点人员出现、精神病、信访人员等)'
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
                name: '未整治',
                type: 'bar',
                barWidth: '35%',
                data: [23, 15, 11],
                stack: '堆叠',
                label: {
                  show: true,
                  position: 'inside',
                  color: '#000'
                },
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 1, color: '#2E78FF' },
                    { offset: 0, color: '#3B9AFE' }
                  ])
                }
              },
              {
                name: '总数',
                type: 'bar',
                barWidth: '35%',
                data: [4608, 3500, 2620],
                stack: '堆叠',
                label: {
                  show: true,
                  position: 'inside',
                  color: '#000'
                },
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#4FC7FF' },
                    { offset: 1, color: '#68E0CF' }
                  ])
                }
              }
            ]
          }
          break
        case '本月':
          this.useTypeOptions = {
            // color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              top: '28%',
              left: '4%',
              width: '90%',
              height: '70%',
              containLabel: true
            },
            legend: {
              data: ['总数', '未整治'],
              itemWidth: 8,
              itemHeight: 8,
              icon: 'circle',
              textStyle: {
                color: '#A9DAFF',
                fontSize: 14
              },
              top: '15%',
              right: '40%'
            },
            xAxis: {
              type: 'category',
              axisLabel: {
                color: '#458CDD',
                interval: 0,
                formatter: function (value) {
                  let valueTxt = ''
                  if (value.length > 3) {
                    valueTxt = value.substring(0, 4) + '...'
                  } else {
                    valueTxt = value
                  }
                  return valueTxt
                }
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
              data: [
                '医疗事故',
                '重大纠纷',
                '治安防控(重点人员出现、精神病、信访人员等)'
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
                name: '未整治',
                type: 'bar',
                barWidth: '35%',
                data: [13, 8, 7],
                stack: '堆叠',
                label: {
                  show: true,
                  position: 'inside',
                  color: '#000'
                },
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 1, color: '#2E78FF' },
                    { offset: 0, color: '#3B9AFE' }
                  ])
                }
              },
              {
                name: '总数',
                type: 'bar',
                barWidth: '35%',
                data: [7608, 6500, 5620],
                stack: '堆叠',
                label: {
                  show: true,
                  position: 'inside',
                  color: '#000'
                },
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#4FC7FF' },
                    { offset: 1, color: '#68E0CF' }
                  ])
                }
              }
            ]
          }
          break
        default:
          this.useTypeOptions = {
            // color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              top: '28%',
              left: '4%',
              width: '90%',
              height: '70%',
              containLabel: true
            },
            legend: {
              data: ['总数', '未整治'],
              itemWidth: 8,
              itemHeight: 8,
              icon: 'circle',
              textStyle: {
                color: '#A9DAFF',
                fontSize: 14
              },
              top: '15%',
              right: '40%'
            },
            xAxis: {
              type: 'category',
              axisLabel: {
                color: '#458CDD',
                interval: 0,
                formatter: function (value) {
                  let valueTxt = ''
                  if (value.length > 3) {
                    valueTxt = value.substring(0, 4) + '...'
                  } else {
                    valueTxt = value
                  }
                  return valueTxt
                }
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
              data: [
                '医疗事故',
                '重大纠纷',
                '治安防控(重点人员出现、精神病、信访人员等)'
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
                name: '未整治',
                type: 'bar',
                barWidth: '35%',
                data: [16, 15, 5],
                stack: '堆叠',
                label: {
                  show: true,
                  position: 'inside',
                  color: '#000'
                },
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 1, color: '#2E78FF' },
                    { offset: 0, color: '#3B9AFE' }
                  ])
                }
              },
              {
                name: '总数',
                type: 'bar',
                barWidth: '35%',
                data: [41608, 17500, 15620],
                stack: '堆叠',
                label: {
                  show: true,
                  position: 'inside',
                  color: '#000'
                },
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: '#4FC7FF' },
                    { offset: 1, color: '#68E0CF' }
                  ])
                }
              }
            ]
          }
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-block {
  position: relative;
  width: 420px;
  height: 230px;
  background: url("~@/assets/image/keyLocation/rightTwo.png") no-repeat;
  background-size: 100% 100%;
  padding: 10px 15px 15px 15px;
  .title {
    position: absolute;
    top: 10px;
    left: 40px;
    z-index: 99;
    color: #7dbcff;
    font-weight: bold;
    font-size: 16px;
  }
  .echart {
    width: 100%;
    height: 100%;
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
