<template>
  <div class="dataCockpit-right page-right">
    <div class="title">风险预警</div>
    <div class="risk-Warning">
      <div class="Warning-top">
        <div class="Warning-top-left"></div>
        <div class="Warning-top-center">
          <p>预警总数</p>
          <p>2723<span>件</span></p>
        </div>
        <div class="Warning-top-right">
          <div class="arrow"></div>
          完成率<span>96.12%</span>
        </div>
      </div>
      <div class="Warning-bottom">
        <v-chart :options="options" />
        <div class="bottom-bgm"></div>
      </div>
    </div>
    <div class="title">事项通办</div>
    <div class="general-affairs">
      <div class="Warning-top">
        <div class="Warning-top-left"></div>
        <div class="Warning-top-center" @click="handleVisible">
          <p>事件总数</p>
          <p>820642<span>件</span></p>
        </div>
        <div class="Warning-top-right">
          <div class="arrow"></div>
          完成率<span>96.12%</span>
        </div>
      </div>
      <div class="Warning-bottom">
        <div class="bottom-tab">
          <div
            :class="['tab-list', { selected: selectedIndex === index }]"
            v-for="(item, index) in tabList"
            :key="index"
            @click="changeTab(index)"
          >
            {{ item }}
          </div>
        </div>
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              prop="date"
              :label="selectedIndex === 0 ? '事件类型' : '事件来源'"
              width="150"
            >
              <template slot-scope="scope">
                <div class="sort-box">
                  <span :class="'sort' + scope.$index">
                    {{ scope.$index + 1 }}
                  </span>
                  {{ scope.row.date }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="数量"> </el-table-column>
            <el-table-column prop="address" label="占比">
              <template slot-scope="scope">
                <span style="color: #00FFFF">
                  {{ scope.row.address }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
    <div class="title">治理力量</div>
    <div class="governance-power">
      <div class="governance-power-top">
        <div class="top-list" v-for="(item, index) in powerList" :key="index">
          <div class="list-left">
            <p>{{ item.date }}</p>
            <p>{{ item.name }}</p>
          </div>
          <div class="list-right" v-if="index + 1 !== powerList.length"></div>
        </div>
      </div>
      <div class="governance-power-bottom">
        <div
          class="bottom-list"
          v-for="(item, index) in governanceList"
          :key="index"
        >
          <p :class="'power' + index">{{ item.value }}</p>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>

    <ColumnsAnimationModal
      :visible.sync="columnsAnimationModal.visible"
      :info="columnsAnimationModal.info"
      pageType="eventRank"
    />
  </div>
</template>

<script>
import { typeMostList, originMostList } from './mock'
import ColumnsAnimationModal from './ColumnsAnimationModal'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ColumnsAnimationModal
  },
  data() {
    return {
      columnsAnimationModal: {
        visible: false,
        info: null
      },
      tabList: ['类型最多', '来源最多'],
      selectedIndex: 0,
      tableData: typeMostList,
      powerList: [
        {
          date: '8729',
          name: '网格数'
        },
        {
          date: '9066',
          name: '网格员'
        },
        {
          date: '2599',
          name: '网格融入'
        }
      ],
      governanceList: [
        {
          value: '62249',
          name: '天网'
        },
        {
          value: '6803',
          name: '地网'
        },
        {
          value: '14839',
          name: '社会资源'
        },
        {
          value: '22391',
          name: '智慧云眼'
        }
      ]
    }
  },
  computed: {
    options() {
      return {
        color: ['#A9DAFF', '#00FFFF', '#0055FF', '#E6B00E', '#FE573B'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          right: 10,
          top: 10,
          height: 130,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: '#A9DAFF',
            fontSize: 14
          },
          data: [
            '政治安全0%',
            '社会治安90.77%',
            '矛盾纠纷0%',
            '公共安全9.05%',
            '网络安全0%'
          ]
        },
        grid: {
          width: '100%',
          height: '100%'
        },
        series: [
          {
            name: '事件情况',
            type: 'pie',
            radius: ['80%', '100%'],
            center: ['20%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'right',
              formatter: '{d}%'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '20',
                position: 'center',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 0,
                name: '政治安全0%'
              },
              { value: 2528, name: '社会治安90.77%' },
              { value: 30, name: '矛盾纠纷0%' },
              { value: 252, name: '公共安全9.05%' },
              {
                value: 0,
                name: '网络安全0%'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    changeTab(index) {
      this.selectedIndex = index
      switch (index) {
        case 0:
          this.tableData = typeMostList
          break
        case 1:
          this.tableData = originMostList
          break
        default:
          break
      }
    },
    // 打开弹窗
    handleVisible() {
      this.columnsAnimationModal.visible = true
      this.columnsAnimationModal.info = {
        title: '事件排名',
        position: 'right'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dataCockpit-right {
  width: 415px;
  padding-right: 15px;
  position: relative;
  z-index: 99;
  .title {
    width: 400px;
    line-height: 43px;
    height: 43px;
    background: url("~@/assets/image/dataCockpit/block-title.png") center center /
      100% 100% no-repeat;
    padding-left: 33px;
    font-size: 16px;
    font-weight: bold;
    color: #3b9afe;
  }
  .risk-Warning .Warning-top-left {
    background: url("~@/assets/image/dataCockpit/组 85.png") center center /
      100% 100% no-repeat;
  }
  .general-affairs .Warning-top-left {
    background: url("~@/assets/image/dataCockpit/组 85(2).png") center center /
      100% 100% no-repeat;
  }
  .risk-Warning,
  .general-affairs {
    width: 400px;
    padding: 0 15px;
    margin-top: 20px;
    margin-bottom: 20px;
    .Warning-top {
      width: 100%;
      height: 48px;
      display: flex;
      .Warning-top-left {
        width: 55px;
        height: 48px;
      }
      .Warning-top-center {
        cursor: pointer;
        margin-left: 15px;
        width: 120px;
        height: 100%;
        p {
          margin: 0;
          padding: 0;
          &:nth-child(1) {
            font-size: 18px;
            font-weight: 400;
            color: #a9daff;
            line-height: 18px;
          }
          &:nth-child(2) {
            margin-top: 10px;
            font-size: 24px;
            font-weight: bold;
            color: #a9daff;
            line-height: 18px;
            span {
              font-size: 14px;
            }
          }
        }
      }
      .Warning-top-right {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        color: #00ffff;
        line-height: 18px;
        .arrow {
          width: 15px;
          height: 14px;
          margin: 0 30px;
          background: url("~@/assets/image/dataCockpit/右箭头.png") center
            center / 100% 100% no-repeat;
        }
      }
    }
  }
  .risk-Warning .Warning-bottom {
    margin-top: 25px;
    display: flex;
    position: relative;
    .echarts {
      width: 400px;
      height: 130px;
    }
    .bottom-bgm {
      width: 55px;
      height: 92px;
      position: absolute;
      top: 20px;
      left: 160px;
      background: url("~@/assets/image/dataCockpit/组 88 拷贝.png") center
        center / 100% 100% no-repeat;
    }
  }
  .general-affairs .Warning-bottom {
    margin-top: 25px;
    .bottom-tab {
      width: 100%;
      height: 40px;
      display: flex;
      border-bottom: 1px solid #0f539b;
      cursor: pointer;
      .tab-list {
        width: 80px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        font-weight: 400;
        color: #a9daff;
        cursor: pointer;
      }
      .selected {
        background: url("~@/assets/image/dataCockpit/tab-item-active.png")
          center bottom no-repeat;
      }
    }
    .sort-box {
      position: relative;
    }
    .sort0,
    .sort1,
    .sort2 {
      position: absolute;
      left: 0;
      display: inline-block;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      display: inline-block;
      margin: 0 5px 0 -10px;
    }
    .sort0 {
      background: url("~@/assets/image/dataCockpit/椭圆 864.png") center bottom
        no-repeat;
      color: #e82524;
    }
    .sort1 {
      background: url("~@/assets/image/dataCockpit/椭圆 864(1).png") center
        bottom no-repeat;
      color: #f2c21c;
    }
    .sort2 {
      background: url("~@/assets/image/dataCockpit/椭圆 864(2).png") center
        bottom no-repeat;
      color: #3b9afe;
    }
    /deep/.el-table,
    /deep/.el-table th,
    /deep/.el-table tr,
    /deep/.el-table td {
      background-color: transparent !important;
      border: none !important;
      color: #a9daff !important;
    }
    /deep/.el-table th {
      color: #3b9afe !important;
    }
    /deep/.el-table th,
    /deep/.el-table tr,
    /deep/.el-table td {
      text-align: center;
    }
  }
  .governance-power {
    width: 100%;
    // height: 170px;
    padding: 0 15px;
    margin-top: 10px;
    .governance-power-top {
      width: 100%;
      height: 80px;
      display: flex;
      .top-list {
        display: flex;
        height: 80px;
        align-items: center;
        .list-left {
          width: 80px;
          height: 80px;
          font-size: 14px;
          font-weight: bold;
          color: #a9daff;
          line-height: 18px;
          text-align: center;
          background: url("~@/assets/image/dataCockpit/椭圆 1073.png") center
            center / 100% 100% no-repeat;
        }
        .list-right {
          width: 63px;
          height: 7px;
          background: url("~@/assets/image/dataCockpit/组 129.png") center
            center no-repeat;
        }
      }
    }
    .governance-power-bottom {
      width: 100%;
      padding-left: 10px;
      display: flex;
      .bottom-list {
        //  text-align: center;
        width: 25%;
        p {
          margin: 6.5px 0;
          padding: 0 0 0 20px;
          font-size: 14px;
          font-weight: 400;
          color: #a9daff;
          line-height: 18px;
        }
        .power0 {
          background: url("~@/assets/image/dataCockpit/摄像头 (2).png")
            no-repeat;
        }
        .power1 {
          background: url("~@/assets/image/dataCockpit/Icon_地网总数.png")
            no-repeat;
        }
        .power2 {
          background: url("~@/assets/image/dataCockpit/形状 554.png") no-repeat;
        }
        .power3 {
          background: url("~@/assets/image/dataCockpit/形状 728.png") no-repeat;
        }
      }
    }
  }
}
</style>
