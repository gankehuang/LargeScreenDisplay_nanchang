<template>
  <div class="page-left data-cockpit-left">
    <!-- 维稳态势 -->
    <div class="dwts-container">
      <div class="title">维稳态势</div>
      <div class="case-info">
        <div class="info-one">
          <v-chart :options="oneInfoOption" style="width: 77px;height: 77px" />
          <div class="info-block">
            <div class="label">{{ oneInfo.blockLabel }}</div>
            <div class="number">{{ oneInfo.blockNumber }}</div>
          </div>
        </div>
        <div class="info-two">
          <div class="info-block">
            <div class="label">{{ twoInfo.blockLabel }}</div>
            <div class="number">{{ twoInfo.blockNumber }}</div>
          </div>
          <v-chart :options="twoInfoOption" style="width: 77px;height: 77px" />
        </div>
      </div>
      <div class="case-tab">
        <span
          class="tab-item"
          :class="{ active: tabName === '涉稳' }"
          @click="tab('涉稳')"
          >涉稳</span
        >
        <span
          class="tab-item"
          :class="{ active: tabName === '信访' }"
          @click="tab('信访')"
          >信访</span
        >
      </div>
      <div class="case-list">
        <div class="case-list-th-container">
          <div class="case-frist-th" />
          <div class="case-list-th">突出问题</div>
          <div class="case-list-th">数量</div>
          <div class="case-list-th">占比</div>
        </div>
        <el-scrollbar style="height:100px">
          <div
            class="case-list-tr"
            v-for="(item, index) in dwtsList"
            :key="index"
          >
            <div
              :class="[
                'td',
                { 'td-frist': index === 0 },
                { 'td-second': index === 1 },
                { 'td-third': index === 2 }
              ]"
            />
            <div class="case-list-td">{{ item.label }}</div>
            <div class="case-list-td">{{ item.number }}件</div>
            <div class="case-list-td fourth">{{ item.percentage }}%</div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <!-- 治安态势 -->
    <div class="zats-container">
      <div class="title">治安态势</div>
      <div class="total-info">
        <div class="icon"></div>
        <div class="info" @click="handleVisible">
          <span class="label">案件总数</span>
          <span class="number">
            <span>{{ zatsTotal.number }}</span>
            <font>件</font>
          </span>
        </div>
      </div>
      <!-- <div class="case-tab">
        <span class="tab-item active">涉稳</span>
        <span class="tab-item">信访</span>
      </div> -->
      <div class="case-list">
        <div class="case-list-th-container">
          <div class="case-frist-th" />
          <div class="case-list-th">突出问题</div>
          <div class="case-list-th">数量</div>
          <div class="case-list-th">占比</div>
        </div>
        <el-scrollbar style="height:100px">
          <div
            class="case-list-tr"
            v-for="(item, index) in zatsList"
            :key="index"
          >
            <div
              :class="[
                'td',
                { 'td-frist': index === 0 },
                { 'td-second': index === 1 },
                { 'td-third': index === 2 }
              ]"
            />
            <div class="case-list-td">{{ item.label }}</div>
            <div class="case-list-td">{{ item.number }}件</div>
            <div class="case-list-td fourth">{{ item.percentage }}%</div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <!-- 教转救助 -->
    <div class="zjjz-container">
      <div class="title">教转救助</div>
      <div class="box">
        <div class="info-block">
          <span class="label">
            邪教人员教育转化
          </span>
          <img
            style="margin-top:5px;width:106px;height:43px"
            :src="require('@/assets/image/dataCockpit/组 154 (1).png')"
          />
          <div class="data-block">
            <div class="row">
              <!--              <svg-icon icon-class="menu-icon" class="svg-icon" />-->
              <span class="data-block-label">{{ cultEdu.total.label }}</span>
              <span class="number">{{ cultEdu.total.number }}</span>
            </div>
            <div class="row row-1">
              <!--              <svg-icon icon-class="menu-icon" class="svg-icon" />-->
              <span class="data-block-label">{{ cultEdu.per.label }}</span>
              <span class="per-number">{{ cultEdu.per.number }}%</span>
            </div>
          </div>
        </div>
        <div class="info-block">
          <span class="label">
            司法救助
          </span>
          <img
            style="margin-top:5px;width:106px;height:43px"
            :src="require('@/assets/image/dataCockpit/组 154 (1).png')"
          />
          <div class="data-block">
            <div class="row row-2">
              <!--              <svg-icon icon-class="menu-icon" class="svg-icon" />-->
              <span class="data-block-label label-1">{{
                jusRep.total.label
              }}</span>
              <span class="number">{{ jusRep.total.number }}</span>
            </div>
            <div class="row row-1">
              <!--              <svg-icon icon-class="menu-icon" class="svg-icon" />-->
              <span class="data-block-label label-2">{{
                jusRep.per.label
              }}</span>
              <span class="per-number">{{ jusRep.per.number }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ColumnsAnimationModal
      :visible.sync="columnsAnimationModal.visible"
      :info="columnsAnimationModal.info"
      pageType="visitInfo"
    />
  </div>
</template>

<script>
import { sheWenList, xinFangList } from './mock'
import ColumnsAnimationModal from './ColumnsAnimationModal'
export default {
  components: {
    ColumnsAnimationModal
  },
  data() {
    return {
      columnsAnimationModal: {
        visible: false,
        info: null
      },
      tabName: '涉稳',
      oneInfo: {
        optionLabel: '化解率',
        optionNumber: 53.86,
        blockLabel: '涉稳案件',
        blockNumber: 440
      },
      twoInfo: {
        optionLabel: '化解率',
        optionNumber: 92.25,
        blockLabel: '信访案件',
        blockNumber: 47205
      },
      dwtsList: sheWenList,
      zatsTotal: {
        number: 3696535
      },
      zatsList: [
        { label: '救助', number: 1016653, percentage: 32.83 },
        { label: '交通类警情', number: 919950, percentage: 29.7 },
        { label: '行政案件', number: 201195, percentage: 6.49 }
        // { label: '万科天空之城', number: 78, percentage: 23.56 },
        // { label: '万科天空之城', number: 78, percentage: 23.56 }
      ],
      cultEdu: {
        total: { label: '今年任务', number: 89 },
        per: { label: '完成率', number: 50.2 }
      },
      jusRep: {
        total: { label: '救助数', number: 261 },
        per: { label: '资金数', number: 7312641 }
      }
    }
  },
  computed: {
    oneInfoOption() {
      return {
        color: ['#3B9AFE', '#00FFFF'],
        tooltip: {
          show: false
        },
        series: [
          {
            name: this.oneInfo.optionLabel,
            type: 'pie',
            radius: ['90%', '100%'],
            hoverAnimation: false,
            slient: true,
            label: {
              normal: {
                show: true,
                position: 'center',
                fontSize: 14,
                lineHeight: 18,
                textStyle: {
                  align: 'center'
                },
                formatter: () => {
                  return `${this.oneInfo.optionLabel} \n ${this.oneInfo.optionNumber}%`
                }
              }
            },
            data: [
              {
                value: this.oneInfo.optionNumber,
                name: this.oneInfo.optionLabel
              },
              { value: 100 - this.oneInfo.optionNumber, name: '未化解率' }
            ]
          }
        ]
      }
    },
    twoInfoOption() {
      return {
        color: ['#3B9AFE', '#00FFFF'],
        tooltip: {
          show: false
        },
        series: [
          {
            name: this.twoInfo.optionLabel,
            type: 'pie',
            radius: ['90%', '100%'],
            hoverAnimation: false,
            slient: true,
            label: {
              normal: {
                show: true,
                position: 'center',
                fontSize: 14,
                lineHeight: 18,
                textStyle: {
                  align: 'center'
                },
                formatter: () => {
                  return `${this.twoInfo.optionLabel} \n ${this.twoInfo.optionNumber}%`
                }
              }
            },
            data: [
              {
                value: this.twoInfo.optionNumber,
                name: this.twoInfo.optionLabel
              },
              { value: 100 - this.twoInfo.optionNumber, name: '未化解率' }
            ]
          }
        ]
      }
    }
  },
  methods: {
    tab(tabName) {
      this.tabName = tabName
      switch (tabName) {
        case '涉稳':
          this.dwtsList = sheWenList
          break
        case '信访':
          this.dwtsList = xinFangList
          break
        default:
          break
      }
    },
    // 打开弹窗
    handleVisible() {
      this.columnsAnimationModal.visible = true
      this.columnsAnimationModal.info = {
        title: '警情数量变化趋势',
        position: 'left'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.data-cockpit-left {
  margin-right: 16px;
  width: 400px;
}
.title {
  width: 100%;
  line-height: 43px;
  height: 43px;
  background: url("~@/assets/image/dataCockpit/block-title.png") center center /
    100% 100% no-repeat;
  padding-left: 33px;
  font-size: 16px;
  font-weight: bold;
  color: #3b9afe;
}
.case-tab {
  margin: 0 auto;
  width: 90%;
  padding: 0 20px 10px;
  font-size: 16px;
  color: #a9daff;
  border-bottom: 1px solid #0f539b;
  .tab-item {
    cursor: pointer;
    width: 40px;
    position: relative;
    margin: 0px 17px;
  }
  .tab-item.active {
    color: #00ffff;
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 20px;
      left: -5px;
      width: 38px;
      height: 7px;
      background: url("~@/assets/image/dataCockpit/tab-item-active.png") center
        center / 100% 100% no-repeat;
    }
  }
}
.case-list {
  margin-top: 10px;
  text-align: center;
  .case-list-th-container {
    width: 100%;
    display: flex;
  }
  .case-list-th {
    flex: 33.333333%;
    color: #3b9afe;
    font-size: 16px;
    line-height: 40px;
  }
  .case-list-tr {
    width: 100%;
    display: flex;
    color: #a9daff;
    line-height: 36px;
  }
  .case-list-td {
    flex: 33.333333%;
    font-size: 16px;
  }
  .case-list-td.fourth {
    color: #00ffff;
  }
  .case-frist-th {
    width: 30px;
    height: 40px;
    margin-left: 15px;
  }
  .td {
    width: 20px;
    height: 20px;
    margin: 5px 0 0 15px;
    position: relative;
  }
  .td-frist {
    background: url("~@/assets/image/dataCockpit/椭圆 864.png") center center /
      100% 100% no-repeat;
    &::after {
      content: "1";
      display: block;
      position: absolute;
      top: -8px;
      left: 4px;
      font-size: 14px;
      color: #fe2821;
    }
  }
  .td-second {
    background: url("~@/assets/image/dataCockpit/椭圆 864(1).png") center center /
      100% 100% no-repeat;
    &::after {
      content: "2";
      display: block;
      position: absolute;
      top: -8px;
      left: 4px;
      font-size: 14px;
      color: #e9aa00;
    }
  }
  .td-third {
    background: url("~@/assets/image/dataCockpit/椭圆 864(2).png") center center /
      100% 100% no-repeat;
    &::after {
      content: "3";
      display: block;
      position: absolute;
      top: -8px;
      left: 4px;
      font-size: 14px;
      color: #a9daff;
    }
  }
}
.dwts-container {
  width: 100%;
  height: 360px;
  .case-info {
    padding: 0 20px;
    margin: 30px 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .info-one {
    display: flex;
    align-items: center;
    .info-block {
      width: 96px;
      height: 69px;
      padding: 15px 0 0 17px;
      color: #a9daff;
      background: url("~@/assets/image/dataCockpit/one-info-block.png") center
        center / 100% 100% no-repeat;
      .number {
        font-size: 20px;
        line-height: 36px;
        font-weight: bold;
      }
    }
  }
  .info-two {
    display: flex;
    align-items: center;
    .info-block {
      width: 96px;
      height: 69px;
      padding: 15px 17px 0 0;
      color: #a9daff;
      text-align: right;
      background: url("~@/assets/image/dataCockpit/two-info-block.png") center
        center / 100% 100% no-repeat;
      .number {
        font-size: 20px;
        line-height: 36px;
        font-weight: bold;
      }
    }
  }
}
.zats-container {
  width: 100%;
  height: 292px;
  .total-info {
    margin: 12px 0 12px 15px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .icon {
    width: 55px;
    height: 48px;
    background: url("~@/assets/image/dataCockpit/组 85(1).png") center center /
      100% 100% no-repeat;
    margin-right: 17px;
  }
  .info {
    color: #a9daff;
    .label {
      display: inline-block;
      margin-right: 13px;
      font-size: 18px;
    }
    .number {
      span {
        font-size: 24px;
        font-weight: bold;
      }
      font {
        font-size: 14px;
      }
    }
  }
}
.zjjz-container {
  .title {
    margin-bottom: 30px;
  }
  width: 100%;
  // height: 219px;
  .box {
    display: flex;
    .info-block {
      //margin-top: 10px;
      text-align: center;
      margin-left: 30px;
      width: 50%;
      position: relative;
      .label {
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: bold;
        color: #a9daff;
      }
      .data-block {
        display: flex;
        .row-1 {
          padding-left: 30px;
        }

        .row {
          margin: 5px 0px;
          color: #a9daff;
          .data-block-label,
          .number,
          .per-number {
            display: inline-block;
            vertical-align: top;
            font-size: 16px;
          }

          .number {
            padding-top: 10px;
          }
          .per-number {
            color: #00ffff;
            padding-top: 10px;
          }
          .label-1 {
            padding-right: 10px;
          }
        }
        //.svg-icon {
        //  font-size: 24px;
        //  color: #3b9afe;
        //}
      }
    }
  }
}
</style>
