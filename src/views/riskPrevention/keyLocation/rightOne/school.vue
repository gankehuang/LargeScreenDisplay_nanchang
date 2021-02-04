<template>
  <div class="info-block">
    <div class="block-title">
      <a
        href="http://172.118.210.201:9020/hdhw"
        target="_blank"
      >安全趋势</a>
    </div>
    <v-chart
      :options="expChaOption"
      class="exp-cha-chart"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      expChaOption: {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#00FFFF', '#3C9AFE'],
        legend: {
          data: ['安全指数', '预警事件'],
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
            name: '安全指数',
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
              2600
            ],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '预警事件',
            data: [
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
              1800
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
    z-index: 99;
    color: #7dbcff;
    font-weight: bold;

    a {
      display: inline-block;
      padding: 5px;
    }
  }
  .exp-cha-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
