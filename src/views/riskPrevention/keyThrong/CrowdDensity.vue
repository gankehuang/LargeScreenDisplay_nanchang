<template>
  <div class="info-block">
    <div class="block-title">人流密度趋势</div>
    <v-chart :options="expChaOption" class="exp-cha-chart" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      expChaOption: {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#00FFFF'],
        grid: {
          width: '90%',
          height: '90%',
          left: '3%',
          right: '4%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#4E9CF4'
            }
          },
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: []
            }
          },
          data: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24'
          ]
        },
        yAxis: {
          type: 'value',
          min: 100,
          max: 5000,
          axisLabel: {
            textStyle: {
              color: '#4E9CF4'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#004968'
            }
          },
          axisTick: {
            length: 10
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['rgba(0,73,104,0.32)']
            }
          }
        },
        series: [
          {
            name: '人口密度趋势',
            data: [
              1000,
              1200,
              1400,
              1600,
              2000,
              2500,
              3000,
              4000,
              3500,
              2800,
              2500,
              2200,
              2000,
              1700,
              1400,
              1000,
              1300,
              1600,
              2000,
              2500,
              3000,
              3200,
              3400,
              3600
            ],
            type: 'line',
            symbol: 'none',
            smooth: true
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
  height: 48%;
  background: url("~@/assets/image/KeyThrong/earlyWarning-bg.png") no-repeat;
  background-size: 100% 100%;
  padding: 38px 15px 15px 15px;
  .block-title {
    position: absolute;
    top: 6px;
    font-size: 16px;
    color: #7dbcff;
    font-weight: bold;
  }
  .exp-cha-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
