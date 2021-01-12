<template>
  <div class="page-left">
    <div class="top">
      <span class="title">矛盾纠纷总览</span>
      <div class="content">
        <el-row>
          <el-col :span="8">
            <svg-icon icon-class="conflict-org" class="icon"></svg-icon>
            <div class="info">
              <span class="label">调解组织</span>
              <br />
              <span class="data">{{ org }}</span>
            </div>
          </el-col>
          <el-col :span="16" class="grid">
            <div class="grid-item">
              <span class="label">矛盾纠纷数</span>
              <span class="data">{{ yearCheckAmount }}</span>
            </div>
            <div class="grid-item">
              <span class="label">年化解率</span>
              <span class="data">{{ yearSolveAmount }}%</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <svg-icon icon-class="conflict-peo" class="icon"></svg-icon>
            <div class="info">
              <span class="label">调解人员</span>
              <br />
              <span class="data">{{ peo }}</span>
            </div>
          </el-col>
          <el-col :span="16" class="grid">
            <div class="grid-item">
              <span class="label">一般矛盾</span>
              <span class="data">{{ normalConflict }}</span>
            </div>
            <div class="grid-item">
              <span class="label">突出矛盾</span>
              <span class="data">{{ stressConflict }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="middle">
      <span class="title">矛盾纠纷类型</span>
      <div class="content">
        <v-chart :options="middleOption" class="chart" />
      </div>
    </div>
    <div class="bottom">
      <span class="title">重点矛盾纠纷</span>
      <div class="content">
        <el-table
          :data="tableData"
          stripe
          max-height="240"
          style="width: 99%;height: 240px; margin: 30px auto 0;"
          @row-click="
            row => {
              navTo(row);
            }
          "
        >
          <el-table-column prop="name" label="群体"> </el-table-column>
          <el-table-column prop="count" label="成员数"> </el-table-column>
          <el-table-column prop="backbone" label="骨干人数"> </el-table-column>
          <el-table-column prop="activity" label="活跃度"> </el-table-column>
          <el-table-column prop="distribute" label="成员分布">
            <template slot-scope="scope">
              <svg-icon
                icon-class="location"
                :class="{
                  'active-icon':
                    curShowMakerName === scope.row.name && scope.row.active
                }"
                @click.stop="focusMapMaker(scope.row)"
              ></svg-icon>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    modalType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      curShowMakerName: '',
      org: 2166,
      peo: 386,
      yearCheckAmount: 64833,
      yearSolveAmount: 99.91,
      normalConflict: 58350,
      stressConflict: 6483,
      optionsData: [
        { name: '邻里纠纷', value: 82.69 },
        { name: '婚恋家庭纠纷', value: 5.51 },
        { name: '物权相关纠纷', value: 4.68 },
        { name: '城乡建设发展纠纷', value: 3.63 },
        { name: '其他纠纷', value: 3.49 }
      ],
      tableData: [
        {
          name: '禁渔禁捕',
          count: 4242,
          backbone: 1120,
          activity: 50,
          active: false
        },
        {
          name: '中华情',
          count: 3820,
          backbone: 42,
          activity: 78,
          active: false
        },
        {
          name: '老庆祥',
          count: 3309,
          backbone: 61,
          activity: 32,
          active: false
        },
        {
          name: '金三江',
          count: 3512,
          backbone: 64,
          activity: 54,
          active: false
        },
        {
          name: '农校委培生',
          count: 128,
          backbone: 24,
          activity: 67,
          active: false
        }
      ],
      show: false
    }
  },
  computed: {
    middleOption() {
      return {
        color: ['#3B9AFE', '#00FFFF', '#A9DAFF', '#02C439', '#0055FF'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} '
        },
        legend: {
          show: true,
          orient: 'vertical',
          formatter: name => {
            const value = this.optionsData.filter(item => {
              return item.name === name
            })
            return name + '  ' + (Number((value[0].value / 100) * 100) + '%')
          },
          textStyle: {
            color: '#fff',
            lineHeight: 24,
            fontSize: 14
          },
          top: 30,
          right: 30,
          data: [
            '邻里纠纷',
            '婚恋家庭纠纷',
            '物权相关纠纷',
            '城乡建设发展纠纷',
            '其他纠纷'
          ]
        },
        series: [
          {
            name: '事件来源',
            type: 'pie',
            center: ['22%', '55%'],
            radius: ['45%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { name: '邻里纠纷', value: 82.69 },
              { name: '婚恋家庭纠纷', value: 5.51 },
              { name: '物权相关纠纷', value: 4.68 },
              { name: '城乡建设发展纠纷', value: 3.63 },
              { name: '其他纠纷', value: 3.49 }
            ]
          }
        ]
      }
    }
  },
  methods: {
    navTo(row) {
      switch (row.name) {
        case '禁渔禁捕':
          this.$router.push('/riskPrevention/keyWaters')
          break
        case '中华情':
          this.$emit('update:visible', true)
          this.$emit('update:modalType', 'zhq')
          break
      }
    },
    focusMapMaker(rowData) {
      this.curShowMakerName = rowData.name
      this.tableData.forEach(item => {
        if (item.name === rowData.name) {
          item.active = !rowData.active
          if (item.active) {
            this.$emit('showMapMarkerList', rowData.name)
          } else {
            this.$emit('showMapMarkerList', '初始化图标')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-left {
  z-index: 10;
}
.top,
.middle,
.bottom {
  width: 420px;
  height: 275px;
  background: url("~@/assets/image/conflict/left_block_bg.png") center center /
    100% 100% no-repeat;
  position: relative;
}
.title {
  position: absolute;
  top: 10px;
  left: 30px;
  font-size: 16px;
  font-weight: bold;
  color: #7dbcff;
  line-height: 18px;
}
.top {
  .content {
    margin-top: 40px;
    width: 100%;
  }
  .el-row {
    padding: 25px 0 0 50px;
  }
  .icon {
    color: #3b9afe;
    font-size: 40px;
    margin-top: 20px;
  }
  .info {
    display: inline-block;
    margin: 20px 0 0 10px;
    vertical-align: top;
    .label {
      font-size: 14px;
      font-weight: bold;
      color: #a9daff;
      line-height: 18px;
    }
    .data {
      font-size: 24px;
      font-weight: bold;
      color: #3b9afe;
      line-height: 28px;
    }
  }
  .grid {
    display: inline-flex;
    justify-content: space-around;
    .grid-item {
      width: 94px;
      height: 81px;
      background: url("~@/assets/image/conflict/left_top_grid_item.png") center
        center / 100% 100% no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .label {
        font-size: 14px;
        font-weight: bold;
        color: #a9daff;
        line-height: 18px;
      }
      .data {
        font-size: 24px;
        font-weight: bold;
        color: #00ffff;
        line-height: 36px;
      }
    }
  }
}
.middle {
  .content {
    margin-top: 40px;
    width: 100%;
    height: calc(100% - 40px);
  }
  .chart {
    width: 100%;
    height: 100%;
  }
  .icon {
    font-size: 24px;
    color: #3b9afe;
  }
}
.bottom {
  .content {
    margin-top: 40px;
    width: 100%;
    height: calc(100% - 40px);
  }
  /deep/.el-table {
    background: transparent;
  }
  /deep/.el-table th {
    color: #a9daff;
    text-align: center;
    background: #05438c !important;
  }
  /deep/.el-table__row td {
    background: #021c3b !important;
    text-align: center !important;
    color: #a9daff;
  }
  /deep/.el-table__body .el-table__row--striped td {
    background: #062d5a !important;
    color: #a9daff;
  }

  /deep/.el-table--border th,
  /deep/.el-table__fixed-right-patch {
    background: transparent !important;
  }

  /deep/ .svg-icon {
    cursor: pointer;
  }

  .active-icon {
    color: #0a8fc7;
  }
}
</style>
