<template>
  <InfoBlock
    title="社区矫正人员"
    height="555px"
  >
    <v-chart
      style="width:100%;height:100%"
      :options="districtOptions"
    />
  </InfoBlock>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    districtOptions () {
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
    }
  },

  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.mes {
  display: flex;
  margin: 0 25px;
  padding-top: 20px;
  background-size: 98px 63px;
  line-height: 34px;
  font-size: 16px;
  color: #aadaff;
  font-weight: bold;
  .count {
    display: flex;
    font-size: 16px;
    font-weight: bold;
    color: #a9daff;
    line-height: 18px;
  }
}
.num {
  padding-left: 20px;
  padding-right: 5px;
  font-size: 30px;
  font-weight: bold;
  color: #17fbff;
  line-height: 18px;
}
ul {
  padding-left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 33px;
}
li {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  .data {
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    font-weight: 400;
    color: #a9daff;
    .num-num {
      width: 25%;
      text-align: center;
      padding-top: 5px;
      font-size: 19px;
      font-weight: bold;
      color: #189aff;
      padding-left: 19px;
    }
  }
}
</style>
