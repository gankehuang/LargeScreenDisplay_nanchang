<template>
  <div class="page-left">
    <div class="top-list">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="item"
        @click="open(index)"
      >
        <svg-icon
          icon-class="menu"
          class="icon"
        />
        <div
          class="card-before"
          :class="
            selectedItems.includes(index)
              ? 'card-before-reverse'
              : 'card-before-normal'
          "
        >
          <v-chart
            :options="item.options"
            class="chart"
          />
        </div>
        <div
          class="card-after"
          :class="
            selectedItems.includes(index)
              ? 'card-after-reverse'
              : 'card-after-normal'
          "
        >
          <div class="title">
            {{ item.title }}
          </div>
          <el-image
            :src="
              item.arrder === 'up'
                ? require('@/assets/image/comprehensive/up-arrow.png')
                : require('@/assets/image/comprehensive/down-arrow.png')
            "
            style="width:10px;height:20px;vertical-align:middle"
          />
          <div class="info">
            <span>{{ item.labelOne }}</span>
            <span>{{ item.dataOne }}</span>
          </div>
          <div class="info">
            <span>{{ item.labelTwo }}</span>
            <span>{{ item.dataTwo }}</span>
          </div>
          <div class="ellipsis">
            ...
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-card">
      <div class="title">
        指数变化趋势
      </div>
      <v-chart
        :options="expChaOption"
        class="exp-cha-chart"
      />
    </div>
  </div>
</template>

<script>
// import { monthData } from '../mock'
const setOption = (title, axisData, itemNum) => {
  return {
    title: {
      text: title,
      left: 'center',
      textStyle: {
        color: '#aadaff',
        fontSize: 18,
        align: 'center',
        lineHeight: 66
      }
    },
    grid: {
      // 直角坐标系内绘图网格
      left: '0',
      top: '70',
      right: '0',
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
        barWidth: 10,
        data: itemNum,
        label: {
          show: true,
          align: 'center',
          offset: [70, -20],
          formatter: function (value) {
            if (value.value === 0) {
              return '-'
            } else {
              return value.value
            }
          },
          color: '#aadaff',
          fontSize: 30,
          fontWeight: 'bolder'
        },
        itemStyle: {
          normal: {
            barBorderRadius: 20,
            color: '#1164BD'
          }
        },
        zlevel: 1
      },
      {
        name: '进度条背景',
        type: 'bar',
        barGap: '-100%',
        barWidth: 10,
        data: [100],
        color: '#041234',
        itemStyle: {
          normal: {
            barBorderRadius: 5
          }
        }
      }
    ]
  }
}
const setOption1 = (title, axisData, itemNum) => {
  return {
    title: {
      text: title,
      left: 'center',
      textStyle: {
        color: '#aadaff',
        fontSize: 18,
        align: 'center',
        lineHeight: 66
      }
    },
    grid: {
      // 直角坐标系内绘图网格
      left: '0',
      top: '70',
      right: '0',
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
        barWidth: 10,
        data: itemNum,
        label: {
          show: true,
          align: 'center',
          offset: [0, -20],
          //   formatter: '{c}{a}',
          formatter: function (value) {
            if (value.value === 0) {
              return '-'
            } else {
              return value.value
            }
          },
          color: '#aadaff',
          fontSize: 30,
          fontWeight: 'bolder'
        },
        itemStyle: {
          normal: {
            barBorderRadius: 20,
            color: '#1164BD'
          }
        },
        zlevel: 1
      },
      {
        name: '进度条背景',
        type: 'bar',
        barGap: '-100%',
        barWidth: 10,
        data: [100],
        color: '#041234',
        itemStyle: {
          normal: {
            barBorderRadius: 5
          }
        }
      }
    ]
  }
}
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedItems: [],
      monthNumber: new Date().getMonth(),
      monthData: [],
      list: [
        {
          options: setOption('政治安全指数', ['评分条'], [0]),
          arrder: 'up',
          title: '政治安全指数',
          labelOne: '邪教犯罪涉案人数',
          dataOne: 2000,
          labelTwo: '宗教非法聚集活动',
          dataTwo: 356
        },
        {
          options: setOption('治安安全指数', ['评分条'], [0]),
          arrder: 'down',
          title: '治安安全指数',
          labelOne: '赌博案件受理数',
          dataOne: 400,
          labelTwo: '寻讯滋事事件受理数',
          dataTwo: 356
        },
        {
          options: setOption('经济安全指数', ['评分条'], [0]),
          arrder: 'up',
          title: '经济安全指数',
          labelOne: '合同诈骗案件数',
          dataOne: 1000,
          labelTwo: '电信诈骗案件数',
          dataTwo: 856
        },
        {
          options: setOption('公共安全指数', ['评分条'], [0]),
          arrder: 'down',
          title: '公共安全指数',
          labelOne: '交通事故发生数',
          dataOne: 1000,
          labelTwo: '生产安全事故起数',
          dataTwo: 356
        },
        {
          options: setOption('矛盾纠纷指数', ['评分条'], [0]),
          arrder: 'up',
          title: '矛盾纠纷指数',
          labelOne: '人民调解案件数量',
          dataOne: 900,
          labelTwo: '民转刑案件数量',
          dataTwo: 1056
        },
        {
          options: setOption('公众安全感', ['评分条'], [0]),
          arrder: 'down',
          title: '公众安全感',
          labelOne: '公众安全指数',
          dataOne: '98%',
          labelTwo: '政法机关满意度',
          dataTwo: '92%'
        }
      ]
    }
  },
  computed: {
    monthList () {
      const arr = []
      for (let index = 0; index < this.monthNumber; index++) {
        arr.push('' + this.monthNumber - index)
      }
      return arr
    },
    expChaOption () {
      return {
        tooltip: {
          trigger: 'axis'
        },
        color: [
          '#00FFFF',
          '#0056FF',
          '#AADAFF',
          '#3C9AFE',
          '#E6B00E',
          '#FF7200'
        ],
        legend: {
          data: [
            '政治安全指数',
            '治安安全指数',
            '经济安全指数',
            '公共安全指数',
            '矛盾纠纷指数',
            '公众安全感'
          ],
          top: '15%',
          left: '10%',
          textStyle: {
            color: '#AADAFF'
          }
          // selected: {
          //   政治安全指数: false,
          //   治安安全指数: true,
          //   经济安全指数: true,
          //   公共安全指数: false,
          //   矛盾纠纷指数: false,
          //   公众安全感: false
          // }
        },
        grid: {
          width: '90%',
          height: '60%',
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
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value',
          min: this.handleMonthDataMin(this.monthData),
          max: 100,
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
            name: '政治安全指数',
            data: this.monthData['政治安全指数'],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '治安安全指数',
            data: this.monthData['治安安全指数'],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '经济安全指数',
            data: this.monthData['经济犯罪指数'],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '公共安全指数',
            data: this.monthData['公共安全指数'],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '矛盾纠纷指数',
            data: this.monthData['矛盾纠纷指数'],
            type: 'line',
            symbol: 'none',
            smooth: true
          },
          {
            name: '公众安全感',
            data: this.monthData['公众安全感指数'],
            type: 'line',
            symbol: 'none',
            smooth: true
          }
        ]
      }
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:selectedItemData')
    this.$EventBus.$off('update:backendMonthDataData')
  },
  mounted () {
    const that = this
    this.$EventBus.$on('selectedItemData', res => {
      res.scoreList ? this.handleScoreList(res.scoreList) : ''
    })
    this.$EventBus.$on('backendMonthDataData', res => {
      that.handleMonthData(res)
    })
  },
  methods: {
    selectItem (index) {
      if (this.selectedItems.includes(index)) {
        let list = []
        this.selectedItems.forEach(item => {
          if (item !== index) list.push(item)
        })
        this.selectedItems = list
        list = undefined
      } else {
        this.selectedItems.push(index)
      }
    },
    // 处理数据
    handleScoreList (scoreList) {
      let list = []
      list = this.list.map((item, index) => {
        return {
          ...item,
          options: setOption1(item.title, ['评分条'], [scoreList[index]])
        }
      })
      this.list = list
    },
    // 弹出穿透弹窗
    open (index) {
      this.$EventBus.$emit('update:exponentIndex', index)
      this.$emit('update:visible', true)
    },
    // 处理月份数据
    handleMonthData (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const length = data[key].length
          for (let index = 0; index < this.monthNumber - length; index++) {
            data[key].unshift(undefined)
          }
        }
      }
      console.log(data)
      this.monthData = data
    },
    // 得出月份数据最小值
    handleMonthDataMin (obj) {
      let min = 100
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const arr = obj[key].filter(item => item)
          min = Math.min(...arr) > min ? min : Math.min(...arr)
        }
      }
      return parseInt(min)
    }
  }
}
</script>

