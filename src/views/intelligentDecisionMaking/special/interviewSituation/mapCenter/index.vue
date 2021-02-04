<template>
  <div class="samrt-make-policy-center">
    <div
      v-if="county"
      class="location"
    >
      <span>当前位置</span>：<el-button
        type="text"
        @click.stop="ncClick"
      >
        南昌市
      </el-button>
      > {{ county }}
    </div>
    <div
      v-else
      class="location"
    >
      <span>当前位置</span>：<el-button
        type="text"
        @click.stop="ncClick"
      >
        南昌市
      </el-button>
    </div>
    <v-chart
      id="nanChang"
      style="width:100%;height:100%"
      :options="options"
    />
  </div>
</template>

<script>
import { mapData } from '@/api/intelligentDecisionMaking/mood'
import ECharts from 'echarts'
import nanChangMap from './nanChang.json'
ECharts.registerMap('nanChang', nanChangMap)

export default {
  data () {
    return {
      time: 1,
      nanChangMapEchart: undefined,
      county: null,
      countyList: {},
      buttonList: [],
      splitListData: []
    }
  },
  computed: {
    options () {
      return {
        geo: {
          type: 'map',
          map: 'nanChang',
          aspectScale: 1,
          zoom: 1.25,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#10396C',
            normal: {
              shadowBlur: 10,
              shadowColor: 'rgba(2,64,116,1)',
              shadowOffsetX: -10,
              shadowOffsetY: 20
            }
          }
        },
        dataRange: {
          x: 'right',
          y: '100px',
          textStyle: {
            color: '#A9DAFF'
          },
          splitList: this.splitListData,
          color: ['#073E7E', '#3B9AFE', '#0148D7', '#07B7D8']
        },
        series: [
          {
            name: '综合评分',
            type: 'map',
            mapType: 'nanChang',
            data: this.buttonList,
            // roam: true, // 禁止缩放
            aspectScale: 1,
            zlevel: 2,
            zoom: 1.25,
            itemStyle: {
              normal: {
                borderWidth: 1, // 区域边框宽度
                borderColor: '#005895', // 区域边框颜色
                // areaColor: '#0F75AE', // 区域颜色
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 5
                // shadowOffsetX: 0,
                // shadowOffsetY: 0,
              },
              // 高亮提示
              emphasis: {
                label: {
                  fontSize: 24,
                  fontWeight: 'bold'
                },
                borderWidth: 0.5,
                borderColor: '#005895',
                areaColor: '#c99e1e'
              }
            },

            label: {
              show: true,
              position: 'top',
              margin: 8,
              textStyle: {
                fontSize: 16,
                color: '#fff'
              },
              formatter: function (params) {
                return params.name + '\n' + params.value
              },
              emphasis: {
                // 对应的鼠标悬浮效果
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            }
          }
        ]
      }
    }
  },
  created () {
    this.initMapClick()
    this.mapData()
  },
  methods: {
    // 初始化地图添加点击事件
    mapData () {
      mapData().then(res => {
        if (res.status === 200) {
          this.buttonList = res.data
          const lenghs = this.buttonList.length - 1
          const maxValue = parseInt(this.buttonList[0].value)
          const minValue = parseInt(this.buttonList[lenghs].value)
          const difference = parseInt(maxValue) - parseInt(minValue)
          const num = parseInt(difference / 4)
          this.splitListData = [
            { start: maxValue - num, end: maxValue },
            { start: maxValue - 2 * num, end: maxValue - num },
            { start: maxValue - 3 * num, end: maxValue - 2 * num },
            { start: minValue, end: maxValue - 3 * num }
          ]
        }
      })
    },
    initMapClick () {
      const that = this
      that.$nextTick(() => {
        that.nanChangMapEchart = ECharts.init(
          document.getElementById('nanChang')
        )
        that.nanChangMapEchart.on('click', ({ data }) => {
          this.countyList = data
          this.county = data.name
          this.$emit('mapEvent', this.countyList)
        })
      })
    },
    ncClick () {
      this.county = null
      this.countyList = null
      this.$emit('mapEvent', this.countyList)
    }
  }
}
</script>

<style lang="scss" scoped>
.samrt-make-policy-center {
  position: absolute;
  margin: auto;
  top: -20%;
  right: 0;
  bottom: 0;
  left: 0;
  width: 930px;
  height: 500px;
}
.location {
  position: absolute;
  color: #a9daff;
  z-index: 9;
  span {
    color: #2c69e3;
  }
  /deep/ .el-button--text,
  .el-button--text {
    color: #a9daff;
  }
}
.echart-map {
  width: 100%;
  height: 100%;
}
.button {
  position: absolute;
  z-index: 9;
  cursor: pointer;
  background-color: rgba(31, 85, 142, 0.28);
  border-radius: 6px;
  text-align: center;
  color: #fff;
}
.current {
  background-color: rgba(31, 85, 142, 0.5);
}
</style>
