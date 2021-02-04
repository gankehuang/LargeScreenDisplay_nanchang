<template>
  <InfoBlock title="房屋数量">
    <v-chart
      :options="chartData"
    />
  </InfoBlock>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        { value: 126929, name: '自住房屋' },
        { value: 41352, name: '租住房屋' },
        { value: 258152, name: '空置房屋' },
        { value: 3821, name: '其它' }
      ]
    }
  },
  computed: {
    chartData () {
      return {
        color: ['#3B9AFE', '#E6B00E', '#0055FF', '#D3DA1D'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        title: {
          top: 0,
          right: 0,
          subtext: '{a|430254}{b|房屋总数}',
          subtextStyle: {
            rich: {
              a: {
                color: '#e6b00e',
                fontSize: 24,
                padding: [0, 5, 0, 0]
              },
              b: {
                color: '#aadaff',
                fontSize: 16
              }
            }
          }
        },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          top: 50,
          right: 0,
          itemGap: 20,
          formatter: (name) => {
            const curItem = this.dataList.find(item => item.name === name)
            return '{a|' + name + '}{b|' + curItem.value + '}'
          },
          textStyle: {
            rich: {
              a: {
                color: '#7ebdff',
                padding: [0, 5, 0, 0],
                fontSize: 14
              },
              b: {
                color: '#0ff',
                fontSize: 14
              }
            }
          }
        },
        series: [
          {
            name: '房屋数量',
            type: 'pie',
            center: ['30%', '55%'],
            radius: ['30%', '55%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter: '{d}%',
              textStyle: {
                color: '#7EBDFF'
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false,
              length: 1
            },
            data: this.dataList
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
