<template>
  <div class="page-right">
    <div class="top">
      <div class="title">
        涉渔访情分类
      </div>
      <v-chart :options="topOptions" />
    </div>
    <div class="bottom">
      <div class="title">
        涉渔事件县区分布
      </div>
      <p class="pieces">
        单位:件
      </p>
      <v-chart :options="bottomOptions" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topOptions: {
        color: ['#2089d6', '#A9DAFF', '#E6B00E', '#3B9AFE', '#08b1b1'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          left: 'center',
          bottom: 80,
          textStyle: {
            color: '#A9DAFF'
          },
          data: ['渔民身份认定', '社保办理', '退捕政策落实', '承包补偿', '其他']
        },
        grid: {
          top: '10%',
          width: '80%',
          height: '70%',
          containLabel: true
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['20%', '50%'],
            center: ['50%', '35%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'right',
              formatter: '{b}\n{d}%'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 6, name: '渔民身份认定' },
              { value: 11, name: '社保办理' },
              { value: 13, name: '退捕政策落实' },
              { value: 4, name: '承包补偿' },
              { value: 2, name: '其他' }
            ]
          }
        ]
      },
      bottomOptions: {
        // color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '10%',
          width: '80%',
          height: '70%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#458CDD'
            // interval: 0,
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
          data: ['进贤县', '南昌县', '红谷滩区', '东湖区', '新建区', '新建区']
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
            name: '涉渔数量',
            type: 'bar',
            barWidth: '60%',
            data: [5, 2, 2, 1, 1, 1],
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
  }
}
</script>

<style lang="scss" scoped>
.top,
.bottom {
  width: 420px;
  height: 420px;
  background: url("~@/assets/image/keyWaters/left-top.png") center center / 100%
    100% no-repeat;
  .title {
    margin: 10px 0 20px 10px;
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
  }
}
.bottom {
  position: relative;
  .pieces {
    position: absolute;
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    top: 30px;
    right: 30px;
  }
}
</style>
