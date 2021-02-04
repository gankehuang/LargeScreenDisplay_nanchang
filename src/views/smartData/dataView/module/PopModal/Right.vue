<template>
  <div class="pop-modal-left">
    <div class="foreign-icon" />
    <div class="foreign-data">
      <v-chart
        :options="foreignOptions"
        class="chart"
      />
    </div>
    <div class="minority-people-data">
      <div class="minority-people-title">
        少数民族
      </div>
      <v-chart
        :options="importantOptions"
        class="chart"
      />
    </div>
    <div class="caring-people-data">
      <div class="caring-people-title">
        关爱人群
      </div>
      <div class="caring-people-list">
        <div class="children">
          儿童
          <div class="num">
            123322%
          </div>
        </div>
        <div class="charts">
          <RingPerChart
            :number="caringOptions.number"
            :total="caringOptions.total"
            :color="caringOptions.color"
            :style-obj="caringOptions.styleObj"
            :is-per-bool="false"
          />
        </div>
        <div class="old-people">
          老年人
          <div class="num">
            121232%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RingPerChart from '@/components/RingPerChart'
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
  components: {
    RingPerChart
  },
  data () {
    return {
      caringOptions: {
        label: '公交车在线数',
        number: 0,
        total: 0,
        color: '#3497fb',
        styleObj: {
          width: '78px',
          height: '78px',
          'background-image': `url(${require('@/assets/image/dataView/population-one.png')})`
        }
      },
      foreignOptions: setOption('外籍人口', ['评分条'], [220], 20),
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
          height: '80%',
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
          data: ['其他', '满族', '回族', '壮族', '维吾尔族']
        },
        series: [
          {
            name: '%',
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#A9DAFF'
              }
            },
            barWidth: 15,
            itemStyle: {
              normal: {
                barBorderRadius: 10,
                color: '#68E0CF'
              }
            },
            zlevel: 1,
            data: [231586, 341586, 451586, 161586, 211586]
          },
          {
            name: '进度条背景',
            type: 'bar',
            barGap: '-100%',
            barWidth: 15,
            data: [1000000, 1000000, 1000000, 1000000, 1000000],
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
  right: 112px;
  width: 410px;
}
.charts {
  width: 100%;
  height: 100%;
  margin-left: 80px;
  margin-top: -20px;
}
.caring-people-list {
  display: flex;
  justify-content: space-between;
  top: 100px;
  position: relative;
  font-size: 16px;
  font-weight: bold;
  color: #a9daff;
  padding: 0 20px;
}
.minority-people-title {
  position: absolute;
  top: 145px;
  right: 320px;
  font-size: 16px;
  font-weight: bold;
  color: #a9daff;
}
.caring-people-title {
  position: absolute;
  top: 495px;
  right: 320px;
  font-size: 16px;
  font-weight: bold;
  color: #a9daff;
}
.foreign-icon {
  width: 109px;
  height: 109px;
  display: inline-block;
  margin: 0 9px 16px 0;
  background: url("~@/assets/image/dataView/right-top-icon.png") center center /
    100% 100%;
}
.foreign-data {
  display: inline-block;
  width: 292px;
  height: 106px;
  margin-bottom: 16px;
  background: url("~@/assets/image/dataView/left-item-top.png") center center /
    100% 100%;
}
.minority-people-data {
  width: 410px;
  height: 337px;
  margin-bottom: 19px;
  background: url("~@/assets/image/dataView/right-middle-bg.png") center center /
    100% 100%;
}
.caring-people-data {
  width: 410px;
  height: 210px;
  margin-bottom: 20px;
  background: url("~@/assets/image/dataView/left-bottom-bg.png") center center /
    100% 100%;
}
</style>
