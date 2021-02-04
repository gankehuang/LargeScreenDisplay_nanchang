<template>
  <InfoBlock
    title="各县区综合排名"
    height="100%"
  >
    <Tabs
      @selectedListData="selectedListData"
      @handleSelectedIndicator="handleSelectedIndicator"
    />
    <div class="samrt-make-policy-list">
      <ul>
        <li>
          <div class="index">
            排名
          </div>
          <div class="countyName">
            县区
          </div>
          <div class="county">
            指标名称
          </div>
          <div class="score">
            分数
          </div>
          <div class="sort-change">
            排名变化
          </div>
          <div class="edit">
            操作
          </div>
        </li>
        <el-scrollbar style="width:100%;height:650px">
          <li
            v-for="(item, index) in listData"
            :key="index"
          >
            <div class="index">
              {{ index + 1 }}
            </div>
            <div
              class="countyName text-overflows"
              :title="item.name"
            >
              {{ item.name }}
            </div>
            <div
              class="county text-overflows"
              :title="item.indexName"
            >
              {{ item.indexName }}
            </div>
            <div class="score">
              {{ item.score }}
            </div>
            <div class="sort-change">
              <!-- 箭头图标 -->
              <!-- <el-image
                :src="Math.random() >= 0.5 ? require('@/assets/image/comprehensive/up-arrow.png') : require('@/assets/image/comprehensive/down-arrow.png')"
                style="width:10px;height:20px;vertical-align:middle"
              ></el-image> -->
              {{ item.sortChange ? item.sortChange : 0 }}
            </div>
            <!-- v-if="index>=listData.length-3" -->
            <div class="edit">
              <div
                class="urge-button"
                @click="
                  open();
                  handleSelectedCounty(item);
                "
              >
                督导
              </div>
            </div>
          </li>
        </el-scrollbar>
      </ul>
    </div>
    <div
      class="pingan-box"
      @click="watchBaogao"
    >
      <svg-icon
        icon-class="baogao"
        style="color:#17FBFF;font-size:16px"
      />
      平安报告
    </div>

    <PopupRight
      ref="ComprehensiveRankingModal"
      :info="index"
    />
    <PdfDialog
      :visible.sync="pdfModalVisible"
      :append-to-body="true"
      :info="pdfFile"
    />
  </InfoBlock>
</template>

<script>
import { initListData } from '../mock'
import { querySecurityAssessList } from '@/api/intelligentDecisionMaking/comprehensive'
import { getGridLine } from '@/api/smartData/gridView'
import Tabs from './Tabs'
import PopupRight from './PopupRight'
export default {
  components: {
    Tabs,
    PopupRight
  },
  data () {
    return {
      index: 1,
      listData: initListData,
      selectedIndicator: { label: '综合', level: 0 },
      pdfFile: {
        file: require('@/assets/pdf/南昌市平安报告.pdf'),
        numPages: 17
      },
      pdfModalVisible: false
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:selectedItemCode')
  },
  mounted () {
    this.$EventBus.$on('selectedItemCode', code => {
      this.selectedItemCode = code
      if (code !== '3601') {
        this.handleGetGridLine(code)
      } else {
        this.handleQuerySecurityAssessList(initListData)
      }
    })
    this.handleQuerySecurityAssessList()
  },
  methods: {
    watchBaogao () {
      // this.$emit('watchBaogao', true)
      this.pdfModalVisible = true
    },
    open () {
      this.$refs.ComprehensiveRankingModal.openModal()
      // this.$emit('update:visible', true)
    },
    // 获取当前选中县区
    handleSelectedCounty (county) {
      this.$EventBus.$emit('update:selectedCounty', county)
      this.selectedCounty = county
    },
    // tabs指标级别数据列表
    selectedListData (val) {
      this.listData = val
    },
    // 获取当前选中指标
    handleSelectedIndicator (indicator) {
      this.selectedIndicator = indicator
      if (this.selectedItemCode === '3601') {
        this.handleQuerySecurityAssessList(initListData)
      } else {
        this.handleGetGridLine(this.selectedItemCode)
      }
    },
    // 获取各县区得分
    async handleQuerySecurityAssessList (listData) {
      // debugger
      try {
        const { status, data } = await querySecurityAssessList({
          indicatorName: this.selectedIndicator.label,
          level: this.selectedIndicator.level
        })
        if (status === 200) {
          this.handleBackenddata(data, listData || this.listData)
        }
      } catch (error) {}
    },
    // 获取各县区下属乡镇、社区
    async handleGetGridLine (code) {
      try {
        const { status, data } = await getGridLine({ code, gridLevel: 3 })
        if (status === 200) {
          this.listData = data.map(item => {
            return {
              name: item.gridName,
              indexName:
                this.selectedIndicator.label === '综合' ? '总分' : this.selectedIndicator.label,
              score: '-'
            }
          })
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}

.pingan-box {
  position: absolute;
  left: 20px;
  bottom: 20px;
  width: 379px;
  height: 50px;
  background: url("~@/assets/image/comprehensive/pingan_btn.png") center
    center / 100% 100% no-repeat;
  font-size: 16px;
  font-weight: bold;
  color: #7dbcff;
  line-height: 50px;
  text-align: center;
}
.title {
  position: absolute;
  top: 12px;
  left: 26px;
  color: #7ebdff;
  font-weight: bold;
  font-size: 16px;
}
.tabs {
  margin: 10px auto 7px;
  width: 95%;
  display: flex;
  .tab {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #7ebdff;
    background: url("~@/assets/image/comprehensive/right-box-tab-item.png")
      no-repeat center center;
    background-size: 100% 100%;
    cursor: pointer;
    .label {
      width: 100%;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .tab-selected {
    background: url("~@/assets/image/comprehensive/right-box-tab-selected-item.png")
      no-repeat center center;
    background-size: 100% 100%;
  }
  .tab-ul {
    list-style-type: none;
    padding: 0;
    width: 95px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: #0167d7;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    margin-top: 5px;
    position: relative;
    z-index: 10;
    li {
      display: block;
      font-size: 18px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background-color: #05193d;
      }
    }
  }
}
.samrt-make-policy-list {
  width: 100%;
  ul {
    padding: 0;
    li {
      width: 95%;
      margin: 0 auto;
      display: flex;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #7dbcff;
      font-size: 18px;
      .countyName {
        flex: 0.5;
      }
      .index,
      .score,
      .sort-change {
        flex: 0.5;
      }
      .county,
      .edit {
        flex: 0.5;
      }
      &:nth-of-type(1) {
        background: rgba(100, 180, 255, 0.3) !important;
      }
      &:nth-of-type(even) {
        background: rgba(46, 103, 205, 0.18);
      }
      &:nth-of-type(odd) {
        background: rgba(5, 25, 61, 0.34);
      }
    }
  }
}
.urge-button {
  width: 75px;
  height: 34px;
  margin-top: 5px;
  line-height: 34px;
  text-align: center;
  color: #3b9afe;
  cursor: pointer;
  background: url("~@/assets/image/comprehensive/urge-button.png") center
    center / 100% 100% no-repeat;
}

</style>
