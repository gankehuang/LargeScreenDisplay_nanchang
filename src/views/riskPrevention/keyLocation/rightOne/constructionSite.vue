<template>
  <div class="info-block">
    <div class="block-title">环境指数</div>
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
        color: ['#00FFFF', '#3C9AFE', '#E6B00E'],
        legend: {
          data: ['PM2.5', 'PM10', '噪声'],
          right: 0,
          top: 0,
          textStyle: {
            color: '#7EBDFF'
          }
        },
        grid: {
          width: '90%',
          height: '74%',
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '10%',
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
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
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
            name: 'PM2.5',
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
              2000
            ],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: 'PM10',
            data: [
              1300,
              1600,
              2000,
              2500,
              3000,
              2200,
              2000,
              1700,
              1400,
              1000,
              1600
            ],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '噪声',
            data: [
              3000,
              2200,
              2000,
              1700,
              1300,
              1600,
              2000,
              2500,
              1400,
              1000,
              1500
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
  height: 248px;
  background: url("~@/assets/image/keyLocation/rightOne.png") no-repeat;
  background-size: 100% 100%;
  padding: 10px 15px 15px 15px;
  .block-title {
    position: absolute;
    top: 10px;
    left: 45px;
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
