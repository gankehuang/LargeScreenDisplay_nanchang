<template>
  <div class="win-info">
    <div class="title">事件环比</div>
    <div class="drop">
      <!--      <el-dropdown>-->
      <!--        <span class="el-dropdown-link">-->
      <!--          {{ level }}-->
      <!--          <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
      <!--        </span>-->
      <!--        <el-dropdown-menu-->
      <!--          slot="dropdown"-->
      <!--          style="width: 109px;text-align: center;line-height: 36px;background: none;border-radius: 6px;border: 1px solid #559AF6;"-->
      <!--        >-->
      <!--          <el-dropdown-item-->
      <!--            @click.native="tabLevel(item)"-->
      <!--            v-for="(item, index) in levelList"-->
      <!--            :key="index"-->
      <!--            >{{ item }}</el-dropdown-item-->
      <!--          >-->
      <!--        </el-dropdown-menu>-->
      <!--      </el-dropdown>-->
    </div>
    <v-chart :options="amountOptions" class="echarts" />
  </div>
</template>

<script>
import echarts from 'vue-echarts'
import { countEventChainRatio } from '@/api/intelligentCommand/warning'
export default {
  data() {
    return {
      type: ['上月', '本月'],
      loading: false,
      dataList: [],
      nameList: ['政治安全', '社会治安', '矛盾纠纷', '公共安全', '网络安全'],
      dataList1: [],
      title: '精神病患者',
      level: '日',
      // levelList: ['日', '周', '月'],
      levelList: ['日']
    }
  },
  computed: {
    amountOptions() {
      return {
        grid: {
          left: '20%',
          top: '15%',
          height: '75%'
          //     containLabel: true,
        },
        legend: {
          data: this.type,
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle',
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          },
          top: '5%',
          right: '30%'
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true,
              color: '#458CDD'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#004968'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.8)']
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: this.nameList,
            axisLabel: {
              color: '#ffffff'
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ['rgba(0, 73, 104, 0.5)']
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#004968'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: this.type[0],
            type: 'bar',
            barWidth: '14px',
            data: this.dataList1,
            barMinHeight: 5,
            label: {
              show: true,
              position: 'insideRight'
            },
            itemStyle: {
              normal: {
                // barBorderRadius: 7,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 1, color: '#2E78FF' },
                  { offset: 0, color: '#3B9AFE' }
                ])
              }
            }
          },
          {
            name: this.type[1],
            type: 'bar',
            barWidth: '14px',
            data: this.dataList,
            barMinHeight: 5,
            label: {
              show: true,
              position: 'insideRight'
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#4FC7FF' },
                  { offset: 1, color: '#68E0CF' }
                ])
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.countEventChainRatio(2)
  },
  methods: {
    tabLevel(item) {
      this.level = item
      switch (this.level) {
        case '日':
          this.countEventChainRatio(1)
          this.type = ['上日', '本日']
          break
        case '周':
          this.countEventChainRatio(2)
          this.type = ['上周', '本周']
          break
        case '月':
          this.countEventChainRatio(3)
          this.type = ['上月', '本月']
          break
        default:
          this.risk = null
          break
      }
    },
    countEventChainRatio(type) {
      this.nameList = []
      this.dataList1 = []
      this.dataList = []
      countEventChainRatio({
        type
      }).then(res => {
        const { status, data } = res
        if (status === 200) {
          const dataList1 = [
            {
              type: 'internetPublicOpinion',
              name: '网络安全',
              num: data.internetPublicOpinionPre
            },
            {
              type: 'publicSafety',
              num: data.publicSafetyPre,
              name: '公共安全'
            },
            {
              type: 'conflict',
              num: data.conflictPre,
              name: '矛盾纠纷'
            },
            {
              type: 'socialSecurity',
              num: data.socialSecurityPre,
              name: '社会治安'
            },
            {
              type: 'politicalSecurity',
              num: data.politicalSecurityPre,
              name: '政治安全'
            }
          ]

          const newArr = dataList1.sort(this._compare('num'))
          newArr.forEach(item => {
            this.dataList1.push(item.num)
            this.nameList.push(item.name)
            this.dataList.push(data[item.type])
          })
        }
      })
    },
    _compare(property) {
      return function(a, b) {
        const value1 = a[property]
        const value2 = b[property]
        return value1 - value2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
.win-info {
  position: relative;
  width: 420px;
  height: 348px;
  background: url("~@/assets/image/warning/right-bg1.png") no-repeat center
    center;
  background-size: 100% 100%;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #7dbcff;
    line-height: 18px;
    position: absolute;
    top: 15px;
    left: 20px;
  }
}
.drop {
  position: absolute;
  right: 0px;
  top: 13px;
  z-index: 40;
}
.el-dropdown {
  margin-right: 20px;
}
.el-dropdown-link {
  display: inline-block;
  width: 80px;
  line-height: 31px;
  text-align: center;
  font-size: 12px;
  color: #b2d9fb;
  background: url("~@/assets/image/importPeople/button-bg.png") no-repeat center;
  background-size: 100% 100%;
  cursor: pointer;
}
</style>
