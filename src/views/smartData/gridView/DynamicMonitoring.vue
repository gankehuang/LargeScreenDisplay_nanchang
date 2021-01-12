<template>
  <div class="block-box">
    <div class="box-title">
      动态监测
    </div>
    <div class="small-title">在线率</div>
    <div class="chart-box">
      <RingPerChart
        v-for="(item, index) in chartList"
        :number="item.number"
        :total="item.total"
        :name="item.name"
        :key="index"
        :color="item.color"
        :styleObj="item.styleObj"
        :radius="['85%', '100%']"
        :label="item.label"
      >
      </RingPerChart>
    </div>

    <div class="small-title">
      实时抓拍
    </div>

    <div class="capture-box">
      <v-chart :options="captureData" />
    </div>
  </div>
</template>

<script>
import RingPerChart from '@/components/RingPerChart'
import echarts from 'vue-echarts'
export default {
  components: {
    RingPerChart
  },
  data() {
    return {
      chartList: [
        {
          name: '天网',
          number: 18,
          total: 100,
          color: '#189AFF',
          label: {
            show: true,
            formatter: ['{percentage|{b}}', '{typeName|{a}}'].join('\n'),
            rich: {
              percentage: {
                fontSize: 18,
                color: '#189AFF'
              },
              typeName: {
                fontSize: 14,
                color: '#fff'
              }
            },
            lineHeight: 24,
            position: 'center'
          },
          styleObj: {
            width: '113px',
            height: '113px',
            backgroundImage:
              'url(' + require('@/assets/image/gridView/monitor-01.png') + ')'
          }
        },
        {
          name: '地网',
          number: 35,
          total: 100,
          color: '#80F4E7',
          label: {
            show: true,
            formatter: ['{percentage|{b}}', '{typeName|{a}}'].join('\n'),
            rich: {
              percentage: {
                fontSize: 18,
                color: '#80F4E7',
                fontWeight: 'bold'
              },
              typeName: {
                fontSize: 14,
                color: '#fff',
                fontWeight: 'bold'
              }
            },
            lineHeight: 23,
            position: 'center'
          },
          styleObj: {
            width: '113px',
            height: '113px',
            backgroundImage:
              'url(' + require('@/assets/image/gridView/monitor-01.png') + ')'
          }
        },
        {
          name: '社会资源',
          number: 23,
          total: 100,
          color: '#E4AF0F',
          label: {
            show: true,
            formatter: ['{percentage|{b}}', '{typeName|{a}}'].join('\n'),
            rich: {
              percentage: {
                fontSize: 18,
                color: '#E4AF0F',
                fontWeight: 'bold'
              },
              typeName: {
                fontSize: 14,
                color: '#fff',
                fontWeight: 'bold'
              }
            },
            lineHeight: 23,
            position: 'center'
          },
          styleObj: {
            width: '113px',
            height: '113px',
            backgroundImage:
              'url(' + require('@/assets/image/gridView/monitor-01.png') + ')'
          }
        },
        {
          name: '智慧云眼',
          number: 16,
          total: 100,
          color: '#A5D6FC',
          label: {
            show: true,
            formatter: ['{percentage|{b}}', '{typeName|{a}}'].join('\n'),
            rich: {
              percentage: {
                fontSize: 18,
                color: '#A5D6FC',
                fontWeight: 'bold'
              },
              typeName: {
                fontSize: 14,
                color: '#fff',
                fontWeight: 'bold'
              }
            },
            lineHeight: 23,
            position: 'center'
          },
          styleObj: {
            width: '113px',
            height: '113px',
            backgroundImage:
              'url(' + require('@/assets/image/gridView/monitor-01.png') + ')'
          }
        }
      ]
    }
  },
  created() {},
  computed: {
    captureData() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          show: false
        },
        grid: {
          left: '5%',
          top: 0,
          width: '70%',
          height: '100%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: ['人脸', '车辆'],
            splitLine: { show: false },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            offset: 10,
            nameTextStyle: {
              fontSize: 15
            },
            axisLabel: {
              color: '#fff'
            }
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            data: [10, 20],
            barWidth: 12,
            itemStyle: {
              emphasis: {
                barBorderRadius: 7
              },
              normal: {
                label: {
                  formatter: '{c}',
                  show: true,
                  position: 'right',
                  textStyle: {
                    fontWeight: 'bolder',
                    fontSize: '12',
                    color: '#fff'
                  }
                },
                barBorderRadius: 7,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#3977E6' },
                  { offset: 1, color: '#37BBF8' }
                ])
              }
            }
          }
        ]
      }
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.block-box {
  position: relative;
  width: 420px;
  height: 490px;
  background: url("~@/assets/image/gridView/left-block-bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 50px 10px 10px 10px;
  .box-title {
    position: absolute;
    left: 20px;
    top: 15px;
    font-size: 16px;
    color: #7dbcff;
    font-weight: 600;
  }

  .chart-box {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 60px;

    & > div {
      flex: 0 0 50%;
      margin-bottom: 20px;
    }
  }

  .small-title {
    padding-left: 20px;
    color: #7dbcff;
    font-size: 16px;
  }

  .capture-box {
    width: 100%;
    height: 100px;
  }
}
</style>
