<template>
  <Dialog
    v-if="visible"
    width="80%"
    title="指标"
    :visible.sync="visible"
    :before-close="closeModal"
    :append-to-body="true"
  >
    <el-scrollbar class="dialog-scrollbar">
      <IndexName :code="selectedCounty.code" />
      <RadarBlock
        :code="selectedCounty.code"
        :code-name="selectedCounty.name"
      />
      <BarBlock :code="selectedCounty.code" />
      <div class="analysis">
        <svg-icon
          icon-class="popup-tip"
          class="analysis-icon"
        />
        <span class="analysis-title">预警三级指标</span>
      </div>
      <TableList :code="selectedCounty.code" />
      <div class="analysis">
        <svg-icon
          icon-class="popup-tip"
          class="analysis-icon"
        />
        <span class="analysis-title">督导意见</span>
      </div>
      <SupervisoryOpinion
        :code="selectedCounty.code"
        @superviseInfo="superviseInfo"
      />
    </el-scrollbar>
    <div slot="footer">
      <span
        class="urge-button"
        @click="
          closeModal();
          handleGenSupervisionEvent();
        "
      >督促整改</span>
    </div>
  </Dialog>
</template>

<script>
import IndexName from './IndexName'
import RadarBlock from './RadarBlock'
import BarBlock from './BarBlock'
import TableList from './TableList'
import SupervisoryOpinion from './SupervisoryOpinion'
import { genSupervisionEvent } from '@/api/intelligentDecisionMaking/comprehensive'

export default {
  components: {
    RadarBlock,
    BarBlock,
    IndexName,
    TableList,
    SupervisoryOpinion
  },
  props: {
    info: {
      type: Number,
      default: () => {
        return undefined
      }
    }
  },
  data () {
    return {
      visible: false,
      selectedCounty: undefined,
      selectedIndicator: { label: '总分' },
      IndexNameList: [],
      supInfo: ''
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('update:selectedCounty')
    this.$EventBus.$off('update:selectedIndicator')
  },
  mounted () {
    this.$EventBus.$on('update:selectedCounty', county => {
      console.log(county)
      this.selectedCounty = county
    })
    this.$EventBus.$on('update:selectedIndicator', indicator => (this.selectedIndicator = indicator))
  },
  methods: {
    closeModal () {
      this.visible = false
    },
    openModal () {
      this.visible = true
    },
    // 生成督导事件
    async handleGenSupervisionEvent () {
      try {
        const initData = {
          superviseRegion: this.selectedCounty.name,
          indicatorName: this.selectedIndicator.label,
          superviseContent: this.supInfo,
          originIndex: this.selectedCounty.score + ''
          // curIndex: this.selectedCounty.score + ''
        }
        const { status } = await genSupervisionEvent(initData)
        if (status === 200) {
          this.$message.success('督导整改事件已生成')
        }
      } catch (error) {}
    },
    superviseInfo (data) {
      this.supInfo = data
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep .el-scrollbar__wrap {
  overflow: auto;
}
::v-deep .el-dialog {
  margin-top: 9vh !important;
}
.dialog-scrollbar {
  width:100%;
  height:620px;
  padding-bottom: 10px;
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
