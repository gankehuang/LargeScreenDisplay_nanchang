<template>
  <div class="info-block">
    <div class="title">危险事件分析</div>
    <v-chart :options="useTypeOptions" class="echart" />
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          data: ['危险火源', '抽烟', '打电话']
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
            name: '危险事件分析',
            type: 'bar',
            barWidth: '20%',
            data: [416, 175, 156],
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
                    color: '#00FFFF'
                  },
                  {
                    offset: 1,
                    color: '#3C9AFE'
                  }
                ],
                global: false
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
}
</style>
