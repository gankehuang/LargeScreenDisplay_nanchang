<template>
  <div class="nanchang-map">
    <v-chart
      id="nanChang"
      style="width:100%;height:100%"
      :options="options"
    />
  </div>
</template>

<script>
import ECharts from 'echarts'
import nanChangMap from './nanChang.json'
ECharts.registerMap('nanChang', nanChangMap)
export default {
  computed: {
    options () {
      return {
        geo: {
          type: 'map',
          map: 'nanChang',
          aspectScale: 1,
          zoom: 0.9,
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
        // dataRange: {
        //   x: 'right',
        //   y: '100px',
        //   textStyle: {
        //     color: '#A9DAFF'
        //   },
        //   splitList: [
        //     { start: 97, end: 100 },
        //     { start: 93, end: 97 },
        //     { start: 90, end: 93 },
        //     { start: 0, end: 90 }
        //   ],
        //   color: ['#F82A36', '#F16C00', '#C9A73A', '#0F82FF'].reverse()
        // },
        series: [
          {
            name: '综合评分',
            type: 'map',
            mapType: 'nanChang',
            // data: this.buttonList,
            // roam: true, // 禁止缩放
            aspectScale: 1,
            zlevel: 2,
            zoom: 0.9,
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
                areaColor: '#00FFFF'
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
    },
    methods: {
      // 初始化地图添加点击事件
      initMapClick () {
        const that = this
        that.$nextTick(() => {
          that.nanChangMapEchart = ECharts.init(
            document.getElementById('nanChang')
          )
          that.nanChangMapEchart.on('click', ({ data }) => {
            this.handleSelectedByMapClick(data)
            that.changeData(data)
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nanchang-map {
  position: fixed;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 970px;
  height: 832px;
}
</style>
