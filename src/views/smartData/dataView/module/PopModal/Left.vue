<template>
  <div class="pop-modal-left">
    <div class="household-icon" />
    <div class="household-data">
      <v-chart
        :options="householdOptions"
        class="chart"
      />
    </div>

    <div class="oversea-icon" />
    <div class="oversea-data">
      <v-chart
        :options="overseaOptions"
        class="chart"
      />
    </div>

    <div class="important-people-data">
      <div class="important-people-title">
        重点人群
      </div>
      <v-chart
        :options="importantOptions"
        class="chart"
      />
    </div>
  </div>
</template>

<script>
const setOption = (title, axisData, itemNum, leftNum = 0) => {
  return {
    title: {
      text: title,
      right: 20,
      textStyle: {
        color: '#aadaff',
        fontSize: 16,
        lineHeight: 36
      }
    },
    grid: {
      // 直角坐标系内绘图网格
      left: '20',
      top: '50',
      right: '20',
      bottom: '0',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    yAxis: {
      type: 'category',
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        show: false
      },
      data: axisData
    },
    series: [
      {
        name: '%',
        type: 'bar',
        barWidth: 15,
        data: itemNum,
        label: {
          show: true,
          align: 'right',
          offset: [leftNum, -20],
          formatter: '{c}万',
          color: '#F2BD1B',
          fontSize: 15,
          fontWeight: 'bolder'
        },
        itemStyle: {
          normal: {
            barBorderRadius: 10,
            color: '#68E0CF'
          }
        },
        zlevel: 1
      },
      {
        name: '进度条背景',
        type: 'bar',
        barGap: '-100%',
        barWidth: 15,
        data: [1000],
        color: '#041234',
        itemStyle: {
          normal: {
            barBorderRadius: 10
          }
        }
      }
    ]
  }
}
export default {
  data () {
    return {
      householdOptions: setOption('户籍人口', ['评分条'], [684.48], -20),
      overseaOptions: setOption('海外人口', ['评分条'], [76.18], 50),
      importantOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '10%',
          top: '15%',
          bottom: '10%',
          height: '90%',
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
          data: [
            '失意人员',
            '社区矫正人员',
            '刑释解戒人员',
            '退役重点人员',
            '重点信访人员',
            '精神障碍患者'
          ]
        },
        series: [
          {
            name: '%',
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              formatter: '{b}'
            },
            barWidth: 15,
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: '#68E0CF'
              }
            },
            zlevel: 1,
            data: [
              {
                name: '60%',
                value: 211586
              },
              {
                name: '50%',
                value: 161586
              },
              {
                name: '30%',
                value: 451586
              },
              {
                name: '70%',
                value: 451586
              },
              {
                name: '20%',
                value: 161586
              },
              {
                name: '50%',
                value: 211586
              }
            ]
          },
          {
            name: '进度条背景',
            type: 'bar',
            label: {
              show: true,
              position: 'insideTopRight',
              formatter: '{@[4]}',
              color: '#68E0CF'
            },
            barGap: '-100%',
            barWidth: 15,
            data: [1000000, 1000000, 1000000, 1000000, 1000000, 1000000],
            color: '#041234',
            itemStyle: {
              normal: {
                barBorderRadius: 10
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-modal-left {
  position: absolute;
  top: 125px;
  left: 112px;
  width: 410px;
}
.chart {
  width: 100%;
  height: 100%;
}
.title {
  position: absolute;
  top: 13px;
  right: 29px;
  font-size: 16px;
  font-weight: bold;
  color: #a9daff;
}
.important-people-title {
  position: absolute;
  top: 268px;
  right: 320px;
  font-size: 16px;
  font-weight: bold;
  color: #a9daff;
}
.oversea-data-title {
  position: absolute;
  top: 142px;
  right: 29px;
  font-size: 16px;
  font-weight: bold;
  color: #a9daff;
}
.household-list {
  position: absolute;
  top: 50px;
  right: 210px;
  font-size: 18px;
  font-weight: bold;
  color: #f2bd1b;
}
.household-icon,
.oversea-icon {
  width: 109px;
  height: 109px;
  display: inline-block;
  margin: 0 9px 16px 0;
}
.household-data,
.oversea-data {
  display: inline-block;
  width: 292px;
  height: 106px;
  margin-bottom: 16px;
  background: url("~@/assets/image/dataView/left-item-top.png") center center /
    100% 100%;
}
.household-icon {
  background: url("~@/assets/image/dataView/left-item-frist-icon.png") center
    center / 100% 100%;
}
.oversea-icon {
  background: url("~@/assets/image/dataView/left-item-second-icon.png") center
    center / 100% 100%;
}
.important-people-data {
  width: 411px;
  height: 434px;
  background: url("~@/assets/image/dataView/left-bottom-bg.png") center center /
    100% 100%;
}
</style>