<style lang="scss" scoped>
.top-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 420px;
  margin-bottom: 10px;
  .item {
    width: 205px;
    height: 160px;
    margin: 5px 0;
    background: url("~@/assets/image/comprehensive/left-top-list-item.png")
      no-repeat center center;
    background-size: 100% 100%;
    text-align: center;
    position: relative;
    perspective: 800px;
    .chart {
      margin: 0 auto;
      width: 65%;
      height: 100%;
    }
    .icon {
      color: #3b9afe;
      font-size: 28px;
      position: absolute;
      top: 10px;
      left: 10px;
      cursor: pointer;
      z-index: 10;
    }
  }
  .card-before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: 1s;
  }
  .card-after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: 1s;
    transform: rotateY(-180deg);
    backface-visibility: hidden;
    .title {
      color: #a9daff;
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
      padding-right: 5px;
      margin: 35px auto 27px;
    }
    .info {
      text-align: center;
      color: #3497fb;
      font-size: 14px;
      font-weight: bold;
      span:nth-of-type(1) {
        display: inline-block;
        margin-right: 10px;
      }
    }
    .ellipsis {
      text-align: center;
      color: #3497fb;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .card-before-normal {
    transform: rotateY(0);
    visibility: initial;
  }
  .card-after-normal {
    transform: rotateY(-180deg);
  }
  .card-before-reverse {
    transform: rotateY(-180deg);
    visibility: hidden;
  }
  .card-after-reverse {
    transform: rotateY(0deg);
  }
}

.bottom-card {
  width: 420px;
  height: 326px;
  background: url("~@/assets/image/comprehensive/left-bottom-card.png")
    no-repeat center center;
  background-size: 100% 100%;
  position: relative;
  .title {
    position: absolute;
    top: 12px;
    left: 30px;
    color: #7ebdff;
    font-weight: bold;
  }
  .exp-cha-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
