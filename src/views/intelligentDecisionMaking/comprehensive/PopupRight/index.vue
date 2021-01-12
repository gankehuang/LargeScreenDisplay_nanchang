<template>
  <div class="mask-container" v-if="visible">
    <div class="mask"></div>
    <div class="comprehensive-popup-container">
      <el-scrollbar style="width:100%;height:100%;">
        <div class="popup-close" @click="close"></div>
        <IndexName :code="selectedCounty.code" />
        <RadarBlock
          :code="selectedCounty.code"
          :codeName="selectedCounty.name"
        />
        <BarBlock :code="selectedCounty.code" />
        <div class="analysis">
          <svg-icon icon-class="popup-tip" class="analysis-icon"></svg-icon>
          <span class="analysis-title">预警三级指标</span>
        </div>
        <TableList :code="selectedCounty.code" />
        <div class="analysis">
          <svg-icon icon-class="popup-tip" class="analysis-icon"></svg-icon>
          <span class="analysis-title">督导意见</span>
        </div>
        <SupervisoryOpinion
          :code="selectedCounty.code"
          @superviseInfo="superviseInfo"
        />
        <div style="width:100%;text-align:right;padding: 10px 100px 0 0">
          <span
            class="urge-button"
            @click="
              close();
              handleGenSupervisionEvent();
            "
            >督促整改</span
          >
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import IndexName from './IndexName'
import RadarBlock from './RadarBlock'
import BarBlock from './BarBlock'
import TableList from './TableList'
import SupervisoryOpinion from './SupervisoryOpinion'
import { genSupervisionEvent } from '@/api/intelligentDecisionMaking/comprehensive'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    buttonVisible: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number
    }
  },
  components: {
    RadarBlock,
    BarBlock,
    IndexName,
    TableList,
    SupervisoryOpinion
  },
  watch: {
    visible(val) {}
  },
  data() {
    return {
      selectedCounty: undefined,
      selectedIndicator: { label: '总分' },
      IndexNameList: [],
      supInfo: ''
    }
  },
  beforeDestroy() {
    this.$EventBus.$off('update:selectedCounty')
    this.$EventBus.$off('update:selectedIndicator')
  },
  mounted() {
    this.$EventBus.$on('update:selectedCounty', county => {
      console.log(county)
      this.selectedCounty = county
    })
    this.$EventBus.$on(
      'update:selectedIndicator',
      indicator => (this.selectedIndicator = indicator)
    )
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
      this.$emit('update:buttonVisible', false)
    },
    // 生成督导事件
    async handleGenSupervisionEvent() {
      try {
        const initData = {
          superviseRegion: this.selectedCounty.name,
          indicatorName: this.selectedIndicator.label,
          superviseContent: this.supInfo,
          originIndex: this.selectedCounty.score + ''
          // curIndex: this.selectedCounty.score + ''
        }
        // console.log(initData)
        const { status } = await genSupervisionEvent(initData)
        if (status === 200) {
          this.$message.success('督导整改事件已生成')
        }
      } catch (error) {}
    },
    superviseInfo(data) {
      this.supInfo = data
    }
  }
}
</script>

<style lang="scss" scoped>
.mask-container {
  position: absolute;
}
.comprehensive-popup-container {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  padding-top: 10px;
  padding-bottom: 30px;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 1350px;
  height: 830px;
  overflow: auto;
  background: url("~@/assets/image/comprehensive/popup-container.png") center
    center / 100% 100% no-repeat;
  /deep/ .el-scrollbar__wrap {
    overflow: auto;
  }
}
.popup-close {
  position: absolute;
  top: 30px;
  z-index: 3;
  right: 40px;
  width: 20px;
  height: 20px;
  background: url("~@/assets/image/comprehensive/popup-close.png") center center /
    100% 100% no-repeat;
}
.analysis {
  padding: 20px 0 20px 90px;
  color: #a9daff;
  .analysis-icon {
    color: #fe4d3b;
  }
  .analysis-title {
    font-size: 16px;
    font-weight: bold;
    color: #a9daff;
    display: inline-block;
    margin: 0 10px;
  }
}
.urge-button {
  display: inline-block;
  width: 110px;
  height: 34px;
  margin-top: 5px;
  line-height: 34px;
  text-align: center;
  color: #3b9afe;
  cursor: pointer;
  background: url("~@/assets/image/comprehensive/urge-button.png") center center /
    100% 100% no-repeat;
}
</style>
